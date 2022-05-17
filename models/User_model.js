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
      required: true,
      trim: true,
    },
  slug: String,  
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,        
      trim: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    
 
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
  UserSchema.pre("save", function (next) {
  this.slug = slugify(this.firstname, { lower: true });
  next();
});  
 
module.exports = mongoose.model("Users",UserSchema)