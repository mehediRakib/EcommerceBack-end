import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import Slider from "../components/product/slider.jsx";
import Layout from "../components/layout/layout.jsx";
import Feature from "../components/product/feature.jsx";
import FeatureStore from "../store/FeatureStore.js";
import Categories from "../components/product/categories.jsx";
import Brand from "../components/product/Brand.jsx";
import Product from "../components/product/product.jsx";


const HomePage = () => {

    const {BrandListRequest,CategoryListRequest,SliderListRequest,ListByRemarkRequest}=ProductStore();
    const {FeatureListRequest}=FeatureStore();


    useEffect(() => {
        (async ()=>{
           await CategoryListRequest();
           await BrandListRequest();
           await SliderListRequest();
           await ListByRemarkRequest("new");
           await FeatureListRequest();
        })()
    }, []);

    return (
        <Layout>
           <Slider/>
            <Feature/>
            <Categories/>
            <Product/>
            <Brand/>
        </Layout>

    );
};

export default HomePage;