import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Category = ({ onCategorySelect, clearFilter }) => {
    const [isCategoryOpen, setCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const activeCategory = "p-2 bg-dark text-white"


    const categories = [
        { id: "women", label: "Women" },
        { id: "men", label: "Men" },
        { id: "unisex", label: "Unisex" },
    ];

    const handleCategoryClick = (category) => {
        onCategorySelect(category)
        setSelectedCategory(category)
        if (category === selectedCategory) {
            setSelectedCategory("")
            onCategorySelect("")
        }
    };

    const getCssClass = (category) => {
        if (category === selectedCategory) {
            return activeCategory;
        }
        return "p-2"
    }
    
    return (
        <>
            <div
                className="montserrat-normal d-flex justify-content-between"
                onClick={() => setCategoryOpen(!isCategoryOpen)}
            >
                <span>Category</span>
                <FontAwesomeIcon icon={isCategoryOpen ? faChevronDown : faChevronRight} />
            </div>

            {isCategoryOpen && (
                <div className="montserrat-light d-flex flex-column p-2">
                    {categories.map((category) => (
                        <span
                            key={category.id}
                            className={getCssClass(category.id)}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {category.label}
                        </span>
                    ))}
                </div>
            )}
        </>
    );
};

export default Category;
