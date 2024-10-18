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
                <div className="mt-5"></div>
                <div className="" style={{marginLeft:"190px",marginBottom:"8px" , padding:"16px"}}>
                    <div className="d-flex justify-content-between align-items-center flex-wrap"> 
                        <span className="montserrat-light">Showing {data ? data.length : ""} products</span>
                        <div className="montserrat-light">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Sort By</span>
                                <select className="form-control">
                                    <option>Latest</option>
                                    <option>Lowest Price</option>
                                    <option>High Price</option>
                                    <option>Popularity</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div className="d-flex justify-content-around">
                    {renderError()}
                    <SidebarShop />
                    <ShopLoading loading={loading} />
                    <ShopProducts error={error} loading={loading} data={data}/>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
