const mongoose = require('mongoose')

const dotenv = require("dotenv").config();

const DB = process.env.DB_URL

const Database = mongoose.connect(DB , {

    useNewUrlParser:true,

}, (err)=>{

    if(!err){

        console.log("Mongo connected successfully")

    }else{

        console.log("failed", err)
        
    }
})
module.exports = Database