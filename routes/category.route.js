const express=require("express");
const categoryRoute=express.Router();
const {AddCategory,AllCategories}=require("../controllers/category.controller")
const {VendorAuthorization}=require("../middlewares/authorization");
const {Authentication}=require("../middlewares/authentication");
categoryRoute.use(Authentication);
categoryRoute.use(VendorAuthorization)
categoryRoute.post('/Add',AddCategory);

categoryRoute.get('/get',AllCategories);






module.exports={
    categoryRoute
}