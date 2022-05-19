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

 //create token 
const token = user.getSignedJwtToken()

res.status(200).json({success:true , token})
});

exports.login = asyncHandler(async(req,res,next)=>{
  const {  email , password } =req.body;
 
 //Validate email and password
 if(!email || password){
   return next(new ErrorResponse('please provide an email and password',400));
 }
 //check for user
 const user = await user.findOne({email}).select('+password')
 if(!user){
  return next(new ErrorResponse('Invalid credentials',401));
 }
//Check if passwords matches
const isMatch = await user.matchPassword(password);

if(!isMatch){
  return next(new ErrorResponse('Invalid credentials',401));
}


  //create token 
 const token = user.getSignedJwtToken()
 
 res.status(200).json({success:true , token})
 });
