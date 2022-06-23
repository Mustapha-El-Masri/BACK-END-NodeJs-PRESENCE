const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
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
    name: {
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
module.exports = mongoose.model("Tasks", TaskSchema);
