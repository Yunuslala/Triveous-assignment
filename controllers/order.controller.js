const {OrderModel}=require('../models/order.model');
const {CartModel}=require("../models/cart.model")
const Orderplaced=async(req,res)=>{
    try {
        const cartId=req.body;
        const updateInCart=await CartModel.findByIdAndUpdate({_id:cartId},{"status":"placed"});
        const OrderPlaced=new OrderModel({cartId});
        OrderPlaced.save()
        res.status(201).send({"msg":"order has been placed"})
    } catch (error) {
        console.log("error", error);
        res.status(500).send(error);
    }
}

const GetAllOrderHistory=async(req,res)=>{
    try {
        const AllHistory=await CartModel.find({status:"placed"});
        res.status(200).send(AllHistory)
    } catch (error) {
        console.log("error", error);
        res.status(500).send(error);
    }
}


const GetparticularUserHistory=async(req,res)=>{
    try {
        const {userid}=req.body;
        const AllHistory=await CartModel.find({status:"placed",userId:userid});
        if(!AllHistory.length){
            return res.status(404).send({"msg":"Did not placed any order"})
        }
        res.status(200).send(AllHistory)
    } catch (error) {
        console.log("error", error);
        res.status(500).send(error);
    }
}

module.exports={
    Orderplaced,GetAllOrderHistory,GetparticularUserHistory
}