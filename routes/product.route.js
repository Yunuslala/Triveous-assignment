const express=require("express");
const { ProductAdd,ProductsById,AllProducts,RemoveProducts,updateProducts}=require("../controllers/product.controller")
const ProductRoute=express.Router();
const {Authentication}=require("../middlewares/authentication");
const {VendorAuthorization,AdminAuthorization}=require("../middlewares/authorization")
const { body, validationResult } = require("express-validator");


ProductRoute.use(Authentication);
ProductRoute.use(VendorAuthorization);
ProductRoute.post('/post',ProductAdd);
ProductRoute.get('/get',AllProducts);
ProductRoute.get('/get/:ProductId',ProductsById);
ProductRoute.delete('/delete/:ProductId',RemoveProducts);
ProductRoute.patch("/patch",updateProducts);


module.exports={
    ProductRoute
}