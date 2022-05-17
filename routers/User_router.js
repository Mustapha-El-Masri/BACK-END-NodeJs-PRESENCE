const { Router } = require("express");
const express = require("express");
const upload = require("../middleware/uploadfile");

const route = express.Router();

const usercontroller = require("../controllers/User_controller");
 
 

module.exports = route;
