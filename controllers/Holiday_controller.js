const holidayModel = require("../models/Holiday_model");
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  create: (req, res) => {
    const holiday = new holidayModel(req.body);
    holiday.save(req.body, (err, item) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, message: "failed to create", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "holiday created", data: item });
      }
    });
  },
  getall: (req, res) => {
    holidayModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of holidays", data: items });
      }
    });
  },
  getById: async (req, res, next) => {
    try {
      const holiday = await holidayModel.findById(req.params.id);

      if (!holiday) {
        return next(
          new ErrorResponse(
            `Resource not found with id of ${req.params.id}`,
            404
          )
        );
      }
      res.status(200).json({ success: true, data: holiday });
    } catch (err) {
      next(err);
    }
  },
  updateholiday: async (req, res, next) => {
    let holiday = await holidayModel.findById(req.params.id);

    if (!holiday) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    holiday = await holidayModel.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: holiday });
  },
  delete: async (req, res, next) => {
    const holiday = await holidayModel.findById(req.params.id);

    if (!holiday) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    holiday.remove();

    res.status(200).json({ success: true, data: {} });
  },
};
