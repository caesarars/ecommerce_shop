import React from "react";
import Navbar from "../components/Navbar";
import ProductItem from "../components/ProductItem/ProductItem";

import SidebarShop from "../components/SidebarShop/SidebarShop";

import { useFetch } from "../api/getProducts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const URL_GET_PRODUCTS = "http://localhost:3000/product"; // Move URL constant outside

const Shop = () => {

    const { data, loading, error } = useFetch(URL_GET_PRODUCTS);

    return (
        <div>
            <Navbar />
            

            <div className="container">
                <div className="mt-5 mb-5"></div>
                <div className="d-flex justify-content-around">

                <SidebarShop />

                <div className="">
                    {error && (
                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <h3 className="montserrat-normal" style={{ color: "red" }}>{error}</h3>
                        </div>
                    )}

                    {loading && (
                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                            <p>Loading...</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="d-flex flex-wrap justify-content-around">
                            {data && data.map((el) => (
                                <div key={el._id} className="mb-5"> {/* Use el._id as the unique key */}
                                    <ProductItem 
                                        id={el._id}
                                        name={el.name} 
                                        fileUrl={el.imageUrl[0]}
                                        price={el.price}
                                        stock={el.stock}    
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                </div>
                
                
            </div>
        </div>
    );
};

export default Shop;
