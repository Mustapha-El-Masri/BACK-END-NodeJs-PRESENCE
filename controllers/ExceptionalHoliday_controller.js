const exHolidayModel = require("../models/ExceptionalHoliday_model");
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  create: (req, res) => {
    const exHoliday = new exHolidayModel(req.body);
    exHoliday.save(req.body, (err, item) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, message: "failed to create", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "exHoliday created", data: item });
      }
    });
  },
  getall: (req, res) => {
    exHolidayModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of exHolidays", data: items });
      }
    });
  },
  getById: async (req, res, next) => {
    try {
      const exHoliday = await exHolidayModel.findById(req.params.id);

      if (!exHoliday) {
        return next(
          new ErrorResponse(
            `Resource not found with id of ${req.params.id}`,
            404
          )
        );
      }
      res.status(200).json({ success: true, data: exHoliday });
    } catch (err) {
      next(err);
    }
  },
  updateexHoliday: async (req, res, next) => {
    let exHoliday = await exHolidayModel.findById(req.params.id);

    if (!exHoliday) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    exHoliday = await exHolidayModel.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: exHoliday });
  },
  delete: async (req, res, next) => {
    const exHoliday = await exHolidayModel.findById(req.params.id);

    if (!exHoliday) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    exHoliday.remove();

    res.status(200).json({ success: true, data: {} });
  },
};
