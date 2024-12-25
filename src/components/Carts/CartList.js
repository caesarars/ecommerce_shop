import React from "react";

const CartList = ({carts}) => {
    return (
        <>
          {carts.map((data) => (
            <div>
                <p>{data.productName}</p>
            </div>
          ))}
        </>
    )
}

export default CartList