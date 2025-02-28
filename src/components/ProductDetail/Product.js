/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import "./Product.css"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStar as solidStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons'; // Import half-star
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import PopUp from "../PopUp/PopUp"
import ProductImageDetail from "./ProductImageDetail";
import { useUserContext } from '../../context/UserContext';
import { API_URLS } from "../../api/apiURLs"; // Adjust the path as necessary
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import Navbar from "../Navbar";

const Product = ({handleLoading}) => {
    const { userId } = useUserContext(); // Access userId from context

    useEffect(() => {
        getDetailProduct();
    }, [])

    const { id } = useParams()
    const navigate = useNavigate();
    const URL_GET_PRODCUT = `${API_URLS.GET_PRODUCTS}/${id}` 
    const URL_ADD_TO_CART =  API_URLS.CARTS;


    const [selectedImageIndex, setSelectedImageIndex ]= useState(0)
    const [ nameProduct, setNameProduct ] = useState("")
    const [ productId, setProductId ] = useState(null)
    const [ descProduct, setDescProduct ] = useState("")
    const [ priceProduct, setPriceProduct ] = useState(0)
    const [ stockProduct, setStockProduct ] = useState(0)
    const [ imageUrl, setImageUrl ] = useState([])
    const [ features, setFeatures ] = useState([])
    const [ quantity , setQuantity ] = useState(1)
    const [ totalPrice, setTotalPrice] = useState(priceProduct)
    const [ toggleModal, setToggleModal ] = useState(false);
    const [ listSizeProduct , setListSizeProduct ] = useState([])

    console.log("Product totalPrice : ", totalPrice)
    const [selectedSize, setSelectedSize] = useState(null);
    const [isLoading , setIsLoading ] = useState(false)

    const [ toggleOrderPage , setToggleOrderPage ] = useState(false)

    const handleChange = (e) => {

        let itemValue = e.target.value;
        if (isNaN(itemValue)) {
            itemValue = 0;
        }
        console.log("onchange value : " , itemValue * priceProduct)
        console.log("target value ", e.target.value)
        setQuantity(parseInt(e.target.value))

        console.log("quantity , ", quantity)
        setTotalPrice(e.target.value * priceProduct) 
        console.log("total price , ", totalPrice)
      
    }

    const getDetailProduct = async () => {
        setIsLoading(true)
        handleLoading(true)
        const response = await axios.get(URL_GET_PRODCUT)
        console.log("response get detail product " , response)
        setNameProduct(response.data.name)
        setDescProduct(response.data.description)
        setPriceProduct(response.data.price)
        setStockProduct(response.data.detail[0].stock)
        setImageUrl(response.data.imageUrl)
        setFeatures(response.data.features)
        setTotalPrice(response.data.price)
        setListSizeProduct(response.data.detail)
        setProductId(response.data._id)
        console.log("response detail ", response.data)
        setIsLoading(false)
        handleLoading(false)
    }

    const showModal = () => {
        setToggleModal(true)
    }

    const handleSizeProduct = (size) => {
        setSelectedSize(size); 

        const selectedSize = listSizeProduct.find(
            (detail) => detail.size === size
        );

        console.log("selectedSize : " , selectedSize)

        console.log("detail size product" , selectedSize)
        setStockProduct(selectedSize.stock)
    }

    const handleClose = () => {
        setToggleModal(false)
    }

    const handleSelectImage = (index) => {
        setSelectedImageIndex(index)
    }

    const addToCart = async () => {
        setIsLoading(true)
        const reqBody = {}
        reqBody.userId = userId
        reqBody.productId = productId
        reqBody.productName = nameProduct
        reqBody.imageProduct = imageUrl[0]
        reqBody.quantity = quantity
        reqBody.size = selectedSize
        reqBody.price = priceProduct
        reqBody.status = "active"
       
        try {
            const response = await axios.post(URL_ADD_TO_CART, reqBody , {withCredentials:true})
            if (response.data) {
                setIsLoading(false)
                showModal(true)
                window.location.reload();
                console.log(response)
            }
        } catch (err) {
            console.error(err)
        }
        
    }

    const addToCartPopUp = () => {
        return (
            <>
                <div className="container" style={{border:"1px solid white"}}>
                    <div className="d-flex justify-content-center flex-column align-items-center">
                        <FontAwesomeIcon icon={faCheckCircle} color="green" size="2x"/>
                        <p className="montserrat-light" style={{fontSize:"16px" , margin:"8px"}}>added to carts</p>
                    </div>
                </div>
            </>
        )
    }
    

    const detailPage = () => {
        return (
            <>
                <Navbar />

                <div className="d-flex mt-5 mb-5">
                <div className="container_detail_left">
                    <div className="container_image d-flex">
                    
                        {imageUrl && imageUrl[selectedImageIndex] ? 
                            (<img src={imageUrl[selectedImageIndex]} style={{width:"80%"}} alt="main_image_product"/>) 
                            : 
                            (<div style={{width:"80%" , height:"375px", backgroundColor:"grey", opacity:0.5}}></div>)
                        }
                    </div>
                    <div className="d-flex">
                        <div className="d-flex flex-row flex-start container_subimage">
                            <ProductImageDetail 
                                imageUrl={imageUrl} 
                                setSelectedImageIndex={handleSelectImage} 
                                selectedImageIndex={selectedImageIndex}
                            />
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
                            <p style={{fontWeight:"bold", fontSize:"36px"}}>${totalPrice}</p>
                            <div className="mb-4">
                                <p className="montserrat-light">Available Size</p>
                                { listSizeProduct && listSizeProduct.map((data) => (
                                    <button  className={`btn ${selectedSize === data.size ? 'btn-primary' : 'btn-light'}`} 
                                    style={{width:"48px", marginRight:"12px"}} 
                                    onClick={() => handleSizeProduct(data.size)}>{data.size}</button>
                                ))}
                            </div>
                            <div className="d-flex flex-column">

                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faMinus} />
                                </span>
                                <input className="form-control w-25" 
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

                        <PopUp show={toggleModal} handleClose={handleClose} >
                            {addToCartPopUp()}
                        </PopUp>
                       
                       <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className="btn btn-light width-30"  onClick={addToCart}>
                                <span className="montserrat-normal">Add to chart</span>
                            </div>
                            <div className="montserrat-normal btn btn-dark width-30" onClick={ () => navigate(`/order/${id}`, {
                                state: {
                                    productName : nameProduct,
                                    quantity: quantity,
                                    priceItem: totalPrice,
                                    imageUrl: imageUrl[selectedImageIndex],
                                    size: selectedSize
                                }
                            })}>
                                <span  className="montserrat-normal">Order</span>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
            </>
            
        )
    }

    return (
        <div className="container">
             { detailPage() }
        </div>
    )
}

export default Product;