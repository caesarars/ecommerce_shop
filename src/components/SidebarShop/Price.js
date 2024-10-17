import React, { useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Price = () => {

    const [priceRangeMin , setPriceRangeMin] = useState(0)
    const [priceRangeMax , setPriceRangeMax] = useState(0)

    const handleOnChangeMinPrice = (e) => {
        setPriceRangeMin(e.target.value)
    }
    
    const handleOnChangeMaxPrice = (e) => {
        setPriceRangeMax(e.target.value)
    }


    return (
        <>
         <div className="montserrat-normal d-flex justify-content-between">
            <span>Price</span> <FontAwesomeIcon icon={faChevronRight} /> 
        </div>

        <div className="mt-3">
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Min :</span>
                <input className="form-control" type="text" value={priceRangeMin} onChange={(e) => handleOnChangeMinPrice(e)}/>
            </div>
            <input type="range" className="form-range" min="1" max="2000" value={priceRangeMin} id="customRange2" onChange={(e)=> handleOnChangeMinPrice(e)}></input>
        </div>
        <div>
        <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Max :</span>
                <input className="form-control" type="text" value={priceRangeMax} onChange={(e) => handleOnChangeMaxPrice(e)}/>
            </div>
            <input type="range" className="form-range" min="1" max="2000" id="customRange2" value={priceRangeMax} onChange={(e)=> handleOnChangeMaxPrice(e)}></input>
        </div>
        </>
       
    )
}

export default Price