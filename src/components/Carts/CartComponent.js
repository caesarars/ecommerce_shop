import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash , faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import "./CartComponent.css"
import { DELETE_CART } from "../../api/cartAPIs";
import axios from "axios";
import { API_URLS } from "../../api/apiURLs";
import PopUp from "../PopUp/PopUp"
import { useCartContext } from "../../context/CartContext";

const CartComponent = (props) => {

    const checkboxRef = useRef(null);

    const { setListOfCart } = useCartContext();

    const {productId, productName, imageProduct, price, quantity, checkboxHandler, changeItemHandler, size} = props

    const [ itemsTotal , setItemsTotal] = useState(quantity);

    const [ toggleModal, setToggleModal ] = useState(false);


    let product = {}
    product.id = productId

    const handleDecreaseItem = () => {
       let quantity = itemsTotal - 1;
       if (itemsTotal !== 0 ) {
        setItemsTotal(quantity)

        if (checkboxRef.current) {
            const isChecked = checkboxRef.current.checked;
            if (isChecked) {
                product.price = price * quantity
                changeItemHandler(product)
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
                product.price = price * quantity
                changeItemHandler(product)
            }
          }
    }

    const handleCheckbox = (e) => {

        const isChecked = e.target.checked
        console.log("is checked : " , isChecked)
        if (e.target.checked) {
            const priceProduct = price * itemsTotal;
            product.price = priceProduct
            checkboxHandler(product,e.target.checked)
        } else {
            const priceProduct = ( price *  itemsTotal ) * -1 ;
            product.price = priceProduct
            checkboxHandler(product, e.target.checked)
        }
    }

    const deleteCart = async () => {
        try {
            const API_URL = DELETE_CART + "/" + productId
            const responseDelete = await axios.delete(API_URL,{withCredentials:true})
            //setToggleModal(true)
            if ( responseDelete ) {
                getCart()
                setToggleModal(true)
            }

        } catch(err) {
            
        }
    }

    const getCart = async () => {
        try {
            const responseCart = await axios.get(API_URLS.CARTS, {withCredentials:true})
            setListOfCart(responseCart.data.carts)
        } catch (err) {

        }
    }

    const handleClose = () => {
        setToggleModal(false)
    }

    const popUpSuccess = () => {
        return (
            <>
                <div className="container" style={{border:"1px solid white"}}>
                    <div className="d-flex justify-content-center flex-column align-items-center">
                        <FontAwesomeIcon icon={faCheckCircle} color="green" size="2x"/>
                        <p className="montserrat-light" style={{fontSize:"16px" , margin:"8px"}}>deleted cart</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <PopUp show={toggleModal} handleClose={handleClose} >
                {popUpSuccess()}
            </PopUp>
            <div className="container-cart d-flex align-items-center p-3">
            <input type="checkbox" ref={checkboxRef} className="checkbox_cart" onChange={handleCheckbox}/>
            <img className="image_cart" src={imageProduct} alt={productName} width="160px"/>
            <div className="d-flex flex-column w-100 p-5">
                <p className="montserrat-light">{productName} - {size}</p>
                <p className="montserrat-normal">${price}</p>
            </div>
            <div className="d-flex justify-content-end w-100 p-5">
                <div className="d-flex flex-row align-items-center justify-content-end">
                    <FontAwesomeIcon icon={faMinus} onClick={handleDecreaseItem}/>
                <span className="montserrat-normal" style={{width:"36px", textAlign:"center", backgroundColor:"#edb203" , color:"black", borderRadius:"6px",  margin:"8px"}}>{itemsTotal}</span>
                    <FontAwesomeIcon icon={faPlus} onClick={handleIncreaseItem} />
                </div>
                <div className="d-flex justify-content-center w-25 align-items-center">
                    <FontAwesomeIcon icon={faTrash} onClick={deleteCart}/>
                </div>
            </div>
        </div>
        </>
       
    )
}

export default CartComponent