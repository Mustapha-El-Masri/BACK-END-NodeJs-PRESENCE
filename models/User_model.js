const mongoose = require("mongoose");
 const slugify = require("slugify");
const baseOption = {
  discriminatorKey: "itemtype",
  collection: "users",
};
 
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: false,
      trim: true,
    },
  
    lastname: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'PLease add an email'],        
      trim: true,
      unique:true
    },
    password: {
      type: String,
      required: false,
      trim: true,
      select:false
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    
 
    }, 
    role: {
      type:String,
      enum: ['employee', 'rh'],
      default:'employee'
    },
    resetPasswordToken: String,
    resetPasswordExpire:Date,
    createdAt:{
      type:Date,
      default: Date.now
    },
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contracts",
    },
    holiday: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Holidays",
      },
    ],
    presencesheet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PresenceSheets",
    },
  },
  baseOption,
  { timestamps: true }
);

 
module.exports = mongoose.model("Users",UserSchema)