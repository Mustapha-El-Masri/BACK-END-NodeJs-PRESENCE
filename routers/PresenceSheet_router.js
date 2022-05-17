const express = require("express");

const route = express.Router();
const upload = require("../middleware/uploadfile");

const sheetcontroller = require("../controllers/PresenceSheet_controller");
route.post("/create" , upload.single("photo") , sheetcontroller.create);
route.get("/", sheetcontroller.getall);
route.get("/:id", sheetcontroller.getById);

route.put("/sheet/:id", sheetcontroller.updatesheet);
route.delete("/sheet/:id", sheetcontroller.delete);

module.exports = route;
