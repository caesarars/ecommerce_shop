import React from "react";
import "./SidebarShop.css"
import Category from "./Category";
import Brands from "./Brands";
import Price from "./Price";
import Size from "./Size";

const SidebarShop = () => {
    return (
        <div className="container_sidebar">
            <div className="container mt-2">
                <Category />
                <Brands />
                <Price />
                <Size/>        
            </div>
        </div>
    )
}

export default SidebarShop;