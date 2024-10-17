import React from "react";
import Navbar from "../components/Navbar";
import ProductItem from "../components/ProductItem/ProductItem";
import Footer from "../components/Footer/Footer"
import { API_URLS } from "../api/apiURLs";

import SidebarShop from "../components/SidebarShop/SidebarShop";

import { useFetch } from "../api/getProducts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ShopProducts from "../components/Shop/ShopProducts";
import ShopLoading from "../components/Shop/ShopLoading";


const Shop = () => {

    const { data, loading, error } = useFetch(API_URLS.GET_PRODUCTS);

    const renderSidebar = () => {
        return (
            !error && <SidebarShop />
        )
    }

    const renderError = () => {
        return (
            error && (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h3 className="montserrat-normal" style={{ color: "red" }}>{error}</h3>
                </div>
            )
        )
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="mt-5 mb-5"></div>
                <div className="d-flex justify-content-around">
                    {renderSidebar()}
                    {renderError()}
                    <ShopLoading loading={loading} />
                    <ShopProducts error={error} loading={loading} data={data}/>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
