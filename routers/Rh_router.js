const express = require("express");
const {protect , authorize} = require('../middleware/auth')

const route = express.Router();
const upload = require("../middleware/uploadfile");
const rhcontroller = require("../controllers/Rh_controller");

route.post("/create", upload.single("photo"),protect,authorize('admin'), rhcontroller.create);
route.get("/",  rhcontroller.getall);
route.get("/:id",  rhcontroller.getById);
route.put("/rh/:id", protect,authorize('admin'), rhcontroller.updaterh);
route.delete("/rh/:id", protect,authorize('admin'), rhcontroller.delete);

module.exports = route;
