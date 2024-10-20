import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import ProductItem from "../components/ProductItem/ProductItem";
import Footer from "../components/Footer/Footer"
import { API_URLS } from "../api/apiURLs";
import { getProductsUrlParams } from "../api/getProductsUrlParams";
import SidebarShop from "../components/SidebarShop/SidebarShop";

import { useFetch } from "../api/getProducts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ShopProducts from "../components/Shop/ShopProducts";
import ShopLoading from "../components/Shop/ShopLoading";
import axios from "axios";

// Your API call function
const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // Return null or handle the error response
    }
  };

const Shop = () => {

    const [data, setData] = useState([])
    
   
    const [error , setError] = useState(false) 
    const [loading, setLoading] = useState(false)

    const [filters, setFilters] = useState({});

    const [filteredData, setFilteredData] = useState([]);

    // Function to apply filters to the fetched products
    const applyFilter = () => {
      if (!data) return; // If no data is available, do nothing
  
      // Apply the filters to the data
      const filtered = data.filter((product) => {
        let isValid = true;
  
        // Apply category filter
        if (filters.category && product.category !== filters.category) {
          isValid = false;
        }
  
        // Apply apparels filter (if applicable)
        if (filters.apparels && product.apparels !== filters.apparels) {
          isValid = false;
        }
  
        // Apply price range filter
        if (filters.minPrice && product.price < filters.minPrice) {
          isValid = false;
        }
        if (filters.maxPrice && product.price > filters.maxPrice) {
          isValid = false;
        }
  
        // Apply size filter (if applicable)
        if (filters.size && !product.sizes.includes(filters.size)) {
          isValid = false;
        }
  
        return isValid;
      });
  
      // Update the filtered data state
      setFilteredData(filtered);
      fetchProducts();
    };
  

    const renderError = () => {
        return (
            error && (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h3 className="montserrat-normal" style={{ color: "red" }}>{error}</h3>
                </div>
            )
        )
    }


    useEffect(()=> {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        let queryString = "?";
        
        if (filters && Object.keys(filters).length > 0) {
          const filterQuery = Object.keys(filters)
            .map(key => `${key}=${filters[key]}`)
            .join("&");
            
          queryString += filterQuery;
        }
    
        const urlParams = API_URLS.GET_PRODUCTS + queryString;
        console.log("Request URL:", urlParams);
    
        const response = await fetchData(urlParams); // Await the result of fetchData
        if (response) {
          setData(response);  // Update state with the response data
          console.log("Fetched Products:", response);
        }
      };

    const handleFilterShop = (filterData) => {
        setFilters(filterData);
      };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="mt-5"></div>
                <div className="" style={{marginLeft:"190px",marginBottom:"8px" , padding:"16px"}}>
                    <div className="d-flex justify-content-between align-items-center flex-wrap"> 
                        <span className="montserrat-light">Showing {data ? data.length : ""} products</span>
                        <div className="montserrat-light">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Sort By</span>
                                <select className="form-control">
                                    <option>Latest</option>
                                    <option>Lowest Price</option>
                                    <option>High Price</option>
                                    <option>Popularity</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div className="d-flex justify-content-around">
                    {renderError()}
                    <SidebarShop handleFilterShop={handleFilterShop} applyFilter={applyFilter}/>
                    <ShopLoading loading={loading} />
                    <ShopProducts error={error} loading={loading} data={data}/>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
