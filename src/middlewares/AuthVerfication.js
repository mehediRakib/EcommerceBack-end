const {DecodeToken} = require("../utility/TokenHelper");


module.exports=(req,res,next)=>{
    let token=req.headers['token'];
    if(!token){
        token=req.cookies['token'];
    }

    let Decode= DecodeToken(token);
    if(Decode===null){
        res.status(401).json({status:"fail",message:"Unauthorized"})
    }
    else {
        let email=Decode['email'];
        let user_id=Decode['user_id'];
        req.headers.email=email;
        req.headers.user_id=user_id;
        next();
    }
}