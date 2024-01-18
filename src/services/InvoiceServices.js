const cartModel=require('../models/CartModel');
const profileModel=require('../models/ProfileModel');
const invoiceModel=require('../models/InvoiceModel');
const invoiceProductModel=require('../models/InvoiceProductModel');
const PaymentSettingModel=require('../models/PaymentSettingModel');

const mongoose=require('mongoose');
const axios = require("axios");
const ObjectId=mongoose.Types.ObjectId;


const createInvoiceService=async (req) => {


    //---------------Step 1: Calculate total Payable and vat-----------------//

    let user_id = new ObjectId(req.headers.user_id);
    let email = req.headers.email;

    let MatchStage = {$match: {userID: user_id}};
    let joinProductTable = {$lookup: {from: 'products', localField: 'productID', foreignField: '_id', as: 'product'}};
    let UnwindProductStage = {$unwind: "$product"};

    let CartProduct= await cartModel.aggregate([
        MatchStage,
        joinProductTable,
        UnwindProductStage,
    ])

    let totalPrice=0;
    let price;
    CartProduct.forEach(element=>{
      
        if(element['product']['discount']){
           price=parseFloat(element['product']['discountPrice']);
        }
        else {
            price=parseFloat(element['product']['price']);
        }

        totalPrice+=element['qty']*price;

    })

    let vat=totalPrice*0.05;
    let payable=totalPrice+vat;


    //==========================Step2:  prepare Shipping details and cusTomer Details=========================//

    let profile=await profileModel.aggregate([MatchStage]);
    let CusDetails=`Name:${profile[0].cus_name},Email:${email},Address:${profile[0].cus_add},Phone:${profile[0].cus_phone}`;
    let ShipDetails=`Name:${profile[0].ship_name},City:${profile[0].ship_city},Address:${profile[0].ship_add},Phone:${profile[0].ship_phone}`



    //===================step3: Transaction and othersID=====================//
    let tran_id=Math.floor(10000000+Math.random()*90000000);
    let val_id=0;
    let delivary_Status='pending';
    let payment_status='pending';


    //===============step 4: create Invoice===============//

    let createInvoice=await invoiceModel.create(
        {
            userID:user_id,
            payable:payable,
            cus_details:CusDetails,
            ship_details:ShipDetails,

            tran_id:tran_id,
            val_id:val_id,
            payment_status:payment_status,

            delivery_status:delivary_Status,
            total:totalPrice,
            vat:vat,
        }
    )




// =============step 5: Create invoice Product===========//

  let invoiceID=createInvoice['_id'];
    CartProduct.forEach(async (element)=>{
        await invoiceProductModel.create(
            {
                userID:user_id,
                productID:element['productID'],
                invoiceID:invoiceID,
                qty:element['qty'],
                price:element['product']['discount']?element['product']['discountPrice']: element['product']['price'],
                color:element['color'],
                size:element['size'],
    })

    })




//============step6: Remove cart===============//
   await cartModel.deleteOne({userID:user_id});



//==============step 7: prepare SSL Payment=====================//

let paymentSetting=await PaymentSettingModel.find()

    const form=new FormData();

    form.append('store_id',paymentSetting[0]['store_id'])
    form.append('store_passwd',paymentSetting[0]['store_passwd'])
    form.append('total_amount',payable.toString());
    form.append('currency',paymentSetting[0]['currency'])
    form.append('tran_id',paymentSetting[0]['tran_id'])
    form.append('success_url',`${paymentSetting[0]['success_url']}/${tran_id}`)
    form.append('fail_url',`${paymentSetting[0]['fail_url']}/${tran_id}`)
    form.append('cancel_url',`${paymentSetting[0]['cancel_url']}/${tran_id}`)
    form.append('ipn_url',`${paymentSetting[0]['ipn_url']}/${tran_id}`)

    form.append('cus_name',profile[0].cus_name);
    form.append('cus_email',email);
    form.append('cus_add1',profile[0].cus_add);
    form.append('cus_add2',profile[0].cus_add);
    form.append('cus_city', profile[0].cus_city);
    form.append('cus_state', profile[0].cus_state);
    form.append('cus_postcode',profile[0].cus_postcode);
    form.append('cus_country', profile[0].cus_country);
    form.append('cus_phone', profile[0].cus_phone);
    form.append('cus_fax', profile[0].cus_phone);

    form.append('shipping_method','YES');
    form.append('ship_name',profile[0].ship_name);
    form.append('ship_add1',profile[0].ship_add);
    form.append('ship_add2',profile[0].ship_add);

    form.append('ship_city', profile[0].ship_city);
    form.append('ship_state', profile[0].ship_state);
    form.append('ship_country', profile[0].ship_country);
    form.append('ship_postcode', profile[0].ship_postcode);
    form.append('product_name', 'product_name');
    form.append('product_category', 'category');
    form.append('product_profile', 'profile');
    form.append('product_amount', '3');

    let SSLres=await axios.post(paymentSetting[0]['init_url'],form);
     return{status:'success',data:SSLres.data};

   


}


const PaymentFailService=async (req)=>{
   try{
       let tran_id=req.params.trxID;
       await invoiceModel.updateOne({tran_id:tran_id},{payment_status:"fail"});
       return {status:"payment fail"};
   }
   catch (e) {
       return {status:'fail',message:"Something went wrong"};
   }
}

const PaymentCancelService=async (req)=>{
    try{
        let tran_id=req.params.trxID;
        await invoiceModel.updateOne({tran_id:tran_id},{payment_status:'cancel'});
        return {status:"Payment cancel"};

    }catch (e) {
        return {status:"fail",message:"something went wrong"}
    }
}

const  PaymentIPNService=async (req)=>{
    try{
        let tran_id=req.params.trxID;
        let status=req.body['status'];
        await invoiceModel.updateOne({tran_id:tran_id},{payment_status:status});
        return {status:'payment fail'}
    }
    catch (e) {
        return {status:'fail',message:'something went wrong'};
    }

}


const PaymentSuccessService=async (req,res)=>{
   try{
       let tran_id=req.params.trxID;
       await invoiceModel.updateOne({tran_id:tran_id},{payment_status:"success"});
       return {status:"Payment Success"};
   }catch (e) {
       return {status:'fail',messsage:'something went wrong'};
   }

}

const InvoiceListService=async (req)=>{
    try{
        let user_id=req.headers.user_id;
       let data= await invoiceModel.find({userID:user_id});
       return {status:'success',data:data};

    }catch (e) {
        return {status:"fail",message:'Something went wrong'};

    }
}
const InvoiceProductListService=async(req)=>{
    try{
        let userID=new ObjectId(req.headers.user_id);
        let invoiceID=new ObjectId(req.params.invoiceId);
        let matchStage={$match:{userID:userID,invoiceID:invoiceID}};

        let ProductStage={$lookup: {from:'products',localField:'productID',foreignField: "_id",as:'product'}};
        let UnwindProductStage={$unwind: "$product"};

        let data=await invoiceProductModel.aggregate([
            matchStage,
            ProductStage,
            UnwindProductStage,
        ])
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",data:"Something went wrong"};
    }
}







module.exports={
    createInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentSuccessService,
    PaymentIPNService,
    InvoiceListService,
    InvoiceProductListService
}