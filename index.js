const express=require("express");
const app=express();
const {connection}=require("./cofig/db");
const {userRoute}=require("./routes/user.route");
const {ProductRoute}=require("./routes/product.route");;
require("dotenv").config();
app.use(express.json());












app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connected")
        console.log(error)
    }
    console.log(`http://localhost:${process.env.port}`)
})