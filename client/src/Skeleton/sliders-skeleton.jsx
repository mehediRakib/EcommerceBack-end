import React from 'react';
import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "../assets/images/image.json"
import Lottie from "lottie-react";
import 'react-loading-skeleton/dist/skeleton.css'

const SlidersSkeleton = () => {
    return (
        <div className="container-fluid hero-bg">
            <div className="row">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-5 col-lg-5 col-sm-12">
                        <Skeleton count={7}/>
                        <br/>
                        <Skeleton count={7}/>
                    </div>
                    <div className="col-12 col-lg-5 col-md-5 col-sm-12">
                        <Lottie animationData={ImagePlaceholder} loop={true} className="w-75"/>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default SlidersSkeleton;