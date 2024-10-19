import React, { useState } from "react";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PriceInput = ({ label, value, onChange, id, min, max }) => (
    <div className="mt-3">
        <div className="input-group mb-3">
            <span className="input-group-text" id={`basic-addon-${id}`}>{label} :</span>
            <input 
                className="form-control" 
                type="number" 
                value={value} 
                onChange={onChange} 
                aria-labelledby={`basic-addon-${id}`} 
            />
        </div>
        <input 
            type="range" 
            className="form-range" 
            min={min} 
            max={max} 
            value={value} 
            id={id} 
            onChange={onChange} 
        />
    </div>
);

const Price = ({onPriceMinSelect , onPriceMaxSelect}) => {
    const [priceRangeMin, setPriceRangeMin] = useState(0);
    const [priceRangeMax, setPriceRangeMax] = useState(0);
    const [togglePrice, setTogglePrice] = useState(false);

    const handleOnChangeMinPrice = (e) => {
        setPriceRangeMin(parseInt(e.target.value, 10));
        onPriceMinSelect(e.target.value,10)
    };

    const handleOnChangeMaxPrice = (e) => {
        setPriceRangeMax(parseInt(e.target.value, 10));
        onPriceMaxSelect(e.target.value,10)
    };

    return (
        <>
            <div className="montserrat-normal d-flex justify-content-between" onClick={() => setTogglePrice(!togglePrice)}>
                <span>Price</span> <FontAwesomeIcon icon={togglePrice ? faChevronDown : faChevronRight} />
            </div>

            {togglePrice && (
                <div className="p-2">
                    <PriceInput
                        label="Min"
                        value={priceRangeMin}
                        onChange={handleOnChangeMinPrice}
                        id="customRangeMin"
                        min="1"
                        max="2000"
                    />
                    <PriceInput
                        label="Max"
                        value={priceRangeMax}
                        onChange={handleOnChangeMaxPrice}
                        id="customRangeMax"
                        min="1"
                        max="2000"
                    />
                </div>
            )}
        </>
    );
};

export default Price;
