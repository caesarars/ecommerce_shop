import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import CartList from "../../components/Carts/CartList";
import useFetch from "../../api/getCarts"
import "./Carts.css"
import CartComponent from "../../components/Carts/CartComponent";
import SideBarCart from "./SideBarCart";

const Carts = () => {
    const [ totalPrice, setTotalPrice ] = useState(0)

    const { data, loading, error } = useFetch("http://localhost:3000/cart");
    console.log("Carts : " , data)
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
   
    const handleCartCheckbox = (data) => {    
        console.log()    
        setTotalPrice(totalPrice + data)
    }

    const changeItemHandler = (data) => {
        setTotalPrice(data)
    }

    return (
        <>
            <Navbar />
            <div className="bg-container-cart">
                <div className="container mt-5 pt-5">
                    <div className="d-flex justify-content-between">
                            <div className="wrapper_cart">
                                {data && data.map((cart,index) => (
                                    <div className="cart_component">
                                        <CartComponent 
                                            changeItemHandler = {changeItemHandler}
                                            checkboxHandler={handleCartCheckbox}
                                            price={cart.price} 
                                            quantity={cart.quantity}
                                            imageProduct={cart.imageProduct} 
                                            productName={cart.productName } />
                                    </div>
                                ))}
                            </div>
                            
                            <SideBarCart totalPrice={totalPrice} />
                    </div>
            </div>
            </div>
        </>
    );
};

export default Carts;
