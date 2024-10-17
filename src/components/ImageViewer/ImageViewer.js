import React from "react";

const ImageViewer = ({imageUrl}) => {
    return (
        <>
            <div className="d-flex ">
                <img src={imageUrl} style={{width:"220px", borderRadius:"8px" ,height:"220px"}} alt="order_items"/>
            </div>
        </>
    )
}

export default ImageViewer;