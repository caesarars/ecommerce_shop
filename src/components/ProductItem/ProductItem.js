import React from "react";
import "./ProductItem.css"
import { useNavigate } from "react-router-dom";


const ProductItem = ({ id, name , fileUrl, price ,stock }) => {
    const navigate = useNavigate();

    return (
        <div className="container container_product">
            <div className="d-flex flex-column">
                <img id="image_product" src={fileUrl}  width="320px" height="360px" onClick={() => navigate(`/product/${id}`)}/>
                <span className="fw-bold">{name}</span>
                <div className="row">
                    <div className="col-md-2">
                        <span className="fw-normal">
                            Price
                        </span>
                    </div>
                    <div className="col-md-3">
                        <span className="fw-normal">
                            ${price}
                        </span>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default ProductItem;