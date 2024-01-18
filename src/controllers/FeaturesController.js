const {FeatureService} = require("../services/FeaturesServices");


exports.featureList=async (req,res)=>{
    let data=await FeatureService();
    res.status(200).json(data);
}