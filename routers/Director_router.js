const express = require("express");

const route = express.Router();

const directorcontroller = require("../controllers/Director_controller");

const upload = require("../middleware/uploadfile");
route.post("/create",   upload.single("image"),  directorcontroller.create);
route.get("/", directorcontroller.getall);
route.get("/:id", directorcontroller.getById);

route.put("/director/:id", directorcontroller.updatedirector);
route.delete("/director/:id", directorcontroller.delete);

module.exports = route;
