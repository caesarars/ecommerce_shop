import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./CartComponent.css"

const CartComponent = (props) => {

    const checkboxRef = useRef(null);

    const {productName, imageProduct, price, quantity, checkboxHandler, changeItemHandler} = props

    const [ itemsTotal , setItemsTotal] = useState(quantity);

    const handleDecreaseItem = () => {
       let quantity = itemsTotal - 1;
       if (itemsTotal !== 0 ) {
        setItemsTotal(quantity)

        if (checkboxRef.current) {
            const isChecked = checkboxRef.current.checked;
            if (isChecked) {
                changeItemHandler(price *  quantity)
            }
          }
       }
    }

    const handleIncreaseItem = () => {
        let quantity = itemsTotal + 1;
        setItemsTotal(quantity);

        if (checkboxRef.current) {
            const isChecked = checkboxRef.current.checked;
            if (isChecked) {
                changeItemHandler(price *  quantity)
            }
          }
    }

    const handleCheckbox = (e) => {
        if (e.target.checked) {
            checkboxHandler(price *  itemsTotal)

        } else {
            checkboxHandler(( price *  itemsTotal) * -1 )
        }

    }


    return (
        <div className="container-cart d-flex mb-5 align-items-center p-3">
            <input type="checkbox" ref={checkboxRef} className="checkbox_cart" onChange={handleCheckbox}/>
            <img className="image_cart" src={imageProduct} alt={productName} width="160px"/>
            <div className="d-flex flex-column w-100 p-5">
                <p className="montserrat-light">{productName}</p>
                <p className="montserrat-normal">${price}</p>
            </div>
            <div className="d-flex justify-content-end w-100 p-5">
                <div className="d-flex flex-row align-items-center justify-content-end">
                    <FontAwesomeIcon icon={faMinus} onClick={handleDecreaseItem}/>
                    <input style={{width:"64px"}} className=" m-2 form-control text-center" type="number" value={itemsTotal} disabled/>
                    <FontAwesomeIcon icon={faPlus} onClick={handleIncreaseItem} />
                </div>
            </div>
            <div className="">
                <FontAwesomeIcon icon={faTrash} onClick={handleDecreaseItem}/>
            </div>
        </div>
    )
}

export default CartComponent