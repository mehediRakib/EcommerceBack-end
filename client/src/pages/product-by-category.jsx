import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import ProductList from "../components/product/product-list.jsx";
import productStore from "../store/ProductStore.js";

const ProductByCategory = () => {

    const {ListByCategoryRequest}=productStore();
    useEffect(() => {
        (async () => {
            await ListByCategoryRequest(id);
        })()
    }, []);
    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
};

export default ProductByCategory;