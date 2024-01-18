const express=require('express');
const app=new express();
const xss=require('xss');
const hpp=require('hpp');
const cookieParser=require('cookie-parser');
const mongoSanitize=require('express-mongo-sanitize');
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const cors=require('cors');
const bodyParser = require("body-parser");
const path=require('path');
const mongoose=require('mongoose');





//Security Middleware
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp())


//Request-RateLimit
const limiter=rateLimit({
    windowMs:15*60*1000,
    max:300
})
app.use(limiter);

//Body-parser
app.use(bodyParser.json());

//DataBase  Connection;
let URL="mongodb+srv://<username>:<password>@cluster0.75qh3yi.mongodb.net/MernEcommerce?retryWrites=true&w=majority";
let Option={user:'rakib107054',pass:'rakib172561',autoIndex:true};
mongoose.connect(URL,Option).then((res)=>{
    console.log("Database connection successfull")
}).catch((e)=>{
    console.log(e);
})

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}))


//Routing
const router=require('./src/routes/api')

app.set('etag',false);
app.use('/api/v1',router)



//connect front-end to Back-end
app.use(express.static('client/dist'))


//Add react front-end Routing
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})



module.exports=app;



