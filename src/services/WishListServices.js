



const WishListModel=require('../models/WishModel');
const { ObjectId } = require('mongodb');

const WishListServices=async (req)=>{
try{
    let user_id=new ObjectId(req.headers.user_id);
    let MatchStage={$match:{userID:user_id}};

    let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}};
    let UnwindProductStage={$unwind:"$product"};

    let JoinWithBrand={$lookup: {from: "brands",localField: "product.brandID",foreignField:"_id",as:"brand" }};
    let UnwindBrandStage={$unwind: "$brand"};

    let JoinWithCategory={$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}}
    let UnwindCategoryStage={$unwind:"$category"};

    let ProjectionStage={$project:{'_id':0,'userID':0,'createdAt':0,'updatedAt':0,'product._id':0,'product.categoryID':0,'product.brandID':0,'brand._id':0,'category._id':0}}

   let data= await WishListModel.aggregate([
        MatchStage,
        JoinStageProduct,
       UnwindProductStage,
       JoinWithBrand,
       UnwindBrandStage,
       JoinWithCategory,
       UnwindCategoryStage,
       ProjectionStage,
       ]
    )
    return {status:"success",data:data};

}catch (e) {
    console.log("error :"+e)
    return {status:"fail",data:e}.toString();
}

}

const SaveWishListService=async (req)=>{
    try{
        let user_id=req.headers.user_id;
        let reqbody=req.body;
        reqbody.userID=user_id;
        await WishListModel.updateOne(reqbody,{$set:reqbody},{upsert:true});
        return {status:"successs",message:"Wish list save successfully"}

    }catch (e) {
        return {status:"fail",message:"Something Went Wrong",data:e.toString()};

    }
}

const RemoveWishListService=async (req) => {
   try{
       let user_id = req.headers.user_id;
       let reqBody = req.body;
       reqBody.userID = user_id;
       await WishListModel.deleteOne(reqBody);
       return {status:"success",message:"Wish list Remove success"}

   }catch (e) {
       return {status:"fail",message:"something went wrong"}
   }
}

module .exports={
    WishListServices,
    SaveWishListService,
    RemoveWishListService,
}