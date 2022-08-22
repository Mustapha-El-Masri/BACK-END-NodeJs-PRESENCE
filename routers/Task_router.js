const express = require("express");
const {protect , authorize} = require('../middleware/auth')

const route = express.Router();

const TaskController = require("../controllers/Task_controller");

route.post("/create",TaskController.createTask);
route.get("/",  TaskController.getTasks);
route.get("/:id",  TaskController.getTask);
route.put("/task/:id", protect,TaskController.updateTask);
route.delete("/task/:id", protect, TaskController.deleteTask);
route.get("/section/:sectionId", TaskController.getTaskBySection);

module.exports = route;
