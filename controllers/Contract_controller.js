const contractModel = require("../models/Contract_model");
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  create: (req, res) => {
    const contract = new contractModel(req.body);
    contract.save(req.body, (err, item) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, message: "failed to create", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "contract created", data: item });
      }
    });
  },
  getall: (req, res) => {
    contractModel.find({}, (err, items) => {
      if (err) {
        res.status(400).json({ status: 400, message: "not found", data: null });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "list of contracts", data: items });
      }
    });
  },
  getById: async (req, res, next) => {
    try {
      const contract = await contractModel.findById(req.params.id);

      if (!contract) {
        return next(
          new ErrorResponse(
            `Resource not found with id of ${req.params.id}`,
            404
          )
        );
      }
      res.status(200).json({ success: true, data: contract });
    } catch (err) {
      next(err);
    }
  },
  updatecontract: async (req, res, next) => {
    let contract = await contractModel.findById(req.params.id);

    if (!contract) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    contract = await contractModel.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: contract });
  },
  delete: async (req, res, next) => {
    const contract = await contractModel.findById(req.params.id);

    if (!contract) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    contract.remove();

    res.status(200).json({ success: true, data: {} });
  },
};
