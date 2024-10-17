import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import "./Product.css"
import Order from "../../pages/Order";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons'; // Import half-star
import { faMinus } from "@fortawesome/free-solid-svg-icons";


const Product = () => {

    useEffect(() => {
        getDetailProduct();
    }, [])

    const { id } = useParams()
    const navigate = useNavigate();
    const URL_GET_PRODCUT = `http://localhost:3000/product/${id}` 
    const [selectedImageIndex, setSelectedImageIndex ]= useState(0)
    const [ nameProduct, setNameProduct ] = useState("")
    const [ descProduct, setDescProduct ] = useState("")
    const [ priceProduct, setPriceProduct ] = useState(0)
    const [ stockProduct, setStockProduct ] = useState(0)
    const [ imageUrl, setImageUrl ] = useState([])
    const [ features, setFeatures ] = useState([])
    const [ quantity , setQuantity ] = useState(1)
    const [ totalPrice, setTotalPrice] = useState(priceProduct)

    console.log("Product totalPrice : ", totalPrice)

    const [ toggleOrderPage , setToggleOrderPage ] = useState(false)

    const handleChange = (e) => {

        console.log("onchange value : " , e.target.value * priceProduct)
        
        setQuantity(parseInt(e.target.value))
        console.log("quantity , ", quantity)
        setTotalPrice(e.target.value * priceProduct) 
        console.log("total price , ", totalPrice)
    }

    const getDetailProduct = async () => {
        const response = await axios.get(URL_GET_PRODCUT)
        setNameProduct(response.data.name)
        setDescProduct(response.data.description)
        setPriceProduct(response.data.price)
        setStockProduct(response.data.stock)
        setImageUrl(response.data.imageUrl)
        setFeatures(response.data.features)
        setTotalPrice(response.data.price)
        console.log("response detail ", response.data)
    }

    const detailPage = () => {
        return (
            <div className="d-flex mt-5">
                <div className="container_detail_left">
                    <div className="container_image d-flex">
                        <img src={imageUrl[selectedImageIndex]} style={{width:"80%"}}/>
                    </div>
                    <div className="d-flex">
                        <div className="d-flex flex-row flex-start container_subimage">
                            { imageUrl && imageUrl.map((image, index) => (
                                <div style={{paddingRight:"8px", paddingTop:"8px"}}>
                                    <img 
                                        onClick={() => setSelectedImageIndex(index)} 
                                        className={index === selectedImageIndex ? "opacity_image" : ""} 
                                        src={image} 
                                        style={{width:"64px"}}/>
                                </div>
                            )) }
                        </div>
                    </div>
                </div>
                <div className="container_detail_right w-50">
                    <div className="d-flex flex-column">
                        <h3 className="montserrat-normal mb-2">{nameProduct}</h3>
                        <div className="mb-4">
                            <FontAwesomeIcon icon={solidStar} className="text-warning"/>
                            <FontAwesomeIcon icon={solidStar} className="text-warning"/>        
                            <FontAwesomeIcon icon={solidStar} className="text-warning"/>        
                            <FontAwesomeIcon icon={solidStar} className="text-warning"/>   
                            <FontAwesomeIcon icon={halfStar} className="text-warning"/>                
                        </div>
                        {/*<p style={{textAlign:"justify"}}>{descProduct}</p>
                        {features.map((feat) => (
                            <li>{feat}</li>
                        ))} */}
                      
                        <div className="d-flex flex-column mt-2">
                            <p style={{fontWeight:"bold", fontSize:"36px"}}>${priceProduct * quantity}</p>
                            <div className="mb-4">
                                <h3 className="montserrat-normal">Available Size</h3>
                                <button className="btn btn-dark" style={{width:"48px", marginRight:"12px"}}>S</button>
                                <button className="btn btn-light" style={{width:"48px", marginRight:"12px"}}>M</button>
                                <button className="btn btn-light" style={{width:"48px", marginRight:"12px"}}>L</button>
                                <button className="btn btn-light" style={{width:"48px", marginRight:"12px"}}>XL</button>
                            </div>
                            <div className="d-flex flex-column">

                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faMinus} />
                                </span>
                                <input className="form-control" style={{width:"10%"}}
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    onChange={handleChange}
                                    min="1"
                                    max={stockProduct}
                                    step="1" />
                                    <br/>
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faPlus} />
                                </span>
                            </div>
                            <p style={{fontStyle:"italic", opacity:"0.3"}}>Stock available {stockProduct}</p>

                            </div>
                            <div></div>
                        </div>
                       
                       <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className="btn btn-light width-30">
                                <span className="montserrat-normal">Add to chart</span>
                            </div>
                            <div className="montserrat-normal btn btn-dark width-30" onClick={ () => navigate(`/order/${id}`, {
                                state: {
                                    productName : nameProduct,
                                    quantity: quantity,
                                    priceItem: totalPrice,
                                    imageUrl: imageUrl[selectedImageIndex]
                                }
                            })}>
                                <span  className="montserrat-normal">Order</span>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
             { detailPage() }
        </div>
    )
}

export default Product;