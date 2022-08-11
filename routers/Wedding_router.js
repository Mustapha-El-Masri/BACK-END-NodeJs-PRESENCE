const express = require("express");

const route = express.Router();

const Weddingcontroller = require("../controllers/Wedding_controller");
route.post("/create", Weddingcontroller.create);
route.get("/", Weddingcontroller.getall);
route.get("/:id", Weddingcontroller.getById);

route.put("/wedding/:id", Weddingcontroller.updateWedding);
route.delete("/wedding/:id", Weddingcontroller.delete);

module.exports = route;
