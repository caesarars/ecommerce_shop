import React from "react";
import { useNavigate } from "react-router-dom";

const SideBarCart = ({totalPrice}) => {
    const navigate = useNavigate();


    const navigateCheckout = () => {
        navigate('/cart/checkout')
    }

    return (
        <>
            <div className="sidebar_cart">
                <div className="container_sidebar">
                    <span className="montserrat-normal" style={{fontSize:"28px"}}>TOTAL</span>
                    <p className="montserrat-light" style={{fontSize:"18px"}}>${totalPrice}</p>
                    <div>
                        <hr/>
                    </div>
                    <div className="p-2">
                        <input className="form-control" type="text" placeholder="Redeem Voucher Here"/>
                    </div>
                    <hr/>
                    <button className="btn btn-success w-100" onClick={navigateCheckout}>Checkout</button>
                </div>
            </div>
        </>
    )
}


export default SideBarCart;