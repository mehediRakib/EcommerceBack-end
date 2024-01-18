import React from 'react';
import productStore from "../../store/ProductStore.js";
import CategoriesSkeleton from "../../Skeleton/categories-skeleton.jsx";
import {Link} from "react-router-dom";
import BrandsSkeleton from "../../Skeleton/brands-skeleton.jsx";

const Brand = () => {
    const {BrandList}=productStore();

    if(BrandList===null){
        return (
            <BrandsSkeleton/>
        );
    }
    else {
        return (
            <div className="container section">
                <div className="row">
                    <h1 className="text-center headline-4 p-0 my-2">Top Brands</h1>
                    <span className="text-center mb-5 bodySmal">Explore a World of Choices Across Our Most Popular <br/>Shopping Categories</span>
                    {
                        BrandList.map((item,i)=>{
                            return(
                                <div className="col-6 col-md-8r col-lg-8r p-2 text-center">
                                    <Link to={"/by-brand/"+item['_id']} className="card h-100 bg-white shadow-sm rounded-3">
                                        <div className="card-body">
                                            <img className="w-75" src={item['brandImg']}/>
                                            <p className="mt-3 bodySmal">{item['brandName']}</p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
};

export default Brand;