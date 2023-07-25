const express=require("express");
const OrderRoute=express.Router();
const { Orderplaced,GetAllOrderHistory,GetparticularUserHistory}=require('../controllers/order.controller');
const {authentication}=require('../middlewares/authentication')
const { body, validationResult } = require("express-validator");

OrderRoute.use(authentication)
OrderRoute.post("/place",Orderplaced);
OrderRoute.get('/AllHistory',GetAllOrderHistory);
OrderRoute.get("history/:id",GetparticularUserHistory);


module.exports={
    OrderRoute
}