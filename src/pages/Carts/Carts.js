import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import useFetch from "../../api/getCarts"
import { API_URLS } from "../../api/apiURLs";
import "./Carts.css"
import CartComponent from "../../components/Carts/CartComponent";
import SideBarCart from "./SideBarCart";
import { useCartContext } from "../../context/CartContext";
import { useCartPriceContext } from "../../context/CartPriceContext";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const Carts = () => {
    const [ totalPrice, setTotalPrice ] = useState(0)
    let { data, loading, error } = useFetch(API_URLS.CARTS);
    const  {listOfCart , setListOfCart } = useCartContext()
    const { totalPriceCart } = useCartPriceContext()
  
   
    const handleCartCheckbox = (price, isChecked) => {   
        if (isChecked) {
            setTotalPrice(price);
        } else {
            setTotalPrice(totalPrice -price);
        }
    }

    const changeItemHandler = (price) => {
        setTotalPrice(price)
    }

    return (
        <>
            <LoadingComponent isLoading={loading} />
            <Navbar />
            <div className="bg-container-cart">
                <div className="container mt-5 pt-5">
                    <div className="d-flex justify-content-between">
                            <div className="wrapper_cart"  style={{overflow:"auto", height:"98vh"}}>
                                {listOfCart && listOfCart.map((cart,index) => (
                                    <div className="cart_component">
                                        <CartComponent 
                                            productId={cart._id}
                                            changeItemHandler = {changeItemHandler}
                                            checkboxHandler={handleCartCheckbox}
                                            price={cart.price} 
                                            size={cart.size}
                                            quantity={cart.quantity}
                                            imageProduct={cart.imageProduct} 
                                            productName={cart.productName } />
                                    </div>
                                ))}
                            </div>

                            <SideBarCart totalPrice={totalPriceCart} />
                    </div>
            </div>
            </div>
        </>
    );
};

export default Carts;
