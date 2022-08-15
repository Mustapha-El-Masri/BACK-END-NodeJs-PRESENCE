const express = require('express');
const advancedResults = require('../middleware/advancedResults');
const User = require('../models/User_model');
const {protect , authorize} = require('../middleware/auth')

const route = express.Router();
const upload = require("../middleware/uploadfile");
const usercontroller = require("../controllers/User_controller");

route.post("/create", upload.single("photo"), usercontroller.createUser);
route.get("/", usercontroller.getUsers);
route.get("/:id",  usercontroller.getUser);
route.put("/user/:id", protect, usercontroller.updateUser);
route.delete("/user/:id",protect, usercontroller.deleteUser);
route.get('/email',usercontroller.getname)

module.exports = route;
