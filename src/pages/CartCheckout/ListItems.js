import React from "react";

const ListItems = ({selectedCart}) => {
    return (
        <>
            <div className="container-list-product p-3 shadow">
                {selectedCart && selectedCart.map((cart, index) => (
                    <div className="container-cart-product p-3 pb-1">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex flex-row">
                                    <img className="image-cart" src={cart.imageProduct} alt={cart.productName + "_" + index} width="180px" />
                                    <div className="d-flex flex-column container-wording-product">
                                        <span className="montserrat-normal">{cart.productName}</span>
                                        <span className="montserrat-light">Size <span className="montserrat-normal">{cart.size}</span></span>
                                        <span className="montserrat-light">{cart.quantity} x ${cart.price}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-3" style={{ textAlign: "right" }}>
                                <span className="montserrat-normal wording-price" style={{fontSize:"24px"}}>${Math.ceil(cart.price * cart.quantity)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ListItems