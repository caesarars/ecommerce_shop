import React, {useState, useEffect} from "react";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import ProductNewArrival from "../ProductNewArrival/ProductNewArrival"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./NewArrival.css"

import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


const NewArrival = () => {
    const URL_GET_PRODCUTS = "http://localhost:3000/product"  

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


      useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className="bg-light" style={{height:"70vh"}}>
            <div className="container mt-5 mb-5">
                <div className="d-flex justify-content-between mb-5 pt-5">
                    <h3 className="montserrat-normal mr-auto" style={{fontSize:"2em"}}>New Arrival</h3>
                    <div className="d-flex justify-content-between align-items-center">
                        <FontAwesomeIcon className="greylight" size="2x" icon={faChevronLeft} style={{marginRight:"36px"}}/>
                        <FontAwesomeIcon size="2x" icon={faChevronRight} />
                    </div>
                </div>
               
                <div className="d-flex flex-start justify-content-between">
                    {data.map((el, index) => (
                        <ProductNewArrival id={el._id}
                                name={el.name} 
                                fileUrl={el.imageUrl[0]}
                                price={el.price}
                                stock = {el.stock}    
                                /> 
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default NewArrival;