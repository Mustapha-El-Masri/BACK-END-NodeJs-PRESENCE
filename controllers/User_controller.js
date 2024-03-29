const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User_model');
const User_model = require('../models/User_model');

// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  User.find({}, (err, items) => {
    if (err) {
      res.status(400).json({ status: 400, message: "not found", data: null });
    } else {
      res
        .status(200)
        .json({ status: 200, message: "list of USERS", data: items });
    }
  }).populate("section");
});

// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("section");

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc      Update user
// @route     PUT /api/v1/auth/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
exports.getname= (req, res) => {
   User_model.find({ firstname: req.query.firstname }).select('-__v').exec((err, items) => {
    if (err) {
      res
        .status(406)
        .json({
          success: false,
          message: "Failed to got users by this email",
        });
    } else {
      res
        .status(201)
        .json({
          success: true,
          message: "List of users",
          data: items,
        });
    }
  });

}