import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash , faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import "./CartComponent.css"
import axios from "axios";
import { API_URLS } from "../../api/apiURLs";
import PopUp from "../PopUp/PopUp"
import { useCartContext } from "../../context/CartContext";
import { useCartPriceContext } from "../../context/CartPriceContext";

const CartComponent = (props) => {

    const checkboxRef = useRef(null);

    const { setListOfCart } = useCartContext();
    const { totalPriceCart , setTotalPriceCart } = useCartPriceContext();

    const {productId, productName, imageProduct, price, quantity, size, checkboxHandler, changeItemHandler, isCheckOut } = props

    const [ itemsTotal , setItemsTotal] = useState(quantity);

    const [ toggleModal, setToggleModal ] = useState(false);


    let product = {}
    product.productId = productId
    product.productName = productName
    product.imageProduct = imageProduct
    product.size = size
    product.price = price;

    const handleDecreaseItem = () => {
       let quantity = itemsTotal - 1;
       if (itemsTotal !== 0 ) {
        setItemsTotal(quantity)
        if (checkboxRef.current) {
            const isChecked = checkboxRef.current.checked;
            if (isChecked) {
                if (totalPriceCart >= 0) {
                    if (totalPriceCart - price < 0) {
                        product.quantity = 0;
                        changeItemHandler(product)
                        setTotalPriceCart(0)
                    } else {
                        product.quantity = quantity;
                        changeItemHandler(product)
                        setTotalPriceCart(totalPriceCart - price)
                    }
                } else {
                    product.quantity = 0;
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
                    product.quantity = quantity
                    changeItemHandler(product)
                    setTotalPriceCart(totalPriceCart + price)
                } else {
                    product.quantity = 0
                    changeItemHandler(product)
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
                product.quantity = itemsTotal
                setTotalPriceCart(totalPriceCart + priceProduct)
            } else {
                product.quantity = itemsTotal;
                setTotalPriceCart(priceProduct)
            }
            checkboxHandler(product, isChecked)
        } else {

            const priceProduct = ( price *  itemsTotal ) ;
            product.quantity = 0;
            if (totalPriceCart - priceProduct < 0) {
                setTotalPriceCart(0)
            } else {
                setTotalPriceCart(totalPriceCart - priceProduct)
            }
            checkboxHandler(product, isChecked)

        }
    }

    const deleteCart = async () => {
        try {
            const token = localStorage.getItem("token");
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

    const containerActions = "d-flex justify-content-end w-100 p-5"
    const containerNameAndPrice = "d-flex flex-column w-100 p-5"

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
            { !isCheckOut && <input type="checkbox" ref={checkboxRef} className="checkbox_cart" onChange={handleCheckbox}/>}
            { !isCheckOut ?  <><img className="image_cart" src={imageProduct} alt={productName} width="160px"/></> : <>
                <img className="image_cart" src={imageProduct} alt={productName} width="64px"/>
            </> }
            <div className={!isCheckOut ? containerNameAndPrice : ""}>
                <p className="montserrat-light">{productName} - {size}</p>
                <p className="montserrat-normal">${price}</p>
            </div>

            {!isCheckOut && <>
                <div className={containerActions}>
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
            </> }
        </div>
        </>
       
    )
}

export default CartComponent