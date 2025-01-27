import React from "react";

const ProductImageDetail = ({imageUrl, setSelectedImageIndex, selectedImageIndex}) => {
    return (
        <>

            { imageUrl && imageUrl.map((image, index) => (
                                <div style={{paddingRight:"8px", paddingTop:"8px"}}>
                                    <img alt="product detail"
                                        onClick={() => setSelectedImageIndex(index)} 
                                        className={index === selectedImageIndex ? "opacity_image" : ""} 
                                        src={image} 
                                        style={{width:"64px"}}/>
                                </div>
                            )) }

        </>
    )
}

export default ProductImageDetail;