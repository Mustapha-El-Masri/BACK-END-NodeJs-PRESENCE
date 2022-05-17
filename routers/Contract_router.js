const express = require("express");

const route = express.Router();

const contractcontroller = require("../controllers/Contract_controller");
route.post("/create", contractcontroller.create);
route.get("/", contractcontroller.getall);
route.get("/:id", contractcontroller.getById);

route.put("/contract/:id", contractcontroller.updatecontract);
route.delete("/contract/:id", contractcontroller.delete);

module.exports = route;
