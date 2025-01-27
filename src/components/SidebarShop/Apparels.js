import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// Centralized apparels data
const APPARELS = [
    { id: "tshirt", label: "T-Shirt" },
    { id: "hoodie", label: "Hoodie" },
    { id: "skirt", label: "Skirt" },
    { id: "jacket", label: "Jacket" },
    { id: "flannel", label: "Flannel" },
];

const Apparels = ({ onApparelsSelect }) => {
    const [isApparelsOpen, setIsApparelsOpen] = useState(false);
    const [selectedApparel, setSelectedApparel] = useState("");

    // Toggle apparels list visibility
    const toggleApparelsVisibility = () => setIsApparelsOpen(prev => !prev);

    // Handle apparel selection
    const handleApparelSelection = (apparelId) => {
        setSelectedApparel(apparelId); 
        onApparelsSelect(apparelId); 

        if (selectedApparel === apparelId) {
            setSelectedApparel(""); 
            onApparelsSelect(""); 
        }

    };

    const getApparelClassNames = (apparelId) => (
        selectedApparel === apparelId ? "p-2 bg-dark text-white" : "p-2"
    );

    return (
        <div>
            {/* Apparels section header */}
            <div className="montserrat-normal d-flex justify-content-between"
                 onClick={toggleApparelsVisibility} role="button">
            <span>Apparels</span>
                <FontAwesomeIcon icon={isApparelsOpen ? faChevronDown : faChevronRight} />
            </div>

            {/* Render apparels list if open */}
            {isApparelsOpen && (
                <div className="montserrat-light d-flex flex-column p-2">
                    {APPARELS.map(({ id, label }) => (
                        <span key={id} className={getApparelClassNames(id)}
                              onClick={() => handleApparelSelection(id)}>
                            {label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Apparels;
