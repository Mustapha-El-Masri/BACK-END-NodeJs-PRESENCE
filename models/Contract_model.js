const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema(
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
    type: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Contracts", ContractSchema);
