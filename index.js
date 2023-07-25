const express=require("express");
const app=express();
const {connection}=require("./cofig/db");
const {UserRoute}=require("./routes/user.route");
const {ProductRoute}=require("./routes/product.route");
const { categoryRoute}=require("./routes/category.route")
require("dotenv").config();
app.use(express.json());


app.use("/User",UserRoute);
app.use("/category",categoryRoute);









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