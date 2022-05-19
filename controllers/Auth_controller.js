const User = require("../models/User_model");
  const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");   

exports.register = asyncHandler(async(req,res,next)=>{
 const { firstname , lastname, email , password , role} =req.body;

 const user = await User.create({
   firstname,
   lastname,
   email,
   password,
   role
 });
res.status(200).json({success:true})
});