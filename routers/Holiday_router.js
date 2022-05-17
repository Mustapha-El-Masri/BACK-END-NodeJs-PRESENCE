const express = require("express");

const route = express.Router();

const holidaycontroller = require("../controllers/Holiday_controller");
route.post("/create", holidaycontroller.create);
route.get("/", holidaycontroller.getall);
route.get("/:id", holidaycontroller.getById);
 route.put("/holiday/:id", holidaycontroller.updateholiday);
route.delete("/holiday/:id", holidaycontroller.delete);

module.exports = route;
