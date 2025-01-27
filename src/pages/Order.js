import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from 'react-router-dom';
import ShippingInformationForm from "../components/Forms/ShippingInformationForm";
import BillingInformationForm from "../components/Forms/BillingInformationForm";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import "./Order.css"
import ProgressBar from "../components/ProgressBar/ProgressBar";
import PaymentSuccessModal from "../components/Modal/PaymentSuccessModel";
import GooglePayButton from '@google-pay/button-react';
import ImageViewer from "../components/ImageViewer/ImageViewer";
import { API_URLS } from "../api/apiURLs";

const Order = () => {
    const location = useLocation();
    const { quantity, priceItem, imageUrl, productName, size} = location.state;
    const initPrice = priceItem
    const [ newQuantity, setNewQuantity ] = useState(quantity)
    const [ newPrice, setNewPrice ] = useState(priceItem)
    const [ statusProgress, setStatusProgress ] = useState("shipping")
    const [ showShippingInfos, setShowShippingInfos ] = useState(true)
    const [ showBillingInfos, setShowBillingInfos] = useState(false)
    const [ billingInfos, setBillingInfos ] = useState({})
    const [ shippingInfos, setShippingInfo ] = useState({})
    const [ showModalPayment , setShowModalPayment ] = useState(false)
    const [ orderId , setOrderId ] = useState("")

    console.log("price items : ", newPrice)

    const getBillingInfo = (val) => {
        setBillingInfos(val)
    }

    const getShippingInfo = (val) => {
        setShippingInfo(val)
    }
    

    const onDecrease = () => {
        setNewQuantity(newQuantity - 1)
        setNewPrice((newQuantity - 1) * initPrice)
    }

    const onIncrease = () => {
        const temp = newQuantity + 1
        setNewQuantity(temp)
        setNewPrice((newQuantity + 1) * initPrice)
    }

    const navigate = useNavigate()

    const URL_ORDER_PRODUCT = API_URLS.ORDER

    const postOrder = async (paymentMethod) => {
       console.log("postOrder : ", billingInfos)
        const requestBody = {
            user : "66e1a44e8ec6dd48ae696ddb",
            products: [
                {
                    product : productId,
                    quantity : newQuantity,
                    price : newPrice,
                    imageUrl : imageUrl,
                    size : size
                }
            ],
            totalAmount: newPrice + 10,
            status: "inprogress",
            shippingAddress : {
                street: shippingInfos.address,
                city : shippingInfos.city,
                state : shippingInfos.state,
                postalCode : shippingInfos.postalCode,
                country : shippingInfos.country
            },
            paymentMethod: paymentMethod,
            paymentStatus: "ongoing",
            createdAt: "2024-09-10T12:34:56Z",
            updatedAt: "2024-09-10T12:34:56Z"
        }

        console.log("requestBody : " , requestBody)

        try {
            const response = await axios.post(URL_ORDER_PRODUCT, requestBody, {withCredentials:true})
            const responseData = response.data
            console.table(responseData)
            setOrderId(responseData._id)
        } catch (err) {
            console.log(err)
        }

    }

    const { productId } = useParams()
   
    const handleToggleShipping = () => {
        setShowShippingInfos(!showShippingInfos)
        setShowBillingInfos(true)
        setStatusProgress("order")
        console.log("status progress : " , statusProgress)
    }

    const handlePaymentMethod = async (paymentMethod) => {
        await postOrder(paymentMethod)
        showModal();
    }

    const handleClickFirstDot = () => {
        setShowShippingInfos(true)
        setShowBillingInfos(false)
    }

    const showModal = () => {
        setShowModalPayment(true)
    }

    const handleCloseModal = () => {
        setShowModalPayment(false)
    }
   
    return (
        <>
            <Navbar />
            <PaymentSuccessModal show={showModalPayment} handleClose={handleCloseModal} orderId={orderId}/>
            <div className="container mt-5 mb-5 pt-5">
                <div className="container" style={{height:"30vh", width:"60%"}}>
                    <h4 className="montserrat-normal" style={{marginBottom:"24px"}}>Order Detail</h4>
                    <div className="d-flex justify-content-between" style={{height:"inherit"}}>  

                        <ImageViewer imageUrl={imageUrl} />
                        
                        <div className="">
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="montserrat-normal">{productName}</p>
                                </div>
                            </div>
                            <div className="row">

                                    <div className="d-flex justify-content-around align-items-center">
                                    <button className="btn btn-light" onClick={() => onDecrease()}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    {newQuantity}
                                    <button className="btn btn-warning"  onClick={onIncrease}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                    </div>
                            </div> 
                            <div className="row mt-3">
                                <div className="col-md-3">
                                    <span className="montserrat-normal" style={{fontSize:"32px"}}>${newPrice}</span>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="d-flex align-items-center">
                                </div>
                            </div> 
                            <div className="row mt-3">
                                <button onClick={() => navigate("/")} className="btn btn-dark">Back to Shopping</button>
                            </div>       
                        </div>
                    </div>
                </div>
                <div className="mt-5 progress_bar_order">
                    <ProgressBar statusProgress={statusProgress} handleClickFirstDot={handleClickFirstDot}/>
                </div>
                <br></br>
                <div className="" style={{width: "60%", margin: "0 auto"}}>  

                    <ShippingInformationForm 
                        showShippingInfos={showShippingInfos} 
                        hideShippingShowBilling={() => handleToggleShipping()}
                        emitShippingInfo={(val) => getShippingInfo(val)} />

                    <BillingInformationForm newPrice = {newPrice}
                        emitPaymentMethod = {() => handlePaymentMethod()}
                        showBillingInfos={showBillingInfos} 
                        emitBillingInfo={(val) => getBillingInfo(val)}/>

                    <GooglePayButton style={{display: showBillingInfos ? "block" : "none"}}
                            environment="TEST"
                            paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            allowedPaymentMethods: [
                                {
                                type: 'CARD',
                                parameters: {
                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                },
                                tokenizationSpecification: {
                                    type: 'PAYMENT_GATEWAY',
                                    parameters: {
                                    gateway: 'example',
                                    gatewayMerchantId: 'exampleGatewayMerchantId',
                                    },
                                },
                                },
                            ],
                            merchantInfo: {
                                merchantId: '12345678901234567890',
                                merchantName: 'Demo Merchant',
                            },
                            transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: newPrice.toString() + ".00",
                                currencyCode: 'USD',
                                countryCode: 'US',
                            },
                            }}

                            onLoadPaymentData={async paymentRequest => {
                                if (paymentRequest) {
                                    const paymentMethod = paymentRequest.paymentMethodData.info.cardNetwork
                                    await handlePaymentMethod(paymentMethod)
                                }
                            }}
                        
                        />

                </div>
                
            </div>
        </>
        
    )
}

export default Order;