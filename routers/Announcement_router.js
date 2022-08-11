const express = require("express");

const route = express.Router();

const Announcementcontroller = require("../controllers/Announcement_controller");
route.post("/create", Announcementcontroller.create);
route.get("/", Announcementcontroller.getall);
route.get("/:id", Announcementcontroller.getById);

route.put("/announcement/:id", Announcementcontroller.updateAnnouncement);
route.delete("/announcement/:id", Announcementcontroller.delete);

module.exports = route;
