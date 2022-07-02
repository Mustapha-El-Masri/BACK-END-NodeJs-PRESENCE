const mongoose = require("mongoose");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      required: [true, "PLease add an email"],
      trim: true,
      unique: true,
    },
    birthDate: {
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
    genre: {
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
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sections",
    },
  },

  baseOption,
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
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

module.exports = mongoose.model("Users", UserSchema);
