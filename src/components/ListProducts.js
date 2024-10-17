import React from "react";
import "./ListProducts.css"

import { useState, useEffect } from "react";

import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import ProductItem from "./ProductItem/ProductItem";
import axios from "axios";
import SearchBox from "./SearchBox";
import LabelProducts from "./LabelProducts";

const ListProduct = () => {
    
  const URL_GET_PRODCUTS = "http://localhost:3000/product"  

  const [data, setData] = useState([]);
  const [searchValue , setSearchValue] = useState("")
  const [selectedLabel, setSelectedLabel] = useState("")

  const fetchData = async (params = {}) => {
    try {
        const response = await axios.get(URL_GET_PRODCUTS, {
            params:params
        })
        setData(response.data)

    } catch(err) {
        console.error(err.message)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeachValue = (val) => {
    setSearchValue(val)
    console.log("searchValue : " + searchValue)
  }

  const handleEnterButton = () => {
    const params = {}

    if (searchValue) params.name = searchValue

    fetchData(params)
  }

  const handleClickLabel = (value) => {

    const params = {}

    if (searchValue) params.name = searchValue

    if (value) params.category = value

    fetchData(params)
  }

  console.log("newData : " , data)

    return (
        <div className="w-100" style={{backgroundColor:"#f3f3f3"}}>
        <h2 className="montserrat-normal" style={{textAlign:"center", paddingTop:"32px"}}>Best Appreals</h2>
        <LabelProducts onClickLabel = {(val) => handleClickLabel(val)}/>
        <div className="" style={{margin: "0 auto", width:"85%"}}>
            <div className="d-flex flex-wrap justify-content-around">
                {data.map((el, index) => (
                    
                    <div key={index} className="mb-5">
                        <ProductItem id={el._id}
                            name={el.name} 
                            fileUrl={el.imageUrl[0]}
                            price={el.price}
                            stock = {el.stock}    
                            />
                    </div>
                ))}
            </div>
        </div>
        </div>
        
        
    )
}

export default ListProduct