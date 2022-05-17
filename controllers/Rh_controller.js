const rhModel = require("../models/Rh_model");
  const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");   
 
module.exports = {
   create: asyncHandler(async (req, res, next) => {
    req.body.image = req.file?.filename; 
    const rh = await rhModel.create(req.body);
    res.status(200).json({
      success: true,
      data: rh,
    });
  }), 
    
  getall: (req, res) => {
    rhModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of rhs", data: items });
      }
    });
  },
  getById: async (req, res, next) => {
    try {
      const rh = await rhModel.findById(req.params.id);

      if (!rh) {
        return next(
          new ErrorResponse(
            `Resource not found with id of ${req.params.id}`,
            404
          )
        );
      }
      res.status(200).json({ success: true, data: rh });
    } catch (err) {
      next(err);
    }
  },
  updaterh: async (req, res, next) => {
    let rh = await rhModel.findById(req.params.id);

    if (!rh) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    rh = await rhModel.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: rh });
  },
  delete: async (req, res, next) => {
    const rh = await rhModel.findById(req.params.id);

    if (!rh) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    rh.remove();

    res.status(200).json({ success: true, data: {} });
  },

  



};
