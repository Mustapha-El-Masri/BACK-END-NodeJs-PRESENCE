const express = require("express");
const {protect , authorize} = require('../middleware/auth')

const route = express.Router();
const upload = require("../middleware/uploadfile");
const fileRequestcontroller = require("../controllers/FileRequest_controller");

route.post("/create", upload.single("photo"),protect, fileRequestcontroller.create);
route.get("/", protect, authorize('admin'),  fileRequestcontroller.getall);
route.get("/inprogress",  fileRequestcontroller.getallInProgress);
route.get("/:id",  fileRequestcontroller.getById);
route.put("/fileRequest/:id", protect,authorize('admin'), fileRequestcontroller.updateFile);
route.delete("/fileRequest/:id", protect, fileRequestcontroller.deleteFile);

module.exports = route;
