const mongosse = require("mongoose");
const msgSchema = new mongosse.Schema({
    msg: {
        type: String,
        required:true
    }
})

const Msg = mongosse.model('msg',msgSchema);
module.exports = Msg;