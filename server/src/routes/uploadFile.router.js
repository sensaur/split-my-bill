const { Router } = require("express");

const path = require("path");
const {
  upload,
  uploadOneFile,
} = require("../controllers/uploadFile.controller");

const uploadFilerouter = Router();

uploadFilerouter.route("/").post(upload.single("file"), uploadOneFile);

module.exports = uploadFilerouter;
