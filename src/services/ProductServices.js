
const BrandModel=require('../models/BrandModel')
const CategoryModel=require('../models/CategoryModel')
const ProductDetailsModel=require('../models/ProductDetailsModel')
const ProductModel=require('../models/ProductModel')
const ProductSliderModel=require('../models/ProductSliderModel')
const mongoose=require('mongoose');
const ObjectID=mongoose.Types.ObjectId;
const reviewModel=require('../models/ReviewModel');


const BrandListService=async ()=>{
try{
   let data= await BrandModel.find();
   return({status:"success",data:data});
}catch (e) {
    return({status:"success",data:e.toString()});
}
}

const CategoryListService=async ()=>{
    try{
        let data= await CategoryModel.find();
        return({status:"success",data:data});
    }catch (e) {
        return({status:"success",data:e});
    }

}
const SliderListService=async ()=>{
    try{
        let data= await ProductSliderModel.find();
        return({status:"success",data:data});
    }catch (e) {
        return({status:"success",data:e});
    }
}

const ListByBrandService=async (req)=>{
   try{
       const BrandId=new ObjectID(req.params.BrandID)
       let MatchStage={$match:{brandID:BrandId }};
       let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
       let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
       let UnwindBrandsStage={$unwind:"$brand"};
       let UnwindCategoryStage={$unwind: "$category"};
       let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};


       let data=await ProductModel.aggregate([
           MatchStage,
           JoinWithBrandStage,
           JoinWithCategoryStage,
           UnwindBrandsStage,
           UnwindCategoryStage,
           ProjectionStage,

       ])
       return {status:"success",data:data};
   }catch (e) {
       return {status:"fail",data:e}.toString();
   }

}
const ListByCategoryService=async (req)=>{
    try{
        let CategoryID=new ObjectID(req.params.CategoryID)
        let MatchStage={$match:{categoryID:CategoryID }};
        let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandsStage={$unwind:"$brand"};
        let UnwindCategoryStage={$unwind: "$category"};
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};


        let data=await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandsStage,
            UnwindCategoryStage,
            ProjectionStage,

        ])
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",data:e}.toString();
    }

}
const ListByRemarkService=async (req)=>{
    try{
        let Remark=req.params.Remark;
        let MatchStage={$match:{remark:Remark }};
        let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandsStage={$unwind:"$brand"};
        let UnwindCategoryStage={$unwind: "$category"};
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};


        let data=await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandsStage,
            UnwindCategoryStage,
            ProjectionStage,

        ])
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",data:e}.toString();
    }
}


const ListBySimilarService=async ()=>{
    try{
        let CategoryID=req.params.CategoryID;
        let MatchStage={$match:{categoryID:CategoryID }};
        let LimitStage={$limit:20};
        let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandsStage={$unwind:"$brand"};
        let UnwindCategoryStage={$unwind: "$category"};
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};


        let data=await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandsStage,
            UnwindCategoryStage,
            ProjectionStage,
            LimitStage

        ])
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",data:e}.toString();
    }
}

const DetailsService=async (req)=>{
   try{
       let ProductID=new ObjectID(req.params.ProductID);
       let MatchStage={$match:{_id:ProductID }};

       let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
       let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
       let JoinWithProductDetails={$lookup:{from:"productdetails",localField:"_id",foreignField:"productID",as:"details"}};

       let UnwindBrandsStage={$unwind:"$brand"};
       let UnwindCategoryStage={$unwind: "$category"};
       let UnwindDetailsStage={$unwind:'$details'};


       let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};

       let data=await ProductModel.aggregate([
           MatchStage,
           JoinWithBrandStage,
           JoinWithCategoryStage,
           JoinWithProductDetails,
           UnwindBrandsStage,
           UnwindCategoryStage,
           UnwindDetailsStage,
           ProjectionStage,
       ])
       return {status:'success',data:data};

   }catch (e) {
       return {status:'fail',data:e}.toString();
   }

}
const ListByKeywordService=async (req)=>{
    try{
 let SearchReges={"$regex":req.params.Keyword,"$options":"i"};
 let SearchParam=[{Keyword:SearchReges},{shortDes:SearchReges}];
 let SearchQuery={$or:SearchParam};
 let MatchStage={$match:SearchQuery}

    let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandsStage={$unwind:"$brand"};
    let UnwindCategoryStage={$unwind: "$category"};
    let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}};


    let data=await ProductModel.aggregate([
        MatchStage,
        JoinWithBrandStage,
        JoinWithCategoryStage,
        UnwindBrandsStage,
        UnwindCategoryStage,
        ProjectionStage,

    ])
    return {status:"success",data:data};
}catch (e) {
    return {status:"fail",data:e}.toString();
}

}

const ReviewListService=async (req)=>{
    try{
    let ProductID= new ObjectID(req.params.ProductID);
    let MatchStage={$match:{productID:ProductID}};

    let JoinWithProfileStage={$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}};
    let UnwindProfileStage={$unwind:"$profile"}
    let ProjectionStage= {$project: {'des': 1, 'rating': 1, 'profile.cus_name': 1}}
    let data=await reviewModel.aggregate([
        MatchStage,
        JoinWithProfileStage,
       UnwindProfileStage,
        ProjectionStage,
    ])

    return {status:"success",data:data};
}catch (e) {
    return {status:"fail",data:e}.toString();
}

}

const createReviewService=async (req)=>{
   try{
       let userID=req.headers.user_id;
       let reqBody=req.body;
       reqBody.userID=userID;
      let result=await reviewModel.create(reqBody)

       return {
           status:'success',data:result
       }

   }catch (e) {
       return {status:'fail',data:e.toString()}
   }

}


module.exports={
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySimilarService,
    ListByKeywordService,
    ListByRemarkService,
    DetailsService,
    ReviewListService,
    createReviewService
}