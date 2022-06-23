const mongoose = require("mongoose");
 const slugify = require("slugify");
 

 
 
const SectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
  
    
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    teamLeader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    tasks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tasks",
        },
      ],
  },

  { timestamps: true }
);

 
module.exports = mongoose.model("Sections",SectionSchema)