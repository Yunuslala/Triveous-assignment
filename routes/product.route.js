const express=require("express");
const { ProductAdd,ProductsById,AllProducts}=require("../controllers/product.controller")
const ProductRoute=express.Router();
const {Authentication}=require("../middlewares/authentication");
ProductRoute.use(Authentication);

ProductRoute.post('/post',ProductAdd);
ProductRoute.get('/get',AllProducts);
ProductRoute.get('/get/:ProductId',ProductsById)