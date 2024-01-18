const express=require('express');

const ProductController=require('../controllers/ProductController');
const UserController=require('../controllers/UserController');
const AuthVerification=require('../middlewares/AuthVerfication');
const WishListController=require('../controllers/WishListController');
const CartListController=require('../controllers/CartListController');
const InvoiceController=require('../controllers/InvoiceController');
const FeatureController=require('../controllers/FeaturesController');
const router=express.Router();


//product Routing end point
router.get('/ProductBrandList',ProductController.ProductBrandList);
router.get("/ProductCategoryList",ProductController.ProductCategoryList)
router.get("/ProductSliderList",ProductController.ProductSliderList)
router.get("/ProductListByBrand/:BrandID",ProductController.ProductListByBrand)
router.get("/ProductListByCategory/:CategoryID",ProductController.ProductListByCategory)
router.get("/ProductListBySimilar/:CategoryID",ProductController.ProductListBySimilar)
router.get("/ProductListByKeyword/:Keyword",ProductController.ProductListByKeyword)
router.get("/ProductListByRemark/:Remark",ProductController.ProductListByRemark)
router.get("/ProductDetails/:ProductID",ProductController.ProductDetails)
router.get("/ProductReviewList/:ProductID",ProductController.ProductReviewList)


// User Routing end point

router.get("/userOTP/:email",UserController.UserOTP);
router.get("/VerifyLogin/:email/:OTP",UserController.VeryfyLogin);
router.get('/UserLogout',AuthVerification,UserController.UserLogout)
router.post('/CreateProfile',AuthVerification,UserController.CreateProfile);
router.post('/UpdateProfile',AuthVerification,UserController.UpdateProfile)
router.get('/readProfile',AuthVerification,UserController.ReadProfile)

//WishList Routing
router.post('/SaveWishList',AuthVerification,WishListController.SaveWishList);
router.get('/WishList',AuthVerification,WishListController.WishList);
router.get('/DeleteWishList',AuthVerification,WishListController.RemoveWishList);

//cartList
router.post('/saveCartList',AuthVerification,CartListController.saveCartList);
router.post('/removeCartList',AuthVerification,CartListController.removeCartList);
router.get('/cartList',AuthVerification,CartListController.cartList);
router.post('/updateCartList/:id',AuthVerification,CartListController.updateCartList);

//Payment And Invoice

router.get('/CreateInvoice',AuthVerification,InvoiceController.CreateInvoice);
router.get('/invoiceList',AuthVerification,InvoiceController.invoiceList);
router.get('/invoiceProductList/:invoiceId',AuthVerification,InvoiceController.invoiceProductList);





router.post('/PaymentFail/:trxID',InvoiceController.PaymentFail);
router.post('/paymentCancel/:trxID',InvoiceController.paymentCancel);
router.post('/paymentSuccess/:trxID',InvoiceController.paymentSuccess);
router.post('/PaymentIPN/:trxID',InvoiceController.PaymentIPN);

//feature

router.get('/FeaturesList',FeatureController.featureList);

//review

router.post('/createReview',AuthVerification,ProductController.createReview);
module.exports=router;