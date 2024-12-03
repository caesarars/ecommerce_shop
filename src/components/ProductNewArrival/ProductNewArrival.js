import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductNewArrival.css"


const ProductNewArrival = ({ id, name , fileUrl, price ,stock, animationDirection })=> {
    const navigate = useNavigate()
    return (
        <div>
             <div className={`d-flex flex-column container_image animate_show ${animationDirection}`}>
                <img className=""
                    id="image_product" 
                    src={fileUrl}  
                    width="280px" 
                    height="320px" 
                    onClick={() => navigate(`/product/${id}`)}
                    alt="prodcut_new_arrival"
                    />
                <span className="montserrat-light mt-2">{name}</span>
                <div className="row mt-2">
                    <div className="col-md-3">
                        <span className="montserrat-normal">
                            ${price}
                        </span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ProductNewArrival;