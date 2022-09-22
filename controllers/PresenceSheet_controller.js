const sheetModel = require("../models/PresenceSheet_model");
const ErrorResponse = require("../utils/errorResponse");
const User_model = require("../models/User_model");
const User_controller = require("../controllers/User_controller");

module.exports = {
  create: (req, res) => {
    User_model.find({}, (err, items) => {
      if (err) {
        console.log("not");
      } else {
        const users = items;
        console.log("eezfrzf");
        console.log(users);
      }
    });
    const array = users.map((user) => user.id);
    console.log("ffdsofjezofjezo");
    console.log(array);
    req.body.users = array;
    const sheet = new sheetModel(req.body);
    sheet.save(req.body, (err, item) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, message: "failed to create", data: null });
        console.log(err);
      } else {
        res
          .status(200)
          .json({ status: 200, message: "sheet created", data: item });
        console.log(array);
        console.log(array1);
      }
    });
  },
  getPresByDay: async (req, res) => {
    sheetModel
      .find({ day: req.query.day })
      .populate("users")
      .exec((err, items) => {
        if (err) {
          res.status(406).json({
            success: false,
            message: "cannot get users",
          });
        } else {
          res.status(201).json({
            success: true,
            message: "list users ",
            data: items,
          });
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
