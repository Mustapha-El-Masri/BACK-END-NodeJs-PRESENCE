const express = require("express")


const route = express.Router()

const authcontroller = require("../controllers/Auth_controller")


route.post('/register' , authcontroller.register);

module.exports = route