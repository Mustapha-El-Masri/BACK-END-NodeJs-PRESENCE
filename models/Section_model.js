const mongoose = require("mongoose");
 const slugify = require("slugify");
 

 
 
const SectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  
    
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
 
    
  },

  { timestamps: true }
);

 
module.exports = mongoose.model("Sections",SectionSchema)