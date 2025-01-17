import React, {createContext, useContext, useState} from "react";

const CartContext = createContext();


export const CartProvider = ({children}) => {
    const [listOfCart , setListOfCart] = useState(null)
    return (
        <CartContext.Provider value={{listOfCart, setListOfCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
}