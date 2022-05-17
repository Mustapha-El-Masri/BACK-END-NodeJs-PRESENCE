const express = require("express");

const route = express.Router();

const employeecontroller = require("../controllers/Employee_controller");
route.post("/create", employeecontroller.create);
route.get("/", employeecontroller.getall);
route.get("/:id", employeecontroller.getById);

route.put("/employee/:id", employeecontroller.updateemployee);
route.delete("/employee/:id", employeecontroller.delete);

module.exports = route;
