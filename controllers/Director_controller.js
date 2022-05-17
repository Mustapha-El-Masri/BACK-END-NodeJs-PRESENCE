const directorModel = require("../models/Director_model");
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  create: (req, res) => {
    const director = new directorModel(req.body);
   req.body.image = req.file?.filename;
      director.save(req.body, (err, item) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, message: "failed to create", data: null });
          console.log(err)
      } else {
        res
          .status(200)
          .json({ status: 200, message: "director created", data: item });
      }
    });
  },
  getall: (req, res) => {
    directorModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of directors", data: items });
      }
    });
  },
  getById: async (req, res, next) => {
    try {
      const director = await directorModel.findById(req.params.id);

      if (!director) {
        return next(
          new ErrorResponse(
            `Resource not found with id of ${req.params.id}`,
            404
          )
        );
      }
      res.status(200).json({ success: true, data: director });
    } catch (err) {
      next(err);
    }
  },
  updatedirector: async (req, res, next) => {
    let director = await directorModel.findById(req.params.id);

    if (!director) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    director = await directorModel.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: director });
  },
  delete: async (req, res, next) => {
    const director = await directorModel.findById(req.params.id);

    if (!director) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    director.remove();

    res.status(200).json({ success: true, data: {} });
  },
};
