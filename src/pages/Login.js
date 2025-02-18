import React, {useState, useEffect} from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import model1 from "../static/model1.png"
import model2 from "../static/model2.png"
import model3 from "../static/model3.png"
import model4 from "../static/model4.png"

import ErrorPopUp from "../components/ErrorPopUp/ErrorPopUp";
import SuccessPopUp from "../components/SuccessPopUp/SuccessPopUp";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { API_URLS } from "../api/apiURLs";

import { setUser } from '../userSlice';  // Import the setUser action
import { useDispatch } from 'react-redux';
import { useTokenContext } from "../context/TokenContext";

import { ethers } from "ethers";

axios.defaults.withCredentials = true; // Set this globally if all requests use it

const Login = () => {
    const URL_LOGIN = API_URLS.LOGIN;
    console.log("url login : " , URL_LOGIN)
    const [email, setEmail] = useState(""); // State to store username
    const [password, setPassword] = useState(""); // State to store password
    const [errorMessage, setErrorMessage] = useState("")
    const [successLogin, setSuccessLogin] = useState(false)
    const [isLoading , setIsLoading] = useState(false)
    const dispatch = useDispatch();  // Correct dispatch function from Redux
    const { setToken } = useTokenContext();

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleHomapageClick = () => {
      navigate("/"); // Navigate to /login when button is clicked
    }

    const modelImage = [model1, model2, model3, model4]
    const [indexImage, setIndexImage] = useState(0) 

    const [userAddress, setUserAddress] = useState(null);

    // Function to connect MetaMask
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setUserAddress(address);
                console.log("Connected Address:", address);
            } catch (error) {
                console.error("Error connecting wallet:", error);
            }
        } else {
            alert("MetaMask not detected! Please install MetaMask.");
        }
    };
   

    useEffect(() => {
        const intervalId = setInterval(() => {
          setIndexImage((prevIndex) => {
            // Check if the index exceeds the length of modelImage array
            if (prevIndex >= modelImage.length - 1) {
              return 0; // Reset to the first image
            } else {
              return prevIndex + 1; // Move to the next image
            }
          });
        }, 3000);
      
        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      }, [modelImage.length]);
    

    const handleLogin = async () => {
        setIsLoading(true)

        console.log("handle Login")
        try {
            const response = await axios.post(URL_LOGIN , {
                email: email,
                password : password
            }, { withCredentials: true })

            if (response.status === 200 ) {
                localStorage.setItem("token", response.data.token);
                //setToken(response.data.token)
                setSuccessLogin(true)
                dispatch(setUser(
                    {
                        email:response.data.email,
                        username : response.data.name
                    }
                ))
                

                connectWallet();
                
                navigate("/")
            } 

        } catch(err) {
            if (err.response) {
                console.error('Login failed:', err.response.data.message);
                setErrorMessage(err.response.data.message)
            } else if (err.request) {
                console.error('No response from the server:', err.request);
                setErrorMessage(err.request)
            } else {
                console.error('Error:', err.message);
                setErrorMessage(err.message)
            }
        }
        
        setIsLoading(false)
    }

    return (
       
        <>
        <LoadingComponent isLoading={isLoading} />
        <div className="d-flex montserrat-normal">
            <div className="left_side" style={{
                backgroundImage: `url(${modelImage[indexImage]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                opacity:"0.8"
            }}>
                <div className="d-flex justify-content-center align-items-center flex-column" style={{height:"100vh"}} >
                     {/*<h3 className="mb-5 montserrat-normal" 
                     style={{backgroundColor :"black",color:"white", padding:"16px", border:"1px solid white", borderRadius:"8px"}}>
                        Ars Empire
                     </h3>*/}
                </div>
            </div>
            <div className="right_side">
                <div className="container mt-5">
                    
                    <div className="d-flex justify-content-center align-items-center flex-column" style={{height:"86vh"}}>
                        <h3 id="ecommerce_name" onClick={() => handleHomapageClick() } className="montserrat-normal">Ars Empire</h3>
                        <p onClick={() => handleHomapageClick() } className="montserrat-normal" style={{fontWeight:400}}>Welcome to the most fascinating fashion online store</p>
                       

                        <input className="form-control w-50 mt-5" placeholder="email"
                            type="text"
                            value={email} // Bind input value to username state
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input className="form-control w-50 mt-5" type="password" placeholder="password"
                            value={password} // Bind input value to username state
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="d-flex justify-content-around align-items-center w-75 mt-5">
                            <div className="btn btn-primary w-25" onClick={() => handleLogin()}>
                                Login
                            </div>
                            <div className="btn btn-secondary w-25" onClick={() => navigate("/register")}>
                                Register
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {successLogin && <SuccessPopUp message={"Success Login"} onClose={() => {setSuccessLogin(false)}} />}
            {errorMessage && <ErrorPopUp message={errorMessage} onClose={() => {setErrorMessage("")}} />}
        </div>
    </>  
    )
}

export default Login;