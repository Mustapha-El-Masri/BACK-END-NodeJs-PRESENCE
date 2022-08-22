const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Section = require("../models/Section_model");

// @desc      Get all Sections

// @access    Private/Admin
exports.getSections = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr= JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  query = Section.find(JSON.parse(queryStr)).populate("employees");
  const sections = await query;
 res
        .status(200)
        .json({ status: 200, message: "list of Sections", data: sections
       });
    },
  );

// @desc      Get single Section

// @access    Private/Admin
exports.getSection = asyncHandler(async (req, res, next) => {
  const section = await Section.findById(req.params.id).populate("employees");

  res.status(200).json({
    success: true,
    data: section,
  });
});
// exports.getUser = async (req, res) => {
//   const section = await Section.find({
//    employees : {$in:[req.body.id]}
// }, function(err, teamData) {
//   res.status(200).json({
//     success: true,
//     data: teamData,
//   });
// });

//   res.status(200).json({
//     success: true,
//     data: section,
//   });
// };

 exports.getUser = async  function(req,res){
  {
    try {
      const section = await Section.find({
        employees: { $in: [req.params.userId] },
      }).populate("employees");
      res.status(200).json({success: true,
        data: section,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
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
