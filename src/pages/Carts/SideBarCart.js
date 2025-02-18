import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartPriceContext } from "../../context/CartPriceContext";


const SideBarCart = ({totalPrice, selectedCart, isCheckOut}) => {
    const navigate = useNavigate();
    const { setTotalPriceCart } = useCartPriceContext()

    const navigateCheckout = () => {
        setTotalPriceCart(0)
        navigate('/cart/checkout', {
            state : selectedCart
        })
    }

    return (
        <>
            <div className="sidebar_cart shadow">
                <div className="container_sidebar ">
                    <span className="montserrat-normal" style={{fontSize:"28px"}}>TOTAL</span>
                    <p className="montserrat-light" style={{fontSize:"18px"}}>${Math.ceil(totalPrice)}</p>
                    <div>
                        <hr/>
                    </div>
                    {!isCheckOut ? 
                    <>
                        <div className="p-2">
                            <input className="form-control" type="text" placeholder="Redeem Voucher Here"/>
                        </div>
                        <hr/>
                        <button className="btn btn-success w-100" onClick={navigateCheckout}>Checkout</button>
                    </> : <>
                        <div>
                            <h3>Payment Method</h3>
                        </div>
                    </>}
                   
                </div>
            </div>
        </>
    )
}


export default SideBarCart;