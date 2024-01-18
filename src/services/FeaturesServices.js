
const FeatureModel=require('../models/FeaturesModel');

const FeatureService=async ()=>{
    try{
        let result= await FeatureModel.find();
        return {status:'success', data:result};
    }catch (e) {
        return {status:'fail', data:e.toString()};
    }
}

module.exports={
    FeatureService
}