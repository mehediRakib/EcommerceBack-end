import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";
import productStore from "../../store/ProductStore.js";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
const ProductList = () => {
    const navigate=useNavigate();
    const {ListProduct}=productStore();
    const {SearchKeyword,SetSearchKeyword}=productStore();
    const {BrandList,CategoryList,BrandListRequest,CategoryListRequest,ListByFilterRequest}=productStore();

    useEffect(() => {
        (async ()=>{
            await BrandListRequest();
            await CategoryListRequest();
        })()
    }, []);


    //
    const BrandOnChange = (id) => {

        // TO DO OR OR Search ---
        id!==""? ListByFilterRequest(id):""

    }

    const CategoryOnChange= (id) => {
        id!==""? ListByFilterRequest(id):""
    }






    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-3 p-2">
                    <div className="card vh-100 p-3 shadow-sm">
                        <label className="form-label mt-3">By Keyword</label>
                        <div className="input-group">
                            <input onChange={(e)=>SetSearchKeyword(e.target.value)} className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                            <Link  className="btn btn-outline-dark" type="submit" to={SearchKeyword.length>0?`/by-keyword/${SearchKeyword}`:`/`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: 24, height: 24 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </Link>
                        </div>

                        <label className="form-label mt-3">Price Range</label>
                        <input type="range" className="form-range"/>

                        <label className="form-label mt-3">Brands</label>
                        <select onChange={(e)=>{BrandOnChange(e.target.value)}} className="form-control form-select">
                            <option value="">Choose Brand</option>
                            {BrandList!==null?(
                                BrandList.map((item,i)=>{
                                    return(<option value={item['_id']}>{item['brandName']}</option>)
                                })
                            ):(<option></option>)}
                        </select>

                        <label className="form-label mt-3">Categories</label>
                        <select onChange={(e)=>{CategoryOnChange(e.target.value)}} className="form-control form-select">
                            <option value="">Choose Category</option>
                            {CategoryList!==null?(
                                CategoryList.map((item,i)=>{
                                    return(<option value={item['_id']}>{item['categoryName']}</option>)
                                })
                            ):(<option></option>)}
                        </select>
                    </div>
                </div>
                <div className="col-md-9 p-2">
                    <div className="container">
                        <div className="row">
                            {
                                (()=>{
                                    if(ListProduct!==null){
                                        return  ListProduct.map((item,i)=>{

                                            let price=<p className="bodyMedium  text-dark my-1">Price: ${item['price']} </p>
                                            if(item['discount']===true){
                                                price=<p className="bodyMedium  text-dark my-1">Price: <strike>${item['price']}</strike> ${item['discountPrice']}</p>
                                            }

                                            return(
                                                <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                    <Link to={"/details/"+item['_id']} className="card shadow-sm h-100 rounded-3 bg-white">
                                                        <img className="w-100 rounded-top-2" src={item['image']}/>
                                                        <div className="card-body">
                                                            <p className="bodySmal text-secondary my-1">{item['title']}</p>
                                                            {price}
                                                            <StarRatings rating={parseFloat(item['star'])} starRatedColor="red" starDimension="15px" starSpacing="2px"/>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }else {
                                        return <ProductsSkeleton/>
                                    }
                                })()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ProductList;