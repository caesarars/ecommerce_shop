import React from "react";

const SideBarCart = ({totalPrice}) => {
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
                    <button className="btn btn-success w-100">Checkout</button>
                </div>
            </div>
        </>
    )
}


export default SideBarCart;