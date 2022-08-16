const mongoose = require("mongoose");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
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
    designation: {
      type: String,
      required: false,
      trim: true,
    },
    location: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      unique: true,
    },
    date_of_birth: {
      type: Date,
      required: false,
    },
    password: {
      type: String,
      required: false,
      trim: true,
      select: false,
    },

    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["employee", "rh", "admin"],
      default: "employee",
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    contract: {
      type: String,
      enum: ["CDI", "CDD","stage"],
      default: "CDD",
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
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sections",
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    
    },
  },

  baseOption,
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//Sign JWt and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
//Match user entered password to hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};


module.exports = mongoose.model("Users", UserSchema);
