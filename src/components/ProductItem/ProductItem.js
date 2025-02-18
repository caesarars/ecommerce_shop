import React, {useEffect, useState} from "react";
import "./ProductItem.css"
import { useNavigate } from "react-router-dom";


const ProductItem = ({ id, name , fileUrl, price ,stock }) => {
    const navigate = useNavigate();
    const [isVisible , setIsVisible] = useState(false)
    useEffect(() => {
        setTimeout(() => {
          setIsVisible(true);
        }, 100); // Delay biar kelihatan efeknya
      }, []);

    return (
        <div className="container container_product mb-5" style={{overflow:"visible"}}>
        <div className={`items fade-in ${isVisible ? "show" :""}`}>
            <div className="d-flex flex-column">
                <img  alt="product_item" id="image_product" src={fileUrl}  width="280px" height="320px" onClick={() => navigate(`/product/${id}`)}/>
                <span className="montserrat-light" style={{fontSize:"1.1em"}}>{name}</span>
                <div className="d-flex flex-column">
                    <span className="montserrat-normal" style={{fontSize:"1.2em"}}>
                        ${price}
                    </span>
                </div> 
            </div>
        </div>
        </div>
    )
}

export default ProductItem;