const express = require('express');
const advancedResults = require('../middleware/advancedResults');
const User = require('../models/User_model');
const {protect , authorize} = require('../middleware/auth')

const route = express.Router();
const upload = require("../middleware/uploadfile");
const usercontroller = require("../controllers/User_controller");

route.post("/create", upload.single("photo"),protect, usercontroller.createUser);
route.get("/",protect, usercontroller.getUsers);
route.get("/:id",  usercontroller.getUser);
route.put("/user/:id", protect, usercontroller.updateUser);
route.delete("/user/:id",protect, usercontroller.deleteUser);

module.exports = route;
