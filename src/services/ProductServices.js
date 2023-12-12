
const BrandModel=require('../models/BrandModel')
const CategoryModel=require('../models/CategoryModel')
const ProductDetailsModel=require('../models/ProductDetailsModel')
const ProductModel=require('../models/ProductModel')
const ReviewModel=require('../models/ReviewModel')
const ProductSliderModel=require('../models/ProductSliderModel')
const mongoose=require('mongoose');
const ObjectID=mongoose.Types.ObjectId;


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
    const BrandId=ObjectID(req.params.BrandID)
    let MatchStage={$match:{brandID:BrandId }};
    let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brands"}}
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"categories"}};

    let data=await ProductModel.aggregate([
        MatchStage,
        JoinWithBrandStage,
        JoinWithCategoryStage
    ])

}

const ListByCategoryService=async ()=>{

}

const ListBySimilarService=async ()=>{

}

const ListByKeywordService=async ()=>{

}

const ListByRemarkService=async ()=>{

}
const DetailsService=async ()=>{

}

const ReviewListService=async ()=>{

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
    ReviewListService
}