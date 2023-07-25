const express = require("express");
const {
  GetCartProducts,
  UpdateCartProduct,
  RemoveFromCart,
  AddToCart,
} = require("../controllers/cart.controller");
const CartRouter = express.Router();
const { body, validationResult } = require("express-validator");

const { Authentication } = require("../middlewares/authentication");
CartRouter.use(Authentication);
CartRouter.post(
  "/Post",
  checl("ProductId")
    .exists()
    .withMessage("id is required")
    .isString()
    .withMessage("id must be a string"),
  AddToCart
);
CartRouter.post(
  "/remove/:id",
  check("id")
    .exists()
    .withMessage("id is required")
    .isString()
    .withMessage("id must be a string"),
  RemoveFromCart
);
CartRouter.patch("/update",
check("id")
    .exists()
    .withMessage("id is required")
    .isString()
    .withMessage("id must be a string"),
     UpdateCartProduct);
CartRouter.get("/get", GetCartProducts);

module.exports = {
  CartRouter,
};
