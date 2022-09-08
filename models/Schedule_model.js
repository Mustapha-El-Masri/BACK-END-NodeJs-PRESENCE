const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
  {
   Subject: {
      type: String,
      required: true,
      trim: true,
    },
    Location: {
      type: String,
      required: true,
      trim: true,
    },
    StartTime: {
      type: String,
      required: true,
      trim: true,
    },
    EndTime: {
        type: String,
        required: true,
        trim: true,
      },
      IsAllDay: {
        type: Boolean,
        required: true,
        trim: true,
      },
      Status: {
        type: String,
        required: true,
        trim: true,
      },
      Priority: {
        type: String,
        required: true,
        trim: true,
      },
      
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("Schedules", ScheduleSchema);
