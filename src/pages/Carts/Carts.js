import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import CartList from "../../components/Carts/CartList";
import useFetch from "../../api/getCarts"
import "./Carts.css"
import CartComponent from "../../components/Carts/CartComponent";

const Carts = () => {
    const { data, loading, error } = useFetch("http://localhost:3000/cart");
    console.log("Carts : " , data)
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <Navbar />
            <div className="bg-container-cart">
                <div className="container mt-5 pt-5">
                    <div className="d-flex justify-content-between">
                            <div className="wrapper_cart">
                                {data && data.map((cart,index) => (
                                    <div className="cart_component">
                                        <CartComponent price={cart.price} imageProduct={cart.imageProduct} productName={cart.productName } />
                                    </div>
                                ))}
                            </div>
                            <div className="sidebar_cart">
                                <span>TOTAL</span>
                            </div>
                    </div>
            </div>
            </div>
        </>
    );
};

export default Carts;
