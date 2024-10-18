import { faChevronRight , faChevronDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Size = () => {

    const [sizeToggle , setSizeToggle] = useState(false)

    return (<>
        <div className="montserrat-normal d-flex justify-content-between" onClick={() => setSizeToggle(!sizeToggle)}>
            <span>Size</span> <FontAwesomeIcon icon={sizeToggle ? faChevronDown : faChevronRight} />
        </div>
        {sizeToggle && 
            <div className="d-flex flex-column p-2 montserrat-light">
            <span>S</span>
            <span>M</span>
            <span>L</span>
            <span>XL</span>
        </div>
        }
        
    </>)
}

export default Size;