const mongoose = require("mongoose");
const baseOption = {
  discriminatorKey: "itemtype",
  collection: "holidays",
};

const HolidaySchema = new mongoose.Schema(
  {
    startdate: {
      type: String,
      required: true,
      trim: true,
    },
    enddate: {
      type: String,
      required: true,
      trim: true,
    },
    user: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
  },
  baseOption,
  { timestamps: true }
);
module.exports = mongoose.model("Holidays", HolidaySchema);
