import React from "react";

const ProductImageDetail = ({imageUrl, setSelectedImageIndex, selectedImageIndex}) => {
    return (
        <>

            {imageUrl ? (
            imageUrl.length > 0 ? (
                imageUrl.map((image, index) => (
                <div key={index} style={{ paddingRight: "8px", paddingTop: "8px" }}>
                    <img
                    alt="product detail"
                    onClick={() => setSelectedImageIndex(index)}
                    className={index === selectedImageIndex ? "opacity_image" : ""}
                    src={image}
                    style={{ width: "64px" }}
                    />
                </div>
                ))
            ) : (
                [...Array(3)].map((_, index) => (
                    <div key={index} style={{ paddingRight: "8px", paddingTop: "8px" }}>
                    <div
                        style={{
                        width: "64px",
                        height: "64px",
                        backgroundColor: "grey",
                        borderRadius: "4px"
                        }}
                    ></div>
                    </div>
                ))
            )
            ) : (
            // Show grey boxes while loading
                <p>No Image Available</p>
            )}


        </>
    )
}

export default ProductImageDetail;