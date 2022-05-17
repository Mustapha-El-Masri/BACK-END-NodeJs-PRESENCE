const mongoose = require("mongoose");
const UserModel = require('./User_model');

const DirectorSchema = new mongoose.Schema(
 
        
);

UserModel.discriminator("Directors",DirectorSchema);
module.exports = mongoose.model("Directors");