import React from 'react';
import ImagePlaceholder from "../assets/images/image.json"
import Lottie from "lottie-react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const ProductsSkeleton = () => {
    return (
        <div className="container">
            <div className="row">
                {
                    Array.from({length:16}).map(()=>{
                        return (
                            <div className="col-md-3 col-lg-3 col-sm-6 col-12 p-2 mb-5">
                                <div className="card shadow-sm h-100 bg-white rounded-3">
                                    <Lottie className="w-100" animationData={ImagePlaceholder} loop={true}/>
                                </div>
                                <div className="card-body">
                                    <Skeleton count={2}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
};

export default ProductsSkeleton;