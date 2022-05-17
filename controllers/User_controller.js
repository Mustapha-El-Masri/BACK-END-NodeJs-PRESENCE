const userModel = require("../models/User_model");
// const ErrorResponse = require("../utils/errorResponse");
// const asyncHandler = require("../middleware/async");
const path = require("path");

module.exports = {
  create: /* asyncHandler */(async (req, res, next) => {
    req.body.image = req.file?.filename;
    const user = await userModel.create(req.body);

    res.status(200).json({
      success: true,
      data: user,
    });
  }),
/*   getall: asyncHandler(async (req, res) => {
    const users = await userModel.find();

    res.status(200).json({ success: true, count: users.length, data: users });
  }),
  getById: asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: user });
  }),
  updateuser: asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: user });
  }),
  delete: asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: {} });
  }), */
};
