import React from "react";
import "./ProductItem.css"
import { useNavigate } from "react-router-dom";


const ProductItem = ({ id, name , fileUrl, price ,stock }) => {
    const navigate = useNavigate();

    return (
        <div className="container container_product mb-5">
            <div className="d-flex flex-column">
                <img id="image_product" src={fileUrl}  width="300px" height="320px" onClick={() => navigate(`/product/${id}`)}/>
                <span className="montserrat-light" style={{fontSize:"1.1em"}}>{name}</span>
                <div className="d-flex flex-column">
                    <span className="montserrat-normal" style={{fontSize:"1.2em"}}>
                        ${price}
                    </span>
                </div> 
            </div>
            
        </div>
    )
}

export default ProductItem;