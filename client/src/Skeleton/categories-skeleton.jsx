import React from 'react';
import Lottie from "lottie-react";
import ImagePlaceholder from "../assets/images/image.json"
import Skeleton from "react-loading-skeleton";
const CategoriesSkeleton = () => {
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <h1 className="headline-4 text-center p-0 my-2">Top Categories</h1>
                    <span className=" bodySmal text-center mb-5">Explore a World of Choices Across Our Most Popular <br/>Shopping Categories</span>
                </div>
                {
                   Array.from({length:16}).map(()=>{
                      return(
                          <div className="col-6 col-lg-8r text-center col-md-8r p-2">
                              <div className="card h-100 rounded-3 bg-light ">
                                  <div className="card-body">
                                      <Lottie className="w-100" animationData={ImagePlaceholder} loop={true}/>
                                      <Skeleton count={true}/>
                                  </div>
                              </div>

                          </div>

                              )
                   })
                }
            </div>

        </div>
    );
};

export default CategoriesSkeleton;