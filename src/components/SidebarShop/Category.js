import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";


const Category = () => {

    const [toggleCategory, setToggleCategory] = useState(false)


    return (
        <>
            <div className="montserrat-normal d-flex justify-content-between" onClick={() => setToggleCategory(!toggleCategory)}>
                <span>Category</span> <FontAwesomeIcon icon={ toggleCategory ? faChevronDown : faChevronRight}/> 
            </div>

            {toggleCategory && (
                <div className="montserrat-light d-flex flex-column p-2">
                <span>Women</span>
                <span>Men</span>
            </div>
            )}            
        </>
    )
}

export default Category;