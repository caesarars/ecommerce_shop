import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";


const Category = ({onCategorySelect}) => {

    const [toggleCategory, setToggleCategory] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")

    const handleCategoryClick = (category) => {
        setSelectedCategory(category)
        onCategorySelect(category)
    }

    return (
        <>
            <div className="montserrat-normal d-flex justify-content-between" onClick={() => setToggleCategory(!toggleCategory)}>
                <span>Category</span> <FontAwesomeIcon icon={ toggleCategory ? faChevronDown : faChevronRight}/> 
            </div>

            {toggleCategory && (
                <div className="montserrat-light d-flex flex-column p-2">
                <span onClick={() => handleCategoryClick("women")}>Women</span>
                <span onClick={() => handleCategoryClick("men")}>Men</span>
                <span onClick={() => handleCategoryClick("unisex")}>Unisex</span>
            </div>
            )}            
        </>
    )
}

export default Category;