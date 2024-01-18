const {createInvoiceService, PaymentFailService, PaymentCancelService, PaymentSuccessService, PaymentIPNService,
    InvoiceListService, InvoiceProductListService
} = require("../services/InvoiceServices");


exports.CreateInvoice=async (req,res)=>{
    let data=await createInvoiceService(req);
    res.status(200).json(data);
}

exports.PaymentFail=async (req,res)=>{
    let data=await PaymentFailService(req);
    res.status(200).json(data);
}

exports.paymentCancel=async (req,res)=>{
    let data=await PaymentCancelService(req);
    res.status(200).json(data);
}

exports.paymentSuccess=async (req,res)=>{
    let data=await PaymentSuccessService(req);
    res.status(200).json(data);
}

exports.PaymentIPN=async (req, res) => {
    let result=await PaymentIPNService(req);
    return res.status(200).json(result)
}

exports.invoiceList=async (req,res)=>{
    let result=await InvoiceListService(req);
    res.status(200).json(result);
}

exports.invoiceProductList=async (req,res)=>{
    let result=await InvoiceProductListService(req);
    res.status(200).json(result);
}

