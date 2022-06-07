const mongoose = require("mongoose");

const FileRequestSchema = new mongoose.Schema(
  {
   name: {
      type: String,
      required: true,
      trim: true,
    },
    wording: { 
      type: String,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      required: false,
      trim: true,
    },
    date: {
        type: String,
        required:false,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      }
      
  },
  { timestamps: true }
);
module.exports = mongoose.model("FileRequests", FileRequestSchema);
