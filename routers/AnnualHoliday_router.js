const express = require("express");

const route = express.Router();

const annualHolidaycontroller = require("../controllers/AnnualHoliday_controller");
route.post("/create", annualHolidaycontroller.create);
route.get("/", annualHolidaycontroller.getall);
route.get("/:id", annualHolidaycontroller.getById);

route.put("/annualHoliday/:id", annualHolidaycontroller.updateAnHoliday);
route.delete("/annualHoliday/:id", annualHolidaycontroller.delete);

module.exports = route;
