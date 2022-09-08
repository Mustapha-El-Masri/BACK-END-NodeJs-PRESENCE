const User = require("../models/User_model");
  const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");   
const sendEmail = require('../utils/sendEmail')
const crypto=require("crypto")

exports.register = asyncHandler(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    designation,
    location,
    date_of_birth,
    gender,
  } = req.body;
  
  const user = await User.create({
    firstname,
    lastname,
  email,
  password,
    designation,
    location,
    date_of_birth,
    gender,
  });

  //create token
  sendTokenResponse(user, 200, res);
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
  return next(new ErrorResponse('Invalid credentials1',401));
 }
//Check if passwords matches
const isMatch = await user.matchPassword(password);

if(!isMatch){
  return next(new ErrorResponse('Invalid credentials2',401));
}


  sendTokenResponse(user , 200 , res);
 });
//Get token from model , create cookie and send response



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


exports.forgotPaswword = asyncHandler(async (req, res, next)=>{
  const user = await User.findOne({email: req.body.email});
  if (!user){
    return next(new ErrorResponse('there is no user with that email',404))
  }
// get reset token 
const resetToken = user.getResetPasswordToken();

await user.save({ValidateBeforeSave: false});

//create reset url
const resetUrl = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
try {
  await sendEmail({
    email: user.email,
    subject: 'Password reset token',
    message
  });

  res.status(200).json({ success: true, data: 'Email sent' });
} catch (err) {
  console.log(err);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });

  return next(new ErrorResponse('Email could not be sent', 500));
}
console.log(resetToken);
  res.status(200).json({
    success: true,
    data:user
  })
})
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});
const sendTokenResponse =(user, statusCode,res) =>{
  const token = user.getSignedJwtToken()
  const id = user.id;


  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24*60*60*1000),
    httpOnly: true
  };
  
  res.status(statusCode)
  .cookie('token',token, options)
  .cookie('id',id,options)
  .json({success:true,
  token,id , user})
}