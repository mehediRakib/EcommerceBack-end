import React from 'react';
import productStore from "../../store/ProductStore.js";
import CategoriesSkeleton from "../../Skeleton/categories-skeleton.jsx";
import {Link} from "react-router-dom";

const Categories = () => {
    const {CategoryList}=productStore();

    if(CategoryList===null){
        return (
           <CategoriesSkeleton/>
        );
    }
    else {
        return (
           <div className="section">
               <div className="container">
                   <div className="row">
                       <h1 className="text-center headline-4 p-0 my-2">Top Categories</h1>
                       <span className="text-center mb-5 bodySmal">Explore a World of Choices Across Our Most Popular <br/>Shopping Categories</span>
                       {
                           CategoryList.map((item,i)=>{
                               return(
                                   <div className="col-6 col-md-8r col-lg-8r p-2 text-center">
                                       <Link to={"/by-category/"+item['_id']} className="card h-100 bg-white shadow-sm rounded-3">
                                           <div className="card-body">
                                               <img className="w-75" src={item['categoryImg']}/>
                                               <p className="mt-3 bodySmal">{item['categoryName']}</p>
                                           </div>
                                       </Link>
                                   </div>
                               )
                           })
                       }

                   </div>
               </div>
           </div>
        )
    }
};

export default Categories;