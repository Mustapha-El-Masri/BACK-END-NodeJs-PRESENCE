const mongoose = require("mongoose");
const UserModel = require('./User_model');

const EmployeeSchema = new mongoose.Schema(
 
 
);

UserModel.discriminator("Employees",EmployeeSchema);
module.exports = mongoose.model("Employees");