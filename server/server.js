const express = require('express');
const app = express();
const cors = require('cors');

require("dotenv").config({path:"./config.env"});
const PORT = process.env.PORT || 3000;

// use middleware

app.use(cors());
app.use(express.json());

// monogodb connection
const copnnection = require('./db/connection.js')



// using routes
app.use(require("./routes/routes"))

app.listen(PORT,()=>{
  console.log(`Server is running on port:${PORT}`);
}); 

app.on("error",err=>console.log(`Failed to connect with HTTP Server: ${err}`)) 