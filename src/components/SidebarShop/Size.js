import { faChevronRight , faChevronDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Size = ({onSizeSelect}) => {

    const [sizeToggle , setSizeToggle] = useState(false)

    const handleSelectSize = (size) => {
        onSizeSelect(size)
    }

    return (<>
        <div className="montserrat-normal d-flex justify-content-between" onClick={() => setSizeToggle(!sizeToggle)}>
            <span>Size</span> <FontAwesomeIcon icon={sizeToggle ? faChevronDown : faChevronRight} />
        </div>
        {sizeToggle && 
            <div className="d-flex flex-column p-2 montserrat-light">
            <span onClick={() => handleSelectSize("s")}>S</span>
            <span onClick={() => handleSelectSize("m")}>M</span>
            <span onClick={() => handleSelectSize("l")}>L</span>
            <span onClick={() => handleSelectSize("xl")}>XL</span>
        </div>
        }
        
    </>)
}

export default Size;