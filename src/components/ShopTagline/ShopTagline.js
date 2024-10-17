import React from "react";
import "./ShopTagline.css"

const ShopTagline = () => {
    return (
        <>
            <div className="margin-center mb-5 w-80">
                <div className="d-flex justify-content-between">
                    <div style={{width:"320px", borderBottom:"1px solid #edb203"}}>
                        <h3 className="montserrat-normal" style={{lineHeight:"64px", fontSize:"2.5em"}}>
                            Empowering
                            Indonesian Local Brands
                        </h3>
                    </div>
                    <div style={{width:"420px", textAlign:"right", borderTop:"1px solid #edb203"}}>
                        <div className="greybox"></div>
                        <p className="montserrat-light" style={{fontSize:"1.2em", lineHeight:"36px", paddingTop:"16px"}}>
                        Ars empire has commitment to support our local brands country to make indonesian fashion and market brighter
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopTagline;