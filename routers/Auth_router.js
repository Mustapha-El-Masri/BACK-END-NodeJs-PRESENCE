const express = require("express")


const route = express.Router()

const authcontroller = require("../controllers/Auth_controller")

route.post('/login' , authcontroller.login);
route.post('/refresh' , authcontroller.verifyRefreshToken);
route.post('/register' , authcontroller.register);

module.exports = route