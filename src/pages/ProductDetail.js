import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Product from "../components/ProductDetail/Product";
import Footer from "../components/Footer/Footer";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";

const ProductDetail = () => {

    const [isLoading, setIsLoading] = useState(false);

    const handleLoading = (loading) => {
        setIsLoading(loading)
    }

    return (
        <>
            <LoadingComponent isLoading={isLoading}/>
            <Product handleLoading={handleLoading}/>
            <Footer/>
        </>
    )
}

export default ProductDetail;