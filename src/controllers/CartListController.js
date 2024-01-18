const {saveCartListService, removeCartListService, cartListService, updateCartListService} = require("../services/CartListServices");


exports.cartList=async (req,res)=>{
 const result=await cartListService(req);
 res.status(200).json(result);
}


exports.saveCartList=async (req,res)=>{
    const result=await saveCartListService(req);
    res.status(200).json(result);

}

exports.removeCartList=async (req,res)=>{
    let result=await removeCartListService(req);
    res.status(200).json(result);
}

exports.updateCartList=async (req,res)=>{
    let result=await  updateCartListService(req);
    res.status(200).json(result);
}