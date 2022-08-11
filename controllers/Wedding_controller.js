const WeddingModel = require("../models/Wedding_model");
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  create: (req, res) => {
    const Wedding = new WeddingModel(req.body);
    Wedding.save(req.body, (err, item) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, message: "failed to create", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "Wedding created", data: item });
      }
    });
  },
  getall: (req, res) => {
    WeddingModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of Weddings", data: items });
      }
    });
  },
  getById: async (req, res, next) => {
    try {
      const Wedding = await WeddingModel.findById(req.params.id);

      if (!Wedding) {
        return next(
          new ErrorResponse(
            `Resource not found with id of ${req.params.id}`,
            404
          )
        );
      }
      res.status(200).json({ success: true, data: Wedding });
    } catch (err) {
      next(err);
    }
  },
  updateWedding: async (req, res, next) => {
    let Wedding = await WeddingModel.findById(req.params.id);

    if (!Wedding) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    Wedding = await WeddingModel.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: Wedding });
  },
  delete: async (req, res, next) => {
    const Wedding = await WeddingModel.findById(req.params.id);

    if (!Wedding) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    Wedding.remove();

    res.status(200).json({ success: true, data: {} });
  },
};
