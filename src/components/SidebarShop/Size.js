import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Size = () => {
    return (<>
        <div className="montserrat-normal d-flex justify-content-between">
            <span>Size</span> <FontAwesomeIcon icon={faChevronRight} />
        </div>
    </>)
}

export default Size;