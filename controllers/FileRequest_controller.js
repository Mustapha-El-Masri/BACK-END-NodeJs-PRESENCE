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
    
  getall: (req, res) => {
    fileRequestModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of fileRequests", data: items });
      }
    });
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
  updatefileRequest: async (req, res, next) => {
  let fileRequest = await fileRequestModel.findById(req.params.id);

    if (!fileRequest) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    //Make sure user is fileRequest owner
    if(fileRequest.user.toString() !== req.user.id && req.user.role !='admin'){
      return next(
        new ErrorResponse(`User ${req.params.id} is not authorized to update this fileRequest`, 401)
      );
    }

    fileRequest = await fileRequestModel.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: fileRequest });
  },
  delete: async (req, res, next) => {
    const fileRequest = await fileRequestModel.findById(req.params.id);

    if (!fileRequest) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }
    if(fileRequest.user.toString() !== req.user.id && req.user.role !='admin'){
      return next(
        new ErrorResponse(`User ${req.params.id} is not authorized to delete this fileRequest`, 401)
      );
    }

    fileRequest.remove();

    res.status(200).json({ success: true, data: {} });
  },

  



};
