const express = require("express");

const route = express.Router();

const Schedulecontroller = require("../controllers/Schedule_controller");
route.post("/create", Schedulecontroller.create);
route.get("/", Schedulecontroller.getall);
route.get("/:id", Schedulecontroller.getById);

route.put("/Schedule/:id", Schedulecontroller.updateSchedule);
route.delete("/Schedule/:id", Schedulecontroller.delete);

module.exports = route;
