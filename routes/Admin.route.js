const express = require("express");
const {blockUser,DeleteProduct,deleteUser}=require("../controllers/Admin.controller")
const {
    VendorAuthorization,
    AdminAuthorization,
  } = require("../middlewares/authorization");
  const { Authentication } = require("../middlewares/authentication");

  const AdminRouter=express.Router();
AdminRouter.use(Authentication);
AdminRouter.use(AdminAuthorization)
  AdminRouter.post('/user/block',blockUser);
  AdminRouter.post('/user/delete',deleteUser)
  AdminRouter.post('/product/delete',DeleteProduct)


  module.exports={
    AdminRouter
  }