import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash , faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import "./CartComponent.css"
import axios from "axios";
import { API_URLS } from "../../api/apiURLs";
import PopUp from "../PopUp/PopUp"
import { useCartContext } from "../../context/CartContext";
import { useCartPriceContext } from "../../context/CartPriceContext";
import { useTokenContext } from "../../context/TokenContext";

const CartComponent = (props) => {

    const checkboxRef = useRef(null);

    const { setListOfCart } = useCartContext();
    const { totalPriceCart , setTotalPriceCart } = useCartPriceContext();
    const { token } = useTokenContext();

    const {productId, productName, imageProduct, price, quantity, size} = props

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
                if (totalPriceCart >= 0) {
                    if (totalPriceCart - price < 0) {
                        setTotalPriceCart(0)
                    } else {
                        setTotalPriceCart(totalPriceCart - price)
                    }
                } else {
                    setTotalPriceCart(0)
                }
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
                if ( totalPriceCart >= 0 ) {
                    setTotalPriceCart(totalPriceCart + price)
                } else {
                    setTotalPriceCart(0)
                }
            }
        }
    }

    const handleCheckbox = (e) => {

        const isChecked = e.target.checked

        if ( isChecked ) {
            const priceProduct = price * itemsTotal;
            if (totalPriceCart > 0 ) {
                setTotalPriceCart(totalPriceCart + priceProduct)
            } else {
                setTotalPriceCart(priceProduct)
            }
        } else {

            const priceProduct = ( price *  itemsTotal ) ;

            if (totalPriceCart - priceProduct < 0) {
                setTotalPriceCart(0)
            } else {
                setTotalPriceCart(totalPriceCart - priceProduct)
            }

        }
    }

    const deleteCart = async () => {
        try {
            const API_URL = API_URLS.CARTS + "/" + productId
            const responseDelete = await axios.delete(API_URL,
                {
                    withCredentials:true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                      }
                })
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
                    <button onClick={handleDecreaseItem}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                <span className="montserrat-normal" style={{width:"36px", textAlign:"center", backgroundColor:"#edb203" , color:"black", borderRadius:"6px",  margin:"8px"}} aria-disabled>{itemsTotal}</span>
                    <button onClick={handleIncreaseItem}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
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