const AnHolidayModel = require("../models/AnnualHoliday_model");
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  create: (req, res) => {
    const AnHoliday = new AnHolidayModel(req.body);
    AnHoliday.save(req.body, (err, item) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, message: "failed to create", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "AnHoliday created", data: item });
      }
    });
  },
  getall: (req, res) => {
    AnHolidayModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of AnHolidays", data: items });
      }
    });
  },
  getById: async (req, res, next) => {
    try {
      const AnHoliday = await AnHolidayModel.findById(req.params.id);

      if (!AnHoliday) {
        return next(
          new ErrorResponse(
            `Resource not found with id of ${req.params.id}`,
            404
          )
        );
      }
      res.status(200).json({ success: true, data: AnHoliday });
    } catch (err) {
      next(err);
    }
  },
  updateAnHoliday: async (req, res, next) => {
    let AnHoliday = await AnHolidayModel.findById(req.params.id);

    if (!AnHoliday) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    AnHoliday = await AnHolidayModel.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: AnHoliday });
  },
  delete: async (req, res, next) => {
    const AnHoliday = await AnHolidayModel.findById(req.params.id);

    if (!AnHoliday) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    AnHoliday.remove();

    res.status(200).json({ success: true, data: {} });
  },
};
