import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import useFetch from "../../api/getCarts"
import "./Carts.css"
import CartComponent from "../../components/Carts/CartComponent";
import SideBarCart from "./SideBarCart";
import { useCartContext } from "../../context/CartContext";

const Carts = () => {
    const [ totalPrice, setTotalPrice ] = useState(0)
    let { data, loading, error } = useFetch("http://localhost:3000/cart");
    const  {listOfCart , setListOfCart } = useCartContext()
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
   
    const handleCartCheckbox = (data, checked) => {    
        if ( checked ) {
            setListOfCart(prevList => {
                const updatedList = [...prevList, data]
                console.log('updated list : ' , updatedList)
                const totalPrice = updatedList.reduce((total, item) => total + item.price, 0);
                setTotalPrice(totalPrice);
                return updatedList;
            })
            
        } else {
            setListOfCart(prevList => {
                const updatedList = [...prevList].filter(item => item.id !== data.id)
                const totalPrice = updatedList.reduce((total, item) => total + item.price, 0);
                setTotalPrice(totalPrice);
                return updatedList;
            })
        }
    }

    const changeItemHandler = (data) => {
        setListOfCart(prevList => {
            const updatedList = prevList.map(item => {
                if (item.id === data.id) {
                    return { ...item, price: data.price };
                }
                return item;
            });
            
            const itemFound = prevList.some(item => item.id === data.id);
            if (!itemFound) {
                console.error(`Item with id ${data.id} not found in the cart.`);
                return prevList;
            }
            
            const newTotalPrice = updatedList.reduce((total, item) => total + item.price, 0);
            setTotalPrice(newTotalPrice); 
            return updatedList;
        })
    }

    return (
        <>
            <Navbar />
            <div className="bg-container-cart">
                <div className="container mt-5 pt-5">
                    <div className="d-flex justify-content-between">
                            <div className="wrapper_cart"  style={{overflow:"auto", height:"98vh"}}>
                                {listOfCart && listOfCart.map((cart,index) => (
                                    <div className="cart_component">
                                        <CartComponent 
                                            productId={cart._id}
                                            changeItemHandler = {changeItemHandler}
                                            checkboxHandler={handleCartCheckbox}
                                            price={cart.price} 
                                            size={cart.size}
                                            quantity={cart.quantity}
                                            imageProduct={cart.imageProduct} 
                                            productName={cart.productName } />
                                    </div>
                                ))}
                            </div>

                            <SideBarCart totalPrice={totalPrice} />
                    </div>
            </div>
            </div>
        </>
    );
};

export default Carts;
