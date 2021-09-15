const { Router } = require("express");
const usersController = require("../controllers/users.controller");
const checkAuth = require("../middlewares/checkAuth");

const usersRouter = Router();

usersRouter.get("/", checkAuth, usersController.getAllUsers);
usersRouter
  .route("/:id")
  .patch(checkAuth, checkAuth, usersController.editUser)
  .get(usersController.getUser);
module.exports = usersRouter;
