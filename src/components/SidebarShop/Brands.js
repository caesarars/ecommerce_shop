import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


const Brands = () => {

    const [toggleApparels, setToggleApparels] = useState(false)

    return (
        <>
            <div className="montserrat-normal d-flex justify-content-between" onClick={() => setToggleApparels(!toggleApparels)} >
                <span>Apparels</span> <FontAwesomeIcon icon={faChevronRight} /> 
            </div>

            {toggleApparels && (
                <div className="montserrat-light d-flex flex-column">
                <span>T-Shirt</span>
                <span>Hoodie</span>
                <span>Skirt</span>
            </div>
            )}      
        </>
    )
}

export default Brands;