import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown} from "@fortawesome/free-solid-svg-icons";


const Apparels = ({onApparelsSelect}) => {

    const [toggleApparels, setToggleApparels] = useState(false)

    const handleSelectApparels = (apparels) => {
        onApparelsSelect(apparels)
    }

    return (
        <>
            <div className="montserrat-normal d-flex justify-content-between" onClick={() => setToggleApparels(!toggleApparels)} >
                <span>Apparels</span> <FontAwesomeIcon icon={toggleApparels ? faChevronDown: faChevronRight} /> 
            </div>

            {toggleApparels && (
                <div className="montserrat-light d-flex flex-column p-2">
                <span onClick={()=>handleSelectApparels("tshirt")}>T-Shirt</span>
                <span onClick={()=>handleSelectApparels("hoodie")}>Hoodie</span>
                <span onClick={()=>handleSelectApparels("skrit")}>Skirt</span>
                <span onClick={()=>handleSelectApparels("jacket")}>Jacket</span>
                <span onClick={()=>handleSelectApparels("flannel")}>Flannel</span>
            </div>
            )}      
        </>
    )
}

export default Apparels;