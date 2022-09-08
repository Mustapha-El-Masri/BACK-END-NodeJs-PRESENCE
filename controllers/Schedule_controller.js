const ScheduleModel = require("../models/Schedule_model")
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  create: (req, res) => {
    const Schedule = new ScheduleModel(req.body);
    Schedule.save(req.body, (err, item) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, message: "failed to create", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "Schedule created", data: item });
      }
    });
  },
  getall: (req, res) => {
    ScheduleModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of Schedules", data: items });
      }
    });
  },
  getById: async (req, res, next) => {
    try {
      const Schedule = await ScheduleModel.findById(req.params.id);

      if (!Schedule) {
        return next(
          new ErrorResponse(
            `Resource not found with id of ${req.params.id}`,
            404
          )
        );
      }
      res.status(200).json({ success: true, data: Schedule });
    } catch (err) {
      next(err);
    }
  },
  updateSchedule: async (req, res, next) => {
    let Schedule = await ScheduleModel.findById(req.params.id);

    if (!Schedule) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    Schedule = await ScheduleModel.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: Schedule });
  },
  delete: async (req, res, next) => {
    const Schedule = await ScheduleModel.findById(req.params.id);

    if (!Schedule) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    Schedule.remove();

    res.status(200).json({ success: true, data: {} });
  },
};
