require("dotenv/config")
const express = require("express");
const app = express();
const  port = process.env.PORT || 5781 
const connect = require('./config/DB');
const authRoute = require('./routes/authRoute');
const cors = require("cors");
const userRoute = require("./routes/userRoute")
const cloudinary = require('cloudinary').v2;
const fileupload = require("express-fileupload")


// custom middlewares
app.use(fileupload({useTempFiles: true}));
app.use(express.json())
app.use(cors())


// API's

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/user',userRoute)


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });


//  Server and DB connection 
connect()
.then(()=>{
try {
    app.listen(port,()=>{
        console.log(`EM-Server is connected to http://localhost:${port}`);
    })
    
} catch (error) {
    console.log("can not connect to the EM server");
}

})
.catch((error)=>{
    console.log("invalid database connection ...", error);
})



//  Routes 
app.get('/',(req,res)=>{
    res.status(200).json({success:true,message:"EM server is live"})
})

app.use((req,res)=>{
    res.status(404).json({success:false,message:"route doesnt exist"})
})