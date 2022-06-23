const mongoose = require("mongoose");

const PresenceSheetSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      trim: true,
    },
   
    
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("PresenceSheets", PresenceSheetSchema);
