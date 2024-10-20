import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Category = ({ onCategorySelect, clearFilter }) => {
    const [isCategoryOpen, setCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = [
        { id: "women", label: "Women" },
        { id: "men", label: "Men" },
        { id: "unisex", label: "Unisex" },
    ];

    const handleCategoryClick = (category) => {
        if (selectedCategory !== category) { // Prevent redundant updates
            setSelectedCategory(category);
            onCategorySelect(category);
        }
    };

    const getClassNames = (category) => {
        return selectedCategory === category ? "p-2 bg-dark text-white" : "p-2";
    };

    return (
        <>
            <div
                className="montserrat-normal d-flex justify-content-between"
                onClick={() => setCategoryOpen(!isCategoryOpen)}
                role="button"
                tabIndex="0"
            >
                <span>Category</span>
                <FontAwesomeIcon icon={isCategoryOpen ? faChevronDown : faChevronRight} />
            </div>

            {isCategoryOpen && (
                <div className="montserrat-light d-flex flex-column p-2">
                    {categories.map((category) => (
                        <span
                            key={category.id}
                            className={getClassNames(category.id)}
                            onClick={() => handleCategoryClick(category.id)}
                            role="button"
                            tabIndex="0"
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
