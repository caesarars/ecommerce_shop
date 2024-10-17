import React from "react";
import "./SidebarShop.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SidebarShop = () => {
    return (
        <div className="container_sidebar">
            <div className="container mt-2">
                <div className="montserrat-normal d-flex justify-content-between">
                    <span>Category</span> <FontAwesomeIcon icon={faChevronRight} /> 
                </div>
                <div className="montserrat-normal">

                    <span>Brands</span> <FontAwesomeIcon icon={faChevronRight} /> 

                </div>
                <div className="montserrat-normal">Price</div>
                <div className="montserrat-normal">Size</div>
            </div>
        </div>
    )
}

export default SidebarShop;