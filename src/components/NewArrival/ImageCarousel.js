import React from "react";
import ProductNewArrival from "../ProductNewArrival/ProductNewArrival";

const ImageCarousel = ({images, startIndex, endIndex, animationDirection }) => {
   
    const visibleIndex = images.slice(startIndex,endIndex)

    return (
        <div className={`d-flex flex-start justify-content-between`}>
             {visibleIndex.map((el, index) => (
                  <ProductNewArrival animationDirection={animationDirection} 
                          id={el._id}
                          name={el.name} 
                          fileUrl={el.imageUrl[0]}
                          price={el.price}
                          stock = {el.stock}    
                   /> 
              ))}
        </div>
    )
}

export default ImageCarousel;