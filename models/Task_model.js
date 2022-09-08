const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
   startdate: {
      type: Date,
      required: false,
      trim: true,
    },
    enddate: {
      type: String,
      required: false,
      trim: true,
    },
    Id: {
      type: String,
      required: false,
      trim: true,
    },
    Status: {
      type: String,
      required: false,
      trim: true,
    },
    Summary: {
      type: String,
      required: false,
      trim: true,
    },
    Priority: {
      type: String,
      required: false,
      trim: true,
    },
    Tags: {
      type: String,
      required: false,
      trim: true,
    },
    Estimate: {
      type: Number,
      required: false,
      trim: true,
    },
    Assignee: {
      type: String,
      required: false,
      trim: true,
    },
    RankId: {
      type: Number,
      required: false,
      trim: true,
    },
    Color: {
      type: String,
      required: false,
      trim: true,
    },
    ClassName: {
      type: String,
      required: false,
      trim: true,
    },
    per: {
      type: Number,
      required: false,
      default:0,
      trim: true,
    },
    section: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sections",
      },
    

    
    // users: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Users",
    //     },
    //   ],
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tasks", TaskSchema);
