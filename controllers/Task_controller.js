const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Task = require("../models/Task_model");

// @desc      Get all Tasks

// @access    Private/Admin
exports.getTasks = asyncHandler(async (req, res, next) => {
  Task.find({}, (err, items) => {
    if (err) {
      res.status(400).json({ status: 400, message: "not found", data: null });
    } else {
      res
        .status(200)
        .json({ status: 200, message: "list of Tasks", data: items });
    }
  });
});

// @desc      Get single Task

// @access    Private/Admin
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc      Create Task

// @access    Private/Admin
exports.createTask = asyncHandler(async (req, res, next) => {
  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc      Update Task

// @access    Private/Admin
exports.updateTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc      Delete Task

// @access    Private/Admin
exports.deleteTask = asyncHandler(async (req, res, next) => {
  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
