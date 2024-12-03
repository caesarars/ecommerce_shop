import React, {useState, useEffect} from "react";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import ProductNewArrival from "../ProductNewArrival/ProductNewArrival"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageCarousel from "./ImageCarousel";
import "./NewArrival.css"

import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


const NewArrival = () => {
    const URL_GET_PRODCUTS = "http://localhost:3000/product"  

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationDirection , setAnimationDirection] = useState("next");

    const imagePerView = 4;

    const startIndex = currentIndex * imagePerView;
    const endIndex = startIndex + imagePerView;

    const [ data, setData ] = useState([]) 

    const fetchData = async (params = {}) => {
        try {
            const response = await axios.get(URL_GET_PRODCUTS, {
                params:params
            })
            setData(response.data.products)
    
        } catch(err) {
            console.error(err.message)
        }
      }

      const handleNext = () => {
        if (endIndex < data.length) {
          setCurrentIndex(currentIndex + 1);
          setAnimationDirection("next");
        }
      };
    
      const handlePrev = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setAnimationDirection("prev")
        }
      };


      useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className="bg-light" style={{height:"70vh"}}>
            <div className="container mt-5 mb-5">
                <div className="d-flex justify-content-between mb-5 pt-5">
                    <h3 className="montserrat-normal mr-auto" style={{fontSize:"2em"}}>New Arrival</h3>
                    <div className="d-flex justify-content-between align-items-center">
                        <FontAwesomeIcon onClick={handlePrev} className="greylight" size="2x" icon={faChevronLeft} style={{marginRight:"36px"}}/>
                        <FontAwesomeIcon onClick={handleNext} size="2x" icon={faChevronRight} />
                    </div>
                </div>

                <ImageCarousel 
                    images={data} 
                    startIndex={startIndex} 
                    endIndex={endIndex} 
                    animationDirection={animationDirection}/>
            </div>
        </div>
        
    )
}

export default NewArrival;