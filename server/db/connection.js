const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();


const connection = mongoose.connect(process.env.MONGODB_URI).then((db)=>{
    console.log("Database Connected ")
    return db;
}).catch((error)=>{
    console.log("Connection Error:" + error)
});


module.exports = connection