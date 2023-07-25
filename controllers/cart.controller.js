const { CartModel } = require("../models/cart.model");
const { body, validationResult } = require("express-validator");


const AddToCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { ProductId, userid } = req.body;
    const saveToCart = new CartModel({ ProductId, userId: userid });
    await saveToCart.save();
    const CartProduct = await CartModel.aggregate([
      { $match: { ProductId: ProductId,status:"Added in cart" } },
      {
        $lookup: {
          from: "products",
          foreignField: "_id",
          localField: "productId",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          productDetails: 1,
          quantity: 1,
        },
      },
    ]);
    console.log("cartproduct",CartProduct)
    res.status(201).send({ msg: "product has been added in cart",CartProduct });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error);
  }
};

const RemoveFromCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const id = req.params.id;
    const removeFromCart = await CartModel.findByIdAndDelete({ _id: id });
    res.status(204).send({ msg: "product has been removed from cart" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error);
  }
};

const UpdateCartProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { id, email, userid, role, data } = req.body;
    const UpdateCart = await CartModel.findByIdAndUpdate({ _id: id }, data);
    res
      .status(204)
      .send({ msg: "product has been updated in cart", UpdateCart });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error);
  }
};

const GetCartProducts = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { userid } = req.body;
    const AllCartProducts = await CartModel.aggregate([
      { $match: { userId: userid,status:"Added in cart" } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: $productDetails },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: $userDetails },
      {
        $project: {
          _id: 0,
          cartId: "$_id",
          quantity: "$quantity",
          productDetails: 1,
          userDetails: 1,
        },
      },
    ]);
    res.status(200).send(AllCartProducts);
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error);
  }
};

module.exports = {
  GetCartProducts,
  UpdateCartProduct,
  RemoveFromCart,
  AddToCart,
};
