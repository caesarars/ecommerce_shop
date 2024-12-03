import React from "react";
import "./Carts.css"

const Carts = ({data}) => {
    return (
        
        <div className="carts_container">
            <div className="carts">
                {data.map((cart) => (
                    <div>
                        <img src={cart.imageProduct} width="96px"/>
                        <span className="product_name">{cart.productName}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Carts;