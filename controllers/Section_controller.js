const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Section = require("../models/Section_model");

// @desc      Get all Sections

// @access    Private/Admin
exports.getSections = asyncHandler(async (req, res, next) => {
  Section.find({}, (err, items) => {
    if (err) {
      res.status(400).json({ status: 400, message: "not found", data: null });
    } else {
      res
        .status(200)
        .json({ status: 200, message: "list of Sections", data: items });
    }
  });
});

// @desc      Get single Section

// @access    Private/Admin
exports.getSection = asyncHandler(async (req, res, next) => {
  const section = await Section.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: section,
  });
});

// @desc      Create section

// @access    Private/Admin
exports.createSection = asyncHandler(async (req, res, next) => {
  const section = await Section.create(req.body);

  res.status(201).json({
    success: true,
    data: section,
  });
});

// @desc      Update Section

// @access    Private/Admin
exports.updateSection = asyncHandler(async (req, res, next) => {
  const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: section,
  });
});

// @desc      Delete Section

// @access    Private/Admin
exports.deleteSection = asyncHandler(async (req, res, next) => {
  await Section.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
