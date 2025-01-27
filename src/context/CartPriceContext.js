import React, {createContext, useContext, useState} from "react";

const CartPriceContext = createContext();

export const CartPriceProvider = ({children}) => {
    const [totalPriceCart , setTotalPriceCart] = useState(0)
    return (
        <CartPriceContext.Provider value={{totalPriceCart, setTotalPriceCart}}>
            {children}
        </CartPriceContext.Provider>
    )
}

export const useCartPriceContext = () => {
    return useContext(CartPriceContext)
}