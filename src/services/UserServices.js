
const userModel=require('../models/UserModel');
const EmailSend = require("../utility/EmailHelper");
const {EncodeToken} = require("../utility/TokenHelper");
const profileModel=require('../models/ProfileModel');

const UserOTPService=async (req)=>{
    try{

        let email = req.params.email;
        let code = Math.floor(100000 + Math.random() * 900000);
        let EmailText = "Your Verification code is: " + code;
        let EmailSubject = "Email Verification";
        await EmailSend(email,EmailText,EmailSubject);
        await  userModel.updateOne({email:email}, {$set:{otp:code}},{upsert:true});
        return {status:"success",message:"6 Digit otp has been send"}
    }catch (e) {
        return {status:"fail",message:"something went wrong"};
    }

}

const VerifyOTPService=async (req ) => {
    let email = req.params.email;
    let otp = req.params.OTP;
    let total=await userModel.find({email:email,otp:otp}).count('total');
    if(total===1){
        //user id read
        let user_id=await userModel.find({email:email}).select('_id');
        let token=await EncodeToken(email,user_id[0]['_id'].toString());
        await userModel.updateOne({email:email},{$set:{otp:"0"}});
        return {status:"success",message:"Valid OTP",token:token};
    }
    else{
        return {status:"fail",message:"Invalid OTP"};
    }
}


const saveProfileService=async (req) => {
   try {
       const reqbody = req.body;
       const user_id = req.headers.user_id;
       reqbody.userID = user_id;
       const result = await profileModel.updateOne({userID: user_id}, {$set: reqbody}, {upsert: true});
       return {status:"success",message:"profile save success"};
   }catch (e) {
       return {status:"fail",message:"Something went wrong"};
   }


}
const ReadProfileService=async (req)=>{
    try{
        const user_ID=req.headers.user_id;
        const result= await profileModel.find({userID:user_ID});
        return {status:"success",message:result};
    }catch (e) {
        return {status:"fail",message:"Something went wrong"};
    }



}

module .exports={
    UserOTPService,
    VerifyOTPService,
    saveProfileService,
    ReadProfileService

}