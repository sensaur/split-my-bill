require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const redis = require("redis");
const authRouter = require("./src/routes/auth.router");
const usersRouter = require("./src/routes/users.router");
const billRouter = require("./src/routes/bill.router");
const uploadFileRouter = require("./src/routes/uploadFile.router");
const path = require("path");

const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

const app = express();

const { PORT, COOKIE_SECRET, COOKIE_NAME } = process.env;

// SERVER'S SETTINGS
app.set("cookieName", COOKIE_NAME);

// APP'S MIDDLEWARES
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    name: app.get("cookieName"),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore(
      { client: redisClient },
      {
        secret: COOKIE_SECRET,
      }
    ),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
    },
  })
);

app.use(express.static(path.join(__dirname, "src", "public", "uploads")));

// APP'S ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/bill", billRouter);
app.use("/api/v1/uploadimg", uploadFileRouter);

app.listen(PORT, () => {
  ("Server has been started on PORT ", PORT);
});
