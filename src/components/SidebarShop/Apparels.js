import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown} from "@fortawesome/free-solid-svg-icons";


const Apparels = () => {

    const [toggleApparels, setToggleApparels] = useState(false)

    return (
        <>
            <div className="montserrat-normal d-flex justify-content-between" onClick={() => setToggleApparels(!toggleApparels)} >
                <span>Apparels</span> <FontAwesomeIcon icon={toggleApparels ? faChevronDown: faChevronRight} /> 
            </div>

            {toggleApparels && (
                <div className="montserrat-light d-flex flex-column p-2">
                <span>T-Shirt</span>
                <span>Hoodie</span>
                <span>Skirt</span>
                <span>Jacket</span>
                <span>Flannel</span>
            </div>
            )}      
        </>
    )
}

export default Apparels;