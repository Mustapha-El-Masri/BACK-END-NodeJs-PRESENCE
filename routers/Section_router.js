const express = require("express");
const {protect , authorize} = require('../middleware/auth')

const route = express.Router();

const SectionController = require("../controllers/Section_controller");

route.post("/create",SectionController.createSection);
route.get("/",  SectionController.getSections);
route.get("/:id",  SectionController.getSection);
route.put("/section/:id", protect,SectionController.updateSection);
route.delete("/section/:id", protect, SectionController.deleteSection);

module.exports = route;
