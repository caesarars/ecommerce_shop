import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router-dom";
import CartComponent from "../../components/Carts/CartComponent";
import SideBarCart from "../Carts/SideBarCart";
import "./CartCheckout.css"
import ShippingAddressForm from "./AddressForm";
import TotalPayment from "./TotalPayment";
import ListItems from "./ListItems";
import Footer from "../../components/Footer/Footer";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const stripePromise = loadStripe("pk_test_51PsUOH09RkIU57HOzoftVmkbstnWM6yHh9penKDnT5kvgDhRAMvHEx6AaAsDhoJ8jEwxx5zEEb8ATKASB5aN1oOy00j8qR6hTF");


const CartCheckout = () => {

    const [cardNumber, setCardNumber] = useState("");
    const [isLoading ,setIsLoading] = useState(false);

    // Function to format the card number (e.g., 1234 5678 9012 3456)
    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        value = value.replace(/(\d{4})/g, "$1 ").trim(); // Add space every 4 digits
        setCardNumber(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Card Submitted: " + cardNumber);
    };

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

    const handlePopUp = (data) => {
        setIsLoading(data)
    }

    useEffect(() => {
        const total = calculateTotalPrice(selectedCart)
        setTotalPrice(total)
    }, [selectedCart])

    return (
        <>   
            <LoadingComponent isLoading={isLoading} isPopUp={true}/>
            <Navbar />
            <div className="bg-grey" style={{ height: "100vh"}}>
                <div className="container ">
                    <h2 className="montserrat-normal pt-3 mt-2 mb-3 pb-2">Checkout</h2>
                    
                    <div className="d-flex flex-row justify-content-between pb-3">
                        <ShippingAddressForm/>

                        <ListItems 
                            selectedCart={selectedCart} />

                         <TotalPayment
                            handleErrorPopUp={handlePopUp}
                            totalPrice={totalPrice} 
                            cardNumber={cardNumber}
                            handleCardNumberChange={handleCardNumberChange} />
                        {/*
                        <div className="accordion accordion-flush accordion-container" style={{zIndex:"100"}}>
                            <div className="accordion-item" id="accordion-payment">
                                <h3 className="accordion-header">
                                    <button class="accordion-button montserrat-normal" 
                                    type="button" 
                                    data-bs-toggle="collapse" 
                                    data-bs-target="#accordionPayment"
                                     aria-expanded="false" 
                                     aria-controls="accordionPayment">
                                        Total Payment   
                                    </button>
                                </h3>
                                <div className="accordion-collapse collapse" id="accordionPayment">
                                    <TotalPayment
                                        handleErrorPopUp={handlePopUp}
                                        totalPrice={totalPrice} 
                                        cardNumber={cardNumber}
                                        handleCardNumberChange={handleCardNumberChange} />
                                </div>
                            </div>
                            <div className="accordion-item" id="accordion-shipping">
                                <h3 className="accrodion-header"> 
                                    <button className="accordion-button montserrat-normal" type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#accordionShipping"
                                        aria-expanded="false"
                                        aria-controls="accordionShipping">
                                        Shipping Address
                                    </button>
                                </h3>
                               <div className="accordion-collapse collapse" id="accordionShipping">
                                    <ShippingAddressForm/>
                                </div> 
                            </div>
                            
                        </div>    
                                */}
                    </div>
                    {/* <div className="container-address-detail">
                        <ShippingAddressForm />
                    </div> */}

                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CartCheckout;