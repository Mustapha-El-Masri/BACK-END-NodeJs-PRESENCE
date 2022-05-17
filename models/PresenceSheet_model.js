const mongoose = require("mongoose");

const PresenceSheetSchema = new mongoose.Schema(
  {
    arrivalhour: {
      type: String,
      required: true,
      trim: true,
    },
    exithour: {
      type: String,
      required: true,
      trim: true,
    },
    image:{
      type:String,
       required: true,
      trim: true,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("PresenceSheets", PresenceSheetSchema);
