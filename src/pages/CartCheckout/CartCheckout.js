import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router-dom";
import CartComponent from "../../components/Carts/CartComponent";
import SideBarCart from "../Carts/SideBarCart";
import "./CartCheckout.css"

const stripePromise = loadStripe("pk_test_51PsUOH09RkIU57HOzoftVmkbstnWM6yHh9penKDnT5kvgDhRAMvHEx6AaAsDhoJ8jEwxx5zEEb8ATKASB5aN1oOy00j8qR6hTF");


const CartCheckout = () => {

    const location = useLocation();

    const selectedCart = useMemo(() => {
        return location.state
    }, [location.state])

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
            <div className="bg-grey" style={{ height: "100vh" }}>
                <div className="container">
                    <h2 className="montserrat-normal pt-3 mt-2 mb-3 pb-2">Checkout</h2>
                    <div className="d-flex flex-row">
                        <div className="container-list-product p-3">
                            {selectedCart && selectedCart.map((cart, index) => (
                                <div className="container-cart-product">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="d-flex flex-row">
                                                <img className="image-cart" src={cart.imageProduct} alt={cart.productName + "_" + index} width="128px" />
                                                <div className="d-flex flex-column container-wording-product">
                                                    <span className="montserrat-normal">{cart.productName}</span>
                                                    <span className="montserrat-light">Size <span className="montserrat-normal">{cart.size}</span></span>
                                                    <span className="montserrat-light">x{cart.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">

                                        </div>
                                        <div className="col-md-3" style={{ textAlign: "right" }}>
                                            <span className="montserrat-normal wording-price">${cart.price}</span>
                                        </div>
                                    </div>
                                    {index !== selectedCart.length - 1 && <hr></hr>}
                                </div>
                            ))}
                        </div>
                        <div className="container-checkout">
                            <div className="wording-payment montserrat-normal">
                                Payment
                            </div>                        
                            <hr></hr>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CartCheckout;