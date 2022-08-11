constAnnouncementModel = require("../models/AnnualHoliday_model");
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  create: (req, res) => {
    const Announcement = new AnnouncementModel(req.body);
   Announcement.save(req.body, (err, item) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, message: "failed to create", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "Announcement created", data: item });
      }
    });
  },
  getall: (req, res) => {
   AnnouncementModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of Announcements", data: items });
      }
    });
  },
  getById: async (req, res, next) => {
    try {
      const Announcement = await AnnouncementModel.findById(req.params.id);

      if (!Announcement) {
        return next(
          new ErrorResponse(
            `Resource not found with id of ${req.params.id}`,
            404
          )
        );
      }
      res.status(200).json({ success: true, data: Announcement });
    } catch (err) {
      next(err);
    }
  },
  updateAnnouncement: async (req, res, next) => {
    let Announcement = await AnnouncementModel.findById(req.params.id);

    if (!Announcement) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

   Announcement = await AnnouncementModel.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data:Announcement });
  },
  delete: async (req, res, next) => {
    const Announcement = await AnnouncementModel.findById(req.params.id);

    if (!Announcement) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

   Announcement.remove();

    res.status(200).json({ success: true, data: {} });
  },
};
