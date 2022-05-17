const mongoose = require("mongoose");
const UserModel = require("./User_model");

const RhSchema = new mongoose.Schema({
  rhname: {
    type: String,
    default: false,
  },
});
  
UserModel.discriminator("Rhs",RhSchema);
module.exports = mongoose.model("Rhs");