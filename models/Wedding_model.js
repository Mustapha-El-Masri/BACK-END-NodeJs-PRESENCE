const mongoose = require("mongoose");

const WeddingSchema = new mongoose.Schema(
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
    location: {
      type: String,
      required: true,
      trim: true,
    },
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("Weddings", WeddingSchema);
