const mongoose=require("mongoose");

const cartSchema=mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    status:{
        type:String,
        default:["Added in cart","Placed for order"]
    },
    isRemoved:{
        type:Boolean,
        default:false
    },
    quantity:{
        type:Number,
        default:1
    }
})