import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import "./CartComponent.css"

const CartComponent = ({productName, imageProduct, price}) => {
    return (
        <div className="container-cart d-flex mb-5 align-items-center p-3">
            <img className="image_cart" src={imageProduct} alt={productName} width="160px"/>
            <div className="d-flex flex-column w-100 p-5">
                <p className="montserrat-light">{productName}</p>
                <p className="montserrat-normal">${price}</p>
            </div>
            <div className="d-flex justify-content-end w-100 p-5">
                <div className="d-flex flex-row align-items-center justify-content-end">
                    <FontAwesomeIcon icon={faMinus} />
                    <input className="w-25 m-2 form-control" type="number" />
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
        </div>
    )
}

export default CartComponent