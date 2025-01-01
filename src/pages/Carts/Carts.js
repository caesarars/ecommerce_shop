import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import CartList from "../../components/Carts/CartList";
import useFetch from "../../api/getCarts"
import "./Carts.css"
import CartComponent from "../../components/Carts/CartComponent";
import SideBarCart from "./SideBarCart";
import { DELETE_CART } from "../../api/cartAPIs";

const Carts = () => {
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [ listOfCart , setListOfCart ] = useState([])
    const { data, loading, error } = useFetch("http://localhost:3000/cart");
    console.log("Carts : " , data)
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
   
    const handleCartCheckbox = (data, checked) => {    
        console.log("checked : " , checked)
        if ( checked ) {
            console.log("checked : ")
            setListOfCart(prevList => {
                const updatedList = [...prevList, data]
                const totalPrice = updatedList.reduce((total, item) => total + item.price, 0);
                setTotalPrice(totalPrice); // Update total price
                console.log("Updated cart:", updatedList);
                console.log("Total price after adding:", totalPrice);
                return updatedList; // Return the updated list
            })
            
        } else {
            console.log(' unchecked : ')
            setListOfCart(prevList => {
                const updatedList = [...prevList].filter(item => item.id !== data.id)
                const totalPrice = updatedList.reduce((total, item) => total + item.price, 0);
                setTotalPrice(totalPrice); // Update total price
                console.log("Updated cart:", updatedList);
                console.log("Total price after adding:", totalPrice);
                return updatedList; // Return the u
            })
        }
    }

    const changeItemHandler = (data) => {
        setListOfCart(prevList => {
            const updatedList = prevList.map(item => {
                if (item.id === data.id) {
                    // Update the price of the item
                    return { ...item, price: data.price };
                }
                return item; // Return the item unchanged
            });

            // Check if the item was found and updated
            const itemFound = prevList.some(item => item.id === data.id);
            if (!itemFound) {
                console.error(`Item with id ${data.id} not found in the cart.`);
                return prevList; // Return the previous list if item not found
            }

            // Calculate the total price based on the updated list
            const newTotalPrice = updatedList.reduce((total, item) => total + item.price, 0);
            setTotalPrice(newTotalPrice); // Update total price
            return updatedList; // Return the updated list
        })
    }

    return (
        <>
            <Navbar />
            <div className="bg-container-cart">
                <div className="container mt-5 pt-5">
                    <div className="d-flex justify-content-between">
                            <div className="wrapper_cart"  style={{overflow:"auto", height:"98vh"}}>
                                {data && data.map((cart,index) => (
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
