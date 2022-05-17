const express = require("express");

const route = express.Router();

const ExceptionalHolidaycontroller = require("../controllers/ExceptionalHoliday_controller");
route.post("/create", ExceptionalHolidaycontroller.create);
route.get("/", ExceptionalHolidaycontroller.getall);
route.get("/:id", ExceptionalHolidaycontroller.getById);

route.put("/ExceptionalHoliday/:id", ExceptionalHolidaycontroller.updateexHoliday);
route.delete("/ExceptionalHoliday/:id", ExceptionalHolidaycontroller.delete);

module.exports = route;
