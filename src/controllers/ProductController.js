
const {BrandListService,CategoryListService,SliderListService,ListByBrandService,ListByCategoryService,ListBySimilarService,ListByKeywordService,ListByRemarkService,DetailsService,ReviewListService,
    createReviewService
}=require('../services/ProductServices')

exports.ProductBrandList=async (req,res)=>{
let result=await BrandListService();
return res.status(200).json(result)
}

exports.ProductCategoryList=async (req,res)=>{
    let result=await CategoryListService();
    return res.status(200).json(result)
}

exports.ProductSliderList=async (req,res)=>{
    let result=await SliderListService();
    return res.status(200).json(result)
}

exports.ProductListByBrand=async (req,res)=>{

    let result=await ListByBrandService(req);
    return res.status(200).json(result)
}


exports.ProductListByCategory=async (req,res)=>{
    let result=await ListByCategoryService(req);
    return res.status(200).json(result)
}


exports.ProductListBySimilar=async (req,res)=>{
let result=await ListBySimilarService(req);
res.status(200).json({status:"success",data:result});
}


exports.ProductListByKeyword=async (req,res)=>{
let result=await ListByKeywordService(req);
res.status(200).json({status:"success",data:result});
}


exports.ProductListByRemark=async (req,res)=>{
let data=await ListByRemarkService(req);
res.status(200).json(data);
}


exports.ProductDetails=async (req,res)=>{
let data=await DetailsService(req);
res.status(200).json(data);
}


exports.ProductReviewList=async (req,res)=>{
    let result=await ReviewListService(req);
    res.status(200).json(result);
}

exports.createReview=async (req,res)=>{
    let result=await createReviewService(req);
    res.status(200).json(result);
}

