import React from "react";
import "./SidebarShop.css"
import Category from "./Category";
import Apparels from "./Apparels";
import Price from "./Price";
import Size from "./Size";

const SidebarShop = () => {
    return (
        <div className="container_sidebar">
            <div className="container mt-2">
                <Category />
                <Apparels />
                <Price />
                <Size/>        
            </div>
        </div>
    )
}

export default SidebarShop;