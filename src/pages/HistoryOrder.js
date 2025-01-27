import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import ImageViewer from "../components/ImageViewer/ImageViewer";
import moment from "moment";
import "./HistoryOrder.css"
import { API_URLS } from "../api/apiURLs";

const HistoryOrder = () => {
    const [ historyData, setHistoryData ] = useState([])
    const URL_GET_HISTORY = API_URLS.ORDER;


    const formattedDate = (val) => {
        return moment(val).format('YYYY-MM-DD HH:mm:ss');
    }
    
    const getHistoryOrder = async () => {
        try {

            const response = await axios.get(URL_GET_HISTORY, {withCredentials:true})

            if ( response.status === 200 ) {
                console.log(response.data)
                setHistoryData(response.data)
            }

        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getHistoryOrder()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="" style={{margin:"0 auto", width:"60%"}}>
                    <h3 className="montserrat-normal mb-5">History Order</h3>
                    <div className="d-flex flex-row justify-content-around montserrat-normal mb-5">
                        <p>Inprogess</p>
                        <p>Paid</p>
                        <p>Shipped</p>
                        <p>Delivered</p>
                        <p>Canceled</p>
                    </div>
                    {historyData && historyData.map((data) => (
                        <div className="d-flex mb-5">
                            <ImageViewer imageUrl={data.products[0].imageUrl}/>
                            <div className="" style={{marginLeft:"36px"}}>
                                <div className="d-flex flex-column">
                                    <p className="montserrat-normal">{data._id}</p>
                                    <p className="montserrat-light text-warning bold">{data.status}</p>
                                    <p className="montserrat-normal">${data.totalAmount}</p>
                                    <p className="montserrat-light">Ordered at {formattedDate(data.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="container_item">

                    </div>
                </div>
            </div>
        </>
    )
}

export default HistoryOrder;