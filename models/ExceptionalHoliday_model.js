const mongoose = require("mongoose");
const HolidayModel = require('./Holiday_model');

const ExceptionalHolidaySchema = new mongoose.Schema(
 
 
);

HolidayModel .discriminator("ExceptionalHolidays", ExceptionalHolidaySchema) ;
module.exports = mongoose.model("ExceptionalHolidays");