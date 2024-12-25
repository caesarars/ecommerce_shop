import React from "react";
import "./Carts.css"

const Carts = ({data}) => {
    return (
        
        <div className="carts_container">
            <div className="carts">
                {data.map((cart) => (
                    <div className="cart_items">
                        <div className="d-flex justify-content-start align-items-start">
                            <img src={cart.imageProduct} width="96px" alt="product_cart"/>
                            <span className="product_name">{cart.productName}</span>
                            <span>${cart.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Carts;