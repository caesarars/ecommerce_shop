import React, { useState, useEffect } from "react";

import banner1 from "../../static/imageBanner/bannerModel1.png"
import banner2 from "../../static/imageBanner/bannerModel2.png"
import banner3 from "../../static/imageBanner/bannerModel3.png"
import banner4 from "../../static/imageBanner/bannerModel4.png"
import banner5 from "../../static/imageBanner/modelBanner5.png"

import "./ImageBanner.css"


const ImageBanner = () => {
 

    const modelImage = [banner1, banner2, banner3, banner4,banner5]
    const [indexImage, setIndexImage] = useState(0) 
    const [isFading, setIsFading] = useState(false); // Track animation

    const textBanner = ["Believe in your style.", "Make your life incredible" , "Follow your style", "Be Confident With Your Style", "Easy Confident"]


    const [styleImage, setStyleImage] = useState({
        backgroundImage: `url(${modelImage[0]})`,
        width: "100%",
        height: "70vh",
        backgroundRepeat :"no-repeat",
        borderRadius :"10px"
      });

    useEffect(() => {
        const intervalId = setInterval(() => {
         setIsFading(true)

         setTimeout(() => {
            setIndexImage((prevIndex) => {
                console.log("prevIndex : " , prevIndex )
                const nextIndex = prevIndex >= modelImage.length - 1 ? 0 : prevIndex + 1;
                return nextIndex;
            })

            setStyleImage((prevStyle) => ({
                ...prevStyle,
                backgroundImage: `url(${modelImage[indexImage]})`
              }));

              setIsFading(false)
         }, 300)

         
  

        }, 5000);
      
        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      }, [modelImage]);

    return (
        <>
            <div style={{width:"80%" , margin:"46px auto"}}>
                <div className={`image-banner d-flex flex-column justify-content-center align-items-center ${isFading ? 'fade' : ''}`} style={styleImage}>
                    <h2 className="montserrat-normal banner-text" style={{padding:"32px", opacity:"1", textAlign:"center", fontSize:"5em"}}>{textBanner[indexImage]}</h2>
                </div>
            </div>
            
        </>
    )
}

export default ImageBanner;