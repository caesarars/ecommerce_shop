import React from "react";
import "./CollaborateBrands.css"
import adidas from "../../static/brands/adidas.svg"
import nike from "../../static/brands/nike-11.svg"
import uniqlo from "../../static/brands/uniqlo-1.svg"
import lacoste from "../../static/brands/lacoste-1.svg"
import pullAndBear from "../../static/brands/pull-bear-2.svg"
import zara from "../../static/brands/zara.svg"
import asics from "../../static/brands/asics-3.svg"

const CollaborateBrands = () => {
    return (
        <div className="" style={{marginBottom:"64px"}}>
            <div className="container">
                <h3 className="montserrat-normal mb-5 orange" style={{textAlign:"center"}}>Collaborated Brands</h3>
                <div className="container_brands mb-5 d-flex flex-center justify-content-around align-items-center">
                    <img src={adidas} width={"120px"}/>
                    <img src={nike} width={"120px"}/>
                    <img src={uniqlo} width={"120px"}/>
                    <img src={lacoste} width={"120px"}/>
                </div>
                <div className="container_brands d-flex flex-center justify-content-around align-items-center" style={{textAlign:"center", marginTop:"120px"}}>
                    <img src={pullAndBear} width={"120px"}/>
                    <img src={zara} width={"120px"}/>
                    <img src={asics} width={"120px"}/>
                    <img src={pullAndBear} width={"120px"}/>
                </div>
            </div>
        </div>
    )
}

export default CollaborateBrands