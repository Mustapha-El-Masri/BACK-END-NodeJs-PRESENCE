const fileRequestModel = require("../models/FileRequest_model");
  const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");   
 
module.exports = {
   create: asyncHandler(async (req, res, next) => {
    req.body.image = req.file?.filename; 

    //Add user to req,body
    req.body.user = req.user.id;
    const fileRequest = await fileRequestModel.create(req.body);
    res.status(200).json({
      success: true,
      data: fileRequest,
    });
  }), 
    
  getall: async (req, res) => {
    const PAGE_SIZE = 3;
    const page = parseInt(req.query.page || "0");
    const total = await fileRequestModel.countDocuments({});
    fileRequestModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of fileRequests", data: items, total: total, totalPages: Math.ceil(total / PAGE_SIZE) });
      }
    }).limit(PAGE_SIZE).skip(PAGE_SIZE * page);
  },
  getallInProgress: async (req, res) => {
    
    fileRequestModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of fileRequests", data: items });
      }
    })
  },
  getById: async (req, res, next) => {
    try {
      const fileRequest = await fileRequestModel.findById(req.params.id);

      if (!fileRequest) {
        return next(
          new ErrorResponse(
            `Resource not found with id of ${req.params.id}`,
            404
          )
        );
      }
      res.status(200).json({ success: true, data: fileRequest });
    } catch (err) {
      next(err);
    }
  },
  updateFile : async (req, res, next) => {
    const file = await fileRequestModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      data: user
    });
  },
  
  // @desc      Delete user
  // @route     DELETE /api/v1/auth/users/:id
  // @access    Private/Admin
deleteFile:  async (req, res, next) => {
    await fileRequestModel.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      data: {}
    });
  }
  
 

  



};
