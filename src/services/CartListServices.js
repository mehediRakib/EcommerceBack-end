const cartModel=require('../models/CartModel');
const {ObjectId} = require("mongodb");

const cartListService=async (req)=>{
    try{
        const user_id=new ObjectId(req.headers.user_id);


        const matchStage={$match:{userID:user_id}};

        const productStage={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let UnwindProductStage={$unwind:"$product"};

        let BrandStage={$lookup:{from:"brands",localField:"product.brandID",foreignField: "_id",as:"brand"}}
        let UnwindBrandStage={$unwind:"$brand"};

        let  categoryStage={$lookup:{from:'categories',localField:"product.categoryID",foreignField:"_id",as:"category"}};
        let UnwindCategoryStage={$unwind:"$category"};

        let ProjectionStage={$project:{'_id':0,'userID':0,'createdAt':0,'updatedAt':0,'product._id':0,
                'product.categoryID':0,'product.brandID':0,'brand._id':0,'category._id':0}}


        const data=await cartModel.aggregate(
            [
                matchStage,
                productStage,
                UnwindProductStage,
                BrandStage,
                UnwindBrandStage,
                categoryStage,
                UnwindCategoryStage,
                ProjectionStage,

            ]
        )
        return {status:'success',data:data};
    }catch (e) {
        return {status:'fail',data:e.toString()};
    }
}

const saveCartListService=async(req)=>{

   try{
     const user_id=req.headers.user_id;
     const reqBody=req.body;
     reqBody.userID=user_id;
     await cartModel.create(reqBody);
     return {status:'success',data:'cart list create successfull'}
   }catch(e){
    return {status:'fail',data:'something went wrong'};
   }

}

const removeCartListService=async (req)=>{
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await cartModel.deleteOne(reqBody);
        return {status:'success',data:'cart remove success'}


    }catch (e) {
        return {status:'success',data:'Something went wrong'}

    }

}


const updateCartListService=async (req)=>{
    try{

        let user_id=req.headers.user_id;
        let id=req.params.id;
        let match={userID:user_id,_id:id};
        const reqBody=req.body;

        await cartModel.updateOne(match,{$set:reqBody});
        return {status:'success',data:"cartList update successful"};
    }catch (e) {
        return {status:'fail',data:"Something went wrong"};
    }

}

module.exports={
    saveCartListService,
    removeCartListService,
    cartListService,
    updateCartListService,
}