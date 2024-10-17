import React, {useState} from "react";
import "./LabelProducts.css"


const LabelProducts = ({onClickLabel}) => {

    const onClickChangeLabel = (label) => {
        onClickLabel(label)
    }

    return (
        <div className="d-flex justify-content-center container_label montserrat-normal mt-2 mb-2">
            <span onClick={() => onClickChangeLabel("Shirt")} style={{fontSize:"1.3em"}}>
                Shirt
            </span>
            <span onClick={() => onClickChangeLabel("Hoodie")} style={{fontSize:"1.3em"}}>
                Hoodie
            </span>
            <span onClick={() => onClickChangeLabel("Jeans")} style={{fontSize:"1.3em"}}>
                Jeans
            </span>
            <span onClick={() => onClickChangeLabel("Sneakers")} style={{fontSize:"1.3em"}}>
                Sneakers
            </span>
        </div>
    )
}

export default LabelProducts;