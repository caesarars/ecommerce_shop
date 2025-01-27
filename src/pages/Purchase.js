import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { API_URLS } from "../api/apiURLs";

const Purchase = () => {

    const [ purchaseData, setPurchaseData ] = useState({})
    const [ imageUrl , setImageUrl ] = useState("")
    const [ productName , setProductName ] = useState("")
    const [ product, setProduct ] = useState({})


    const { id } = useParams()
    const URL_GET_PURHCASE = `${API_URLS.ORDER}/${id}` 

    const getPurchase = async () => {
        try {
            const response = await axios.get(URL_GET_PURHCASE, {withCredentials:true})
          

            if (response.status === 200 ) {
                const responseData = response.data
                console.log("Purchase data " , responseData)
                
                setPurchaseData(responseData)
                setProduct(responseData.product)

                const product = responseData.products[0].product
                const URL_GET_PRODCUT = `${API_URLS.GET_PRODUCTS}/${product}` 
                await getProductDetail(URL_GET_PRODCUT)
            }

            
        } catch(err) {
            console.log(err)
        }
    }

    const getProductDetail = async (urlProduct) => {
        try {
            const response = await axios.get(urlProduct, {withCredentials:true})

            if (response.status === 200) {
                setImageUrl(response.data.imageUrl[0])
                setProductName(response.data.name)
            }

        } catch (err) {

        }
    }

    useEffect(() => {
        getPurchase();
    }, [])

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h3>This is your purchase</h3>
                <div>
                   
                        <div className="d-flex ">
                            <img src={imageUrl} style={{width:"220px", borderRadius:"8px" ,height:"220px"}} alt="order_items"/>
                        </div>
                        {JSON.stringify(product)}
                </div>
            </div>
        </>
    )
}

export default Purchase