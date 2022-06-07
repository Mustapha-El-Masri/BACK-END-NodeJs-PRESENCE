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
 sendTokenResponse(user , 200 , res);
});

exports.login = asyncHandler(async(req,res,next)=>{
  const {  email , password } =req.body;
 
 //Validate email and password
 if(!email || !password){
   return next(new ErrorResponse('please provide an email and password',400));
 }
 //check for user
 const user = await User.findOne({email}).select('+password')
 if(!user){
  return next(new ErrorResponse('Invalid credentials',401));
 }
//Check if passwords matches
const isMatch = await user.matchPassword(password);

if(!isMatch){
  return next(new ErrorResponse('Invalid credentials',401));
}


  sendTokenResponse(user , 200 , res);
 });
//Get token from model , create cookie and send response

const sendTokenResponse =(user, statusCode,res) =>{
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24*60*60*1000),
    httpOnly: true
  };
  
  res.status(statusCode)
  .cookie('token',token, options)
  .json({success:true,
  token})
}

//Get current logged user

exports.getMe = asyncHandler(async (req, res, next)=>{
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data:user
  })
})
//logout /clear cookie
exports.logout = asyncHandler(async (req, res, next)=>{
 res.cookie('token' , 'none', {
   expires: new Date(Date.now() + 10 * 1000),
   httpOnly:true
 });


  res.status(200).json({
    success: true,
    data:{}
  })
})
exports.updateDetails = asyncHandler(async (req, res, next)=>{
  const filedstoUpdate = {
   firstname: req.body.firstname,
    email: req.body.email
  }
  const user = await User.findByIdAndUpdate(req.user.id, filedstoUpdate,{
    new:true,
    runValidators:true
  });
  res.status(200).json({
    success: true,
    data:user
  })
})
exports.updatePassword  = asyncHandler(async (req, res, next)=>{
  
  const user = await User.findByIdAndUpdate(req.user.id).select('+password');

  //check current password

  if(!(await user.matchPassword(req.body))){

  }
  res.status(200).json({
    success: true,
    data:user
  })
})