const express = require("express");

const route = express.Router();
const upload = require("../middleware/uploadfile");
const rhcontroller = require("../controllers/Rh_controller");

route.post("/create", upload.single("photo"), rhcontroller.create);
route.get("/",  rhcontroller.getall);
route.get("/:id",  rhcontroller.getById);
route.put("/rh/:id",  rhcontroller.updaterh);
route.delete("/rh/:id",  rhcontroller.delete);

module.exports = route;
