const multer = require("multer")

const Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './storages')
    },
    filename: function(req, file, cb) {
         const images = Date.now() + '-' + file.originalname
         cb(null, file.fieldname + Date.now() + images)
    }
})
const upload = multer({
    storage: Storage,
    limits: { _fileSize: 1024 * 1024 * 1024 * 10 },
     fileFilter: function(req, file, cb) {
        if (file.mimetype === "image/jpg"  ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png"  ||
           
            file.mimetype === "video/mp4"  ||
            "application/pdf") {
            cb(null, true)
        } else {
            cb(new Error("Image uploaded is not of type jpg/jpeg/png  .....", false))
        }
    }
})
module.exports = upload