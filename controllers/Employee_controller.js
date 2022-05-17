const employeeModel = require("../models/Employee_model");
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  create: (req, res) => {
    const employee = new employeeModel(req.body);
    employee.save(req.body, (err, item) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, message: "failed to create", data: null });
          console.log(err)
      } else {
        res
          .status(200)
          .json({ status: 200, message: "employee created", data: item });
      }
    });
  },
  getall: (req, res) => {
    employeeModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of employees", data: items });
      }
    });
  },
  getById: async (req, res, next) => {
    try {
      const employee = await employeeModel.findById(req.params.id);

      if (!employee) {
        return next(
          new ErrorResponse(
            `Resource not found with id of ${req.params.id}`,
            404
          )
        );
      }
      res.status(200).json({ success: true, data: employee });
    } catch (err) {
      next(err);
    }
  },
  updateemployee: async (req, res, next) => {
    let employee = await employeeModel.findById(req.params.id);

    if (!employee) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    employee = await employeeModel.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: employee });
  },
  delete: async (req, res, next) => {
    const employee = await employeeModel.findById(req.params.id);

    if (!employee) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    employee.remove();

    res.status(200).json({ success: true, data: {} });
  },
};
