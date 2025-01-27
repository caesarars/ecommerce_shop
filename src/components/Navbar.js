import React, { useEffect, useState } from "react"
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import SearchBox from "./SearchBox";
import { API_URLS } from "../api/apiURLs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Carts from "./Carts/Carts";

import { useUserContext } from "../context/UserContext";
import { useCartContext } from "../context/CartContext";


const Navbar = () => {
    const email = useSelector((state) => state.user.email)
    const navigate = useNavigate();
    const { setUserId } = useUserContext(); // Get the setUserId function from context
    const { listOfCart , setListOfCart } = useCartContext();
    const [ username, setUsername ] = useState("");
    const [ carts, setCarts ] = useState([])

    const [toggleProfile, setToggleProfile] = useState(false)

    const handleClickLogin = () => {
        navigate("/login")
    }

    const logout = async () => {
        try {
            const response = await axios.post(API_URLS.LOGOUT, {} , {withCredentials:true})
            console.log(response)

            if (response.status === 200) {
                setUsername(null)
                setUserId(null); // Clear userId on logout
                navigate("/")
            }
    
        } catch(err) {
            console.error(err.message)
        }
      }

    useEffect(()=> {
       // Check if the session exists
       const checkSession = async () => {
        console.log("check session")
            const token = localStorage.getItem("token");
            const response = await axios.get(API_URLS.ME, {withCredentials:true,headers: {
                Authorization: `Bearer ${token}`,
              }});
            const responseCart = await axios.get(API_URLS.CARTS, {withCredentials:true, headers: {
                Authorization: `Bearer ${token}`,
              }})

              if (response.data) {
                setUsername(response.data.name);
                setUserId(response.data.id); // Set userId from response
              }

              if (responseCart.data) {
                  setListOfCart(responseCart.data.carts)
              }
        
    };

    checkSession();
    }, [])
    
    const handleEnterButton = () => {

    }

    const handleSeachValue = () => {

    }

    return (
        <div class=" montserrat-normal pt-3" >
            <div className="container d-flex flex-row align-items-center justify-content-between">
                <span onClick={ () => navigate("/") } className="mainColor ecommerceName" style={{fontSize:"36px"}}>Ars Empire</span>
                <div className="d-flex justify-content-between align-items-center">
                    <span onClick={() => navigate("/shop")} style={{marginLeft : "136px"}}>Shop</span>
                    <span style={{marginLeft : "36px"}}>New Arrival</span>
                    <span style={{marginLeft : "36px"}}>About</span>
                    <SearchBox  style={{width:"300px"}} onEnterButton={() => handleEnterButton()}  onSeachValue = {(val) => {handleSeachValue(val)}}/>
                </div>
                <div style={{width:"120px"}} className="d-flex justify-content-end">
                {username !== null ? (
                                <>
                                    <div className="container_cart">
                                        <FontAwesomeIcon icon={faShoppingCart} style={{width:"24px" ,height:"24px"}} onClick={() => navigate("/cart")}/>
                                        {
                                            listOfCart && <span className="total_order">{listOfCart.length}</span>
                                        }
                                        {/*<Carts data={carts} />*/}
                                    </div>
                                    <div  className=""
                                        onMouseEnter={() => setToggleProfile(!toggleProfile) } 
                                            onMouseLeave={() => setToggleProfile(!toggleProfile)}>
                                        <div className="user_icon">
                                            <FontAwesomeIcon icon={faUser} style={{width:"24px" ,height:"24px"}} />
                                        </div>
                                        <div className="profile_menu" style={{ display: toggleProfile ? "block" : "none", textAlign:"center"}}>
                                            <div className="d-flex flex-column" style={{ height: "100%" }}>
                                                    <p className="montserrat-normal" id="username">{username}</p>
                                                    <p className="menu_link montserrat-light">Profile</p>
                                                    <p className="menu_link montserrat-light" onClick={ () => navigate("/orders") }>Orders</p>
                                                    <p className="menu_link montserrat-light" onClick={() => logout()}style={{ marginTop: "auto" }}>Logout</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) :
                            
                                <span onClick={() =>handleClickLogin()} >Login</span> 
                            
                            }  
                </div>
            </div>
        </div>
    )
}

export default Navbar;