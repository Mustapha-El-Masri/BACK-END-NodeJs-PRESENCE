const sheetModel = require("../models/PresenceSheet_model");
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  create: (req, res) => {
    const sheet = new sheetModel(req.body);
    req.body.image = req.file?.filename;  
    sheet.save(req.body, (err, item) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, message: "failed to create", data: null });
          console.log(err)
      } else {
        res
          .status(200)
          .json({ status: 200, message: "sheet created", data: item });
      }
    });
  },
  getall: (req, res) => {
    sheetModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of sheets", data: items });
      }
    });
  },
  getById: async (req, res, next) => {
    try {
      const sheet = await sheetModel.findById(req.params.id);

      if (!sheet) {
        return next(
          new ErrorResponse(
            `Resource not found with id of ${req.params.id}`,
            404
          )
        );
      }
      res.status(200).json({ success: true, data: sheet });
    } catch (err) {
      next(err);
    }
  },
  updatesheet: async (req, res, next) => {
    let sheet = await sheetModel.findById(req.params.id);

    if (!sheet) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    sheet = await sheetModel.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: sheet });
  },
  delete: async (req, res, next) => {
    const sheet = await sheetModel.findById(req.params.id);

    if (!sheet) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    sheet.remove();

    res.status(200).json({ success: true, data: {} });
  },
};
