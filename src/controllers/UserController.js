const {UserOTPService, VerifyOTPService, CreateProfileService, saveProfileService, ReadProfileService} = require("../services/UserServices");
const {response} = require("express");


exports.UserOTP=async (req,res)=>{
let result= await UserOTPService(req);
  res.status(200).json(result);
}

exports.VeryfyLogin=async(req,res)=>{
  let result= await VerifyOTPService(req);
  if(result['status']==='success'){
    let cookieOption={expires:new Date(Date.now()+24*6060*1000),httponly:false};
    res.cookie('token',result['token'],cookieOption);
    res.status(200).json(result);
  }
  else {
    res.status(200).json(result);
  }

}

exports.UserLogout=async (req,res)=>{
  let cookieOption={expires: new Date(Date.now()-24*6060*1000),httponly: false};
  res.cookie('token',"",cookieOption);
  return res.status(200).json({status:"success"});
}

exports.CreateProfile=async (req,res)=>{
let result= await saveProfileService(req);
return res.status(200).json(result);
}

exports.UpdateProfile=async (req,res)=>{
  let result= await saveProfileService(req);
  return res.status(200).json(result)
}

exports. ReadProfile=async (req,res)=>{
  let result=await ReadProfileService(req);
  return res.status(200).json(result)
}