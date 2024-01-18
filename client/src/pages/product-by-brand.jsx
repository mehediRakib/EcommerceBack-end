import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import ProductList from "../components/product/product-list.jsx";
import productStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";

const ProductByBrand = () => {

    const {ListByBrandRequest}=productStore();
    const {id}=useParams();
    useEffect(() => {
        (async () => {
            await ListByBrandRequest(id);
        })()
    }, [id]);
    return (
        <Layout>
                <ProductList/>
        </Layout>
    );
};

export default ProductByBrand;