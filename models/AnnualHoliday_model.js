const mongoose = require("mongoose");

const AnnualHolidaySchema = new mongoose.Schema(
  {
   name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("AnnualHolidays", AnnualHolidaySchema);
