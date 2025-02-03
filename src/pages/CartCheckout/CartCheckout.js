import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm"; 
import { useLocation } from "react-router-dom";
import CartComponent from "../../components/Carts/CartComponent";
import SideBarCart from "../Carts/SideBarCart";

const stripePromise = loadStripe("pk_test_51PsUOH09RkIU57HOzoftVmkbstnWM6yHh9penKDnT5kvgDhRAMvHEx6AaAsDhoJ8jEwxx5zEEb8ATKASB5aN1oOy00j8qR6hTF");


const CartCheckout = () => {

    const location = useLocation();

    const selectedCart = useMemo(() => {
        return location.state
    },[location.state])
    
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = (item) => {
       return item.reduce((total, item) => {
         return total + (item.price * item.quantity);
       }, 0); // Initial value of total is 0
     };

     useEffect(() => {
        const total = calculateTotalPrice(selectedCart)
        setTotalPrice(total)
     }, [selectedCart])
    
    return (
        <>
             <Navbar />
            <div className="container">
            <div className="d-flex justify-content-between">
                            <div className="wrapper_cart"  style={{overflow:"auto", height:"98vh"}}>
                                {selectedCart && selectedCart.map((cart,index) => (
                                    <div className="cart_component">
                                        <CartComponent 
                                            isCheckOut={true}
                                            productId={cart._id}
                                            price={cart.price} 
                                            size={cart.size}
                                            quantity={cart.quantity}
                                            imageProduct={cart.imageProduct} 
                                            productName={cart.productName } />
                                    </div>
                                ))}
                            </div>

                            <SideBarCart isCheckOut={true} totalPrice={totalPrice}/>
                    </div>
                <Elements stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
            </div>
        </>
    )
}

export default CartCheckout;