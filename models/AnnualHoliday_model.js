const mongoose = require("mongoose");

const HolidayModel = require('./Holiday_model');

const AnnualHolidaySchema = new mongoose.Schema(
 
);

HolidayModel .discriminator("AnnualHolidays",AnnualHolidaySchema) ;

module.exports = mongoose.model("AnnualHolidays");