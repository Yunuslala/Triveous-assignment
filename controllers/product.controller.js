const {ProductMOdel}=require("../models/product.model");
const ProductAdd=async(req,res)=>{
    try {
        const {title,category,description,price}=req.body;
        const PostPrdoucts=new ProductMOdel({title,category,description,price});
        await PostPrdoucts.save();
        res.status(201).send({"msg":"Produc has been added"})
    } catch (error) {
        console.log("error", error);
        res.status(500).send(error);
    }
}

const AllProducts=async(req,res)=>{
try {
    const GetProducts=await ProductMOdel.find({availability:true});
    res.status(200).send(GetProducts)
} catch (error) {
    console.log("error", error);
    res.status(500).send(error);
}
}

const ProductsById=async(req,res)=>{
try {
    const {ProductId}=req.params;

    const GetByID=await ProductMOdel.find({_id:ProductId,availability:true});
    if(GetByID.length){
        return res.status(200).send(GetByID);
    }else{
        return res.status(404).send({"msg":"product is not available"})
    }
} catch (error) {
    console.log("error", error);
    res.status(500).send(error);
}
}

const RemoveProducts=async(req,res)=>{
    try {
        const {ProductId}=req.params;
    const GetByID=await ProductMOdel.findByIdAndUpdate({_id:ProductId},{availability:true});
    res.send({"msg":"particular Product has been removed",GetByID})

    } catch (error) {
        console.log("error", error);
        res.status(500).send(error);
    }
}

const updateProducts=async(req,res)=>{
    try {
        const {ProductId,userId,email,role,data}=req.body
        const GetByID=await ProductMOdel.findByIdAndUpdate({_id:ProductId},data);
        console.log(GetByID)
        res.send({"msg":"particular Product has been removed",GetByID})
    } catch (error) {
        console.log("error", error);
        res.status(500).send(error);
    }
}

module.exports={
    ProductAdd,ProductsById,AllProducts,RemoveProducts,updateProducts
}