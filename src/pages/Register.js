import React, {useState , useEffect} from "react";
import Navbar from "../components/Navbar";
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"

import model1 from "../static/model1.png"
import model2 from "../static/model2.png"
import model3 from "../static/model3.png"
import model4 from "../static/model4.png"

import RegisterModal from "../components/Modal/RegisterModal";


const Register = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state controlled in parent
    const modelImage = [model1, model2, model3, model4]
    const [indexImage, setIndexImage] = useState(0) 
    const navigate = useNavigate()

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

    const URL_REGISTER_USER = "http://localhost:3000/user"

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNo : "",
        rePassword : ''
      });

    const [ error , setError ] = useState({
        name : false,
        email : false,
        password : false,
        phoneNo : false,
    })

    const [ errorText, setErrorText ] = useState({
        password : ""
    })

      const validateRePassword = () => {
        if (formData.password && formData.rePassword) {
            console.log("pass " , formData.password , formData.rePassword)
            return formData.password === formData.rePassword
        }
        return false
      }

      const handleHomapageClick = () => {
        navigate("/"); // Navigate to /login when button is clicked
      }

      const handleInputPassword = (e) => {

      }
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));

        if (name === "password" || name === "rePassword") {
            if (!validateRePassword()) {
                console.log("correct password")
                setError((prevErrors) => ({ ...prevErrors, password: true }));
                setErrorText((prevErrorText) => ({...prevErrorText, password : "Password not match"}))
            } else {
                console.log("incorrect password")
                setError((prevErrors) => ({ ...prevErrors, password: false }));
                setErrorText((prevErrorText) => ({...prevErrorText, password : ""}))
            }
        } 
      }

      const handleConfirmPass = (e) => {
        console.log("confirm password : ", e.target.value)
      }

      const handlePassword = (e) => {
        console.log("password : " , e.target.value)
      }

      const registerUser = async () => {

        const registerParams = {}
        registerParams.email = formData.email
        registerParams.username = formData.name
        registerParams.name = formData.name
        registerParams.password = formData.password
        
        try {
            handleOpen()
            console.log("Register params : ", registerParams)
            //const response = await axios.post(URL_REGISTER_USER, registerParams , {withCredentials: true})
            //console.log(response)
            //if (response.status === 200) {
            //    console.log(response.data)
            //}

        } catch (err) {

        }
      }

      const handleSubmit = (e) => {
        e.preventDefault();

        console.log(validateRePassword)
        registerUser()
        console.log('Form Data:', formData);
        // Handle form submission (e.g., API call)
      };

      const handleOpen = () => {
        setIsModalOpen(true);
      };
    
      const handleClose = () => {
        setIsModalOpen(false);
      }; 

    return (
        <>
            <div className="d-flex">
                <div className="left_side" style={{backgroundColor:"white"}}>
                <RegisterModal open={isModalOpen} handleClose={handleClose} />
                
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <h3 id="ecommerce_name" onClick={() => handleHomapageClick() } className="montserrat-normal">Ars Empire</h3>
                    <form id="form_register" onSubmit={handleSubmit} style={{width:"60%"}}>
                        <input className="form-control" type="text" name="fullname" placeholder="Full Name"/>
                        <input className="form-control" type="text" name="username" placeholder="Username"/>
                        <input className="form-control" type="email" name="email" placeholder="Email" />
                        <input className="form-control" type="tel" name="phoneno" placeholder="Phone No"/>
                        <input onChange={(e) => {handlePassword(e)}} 
                            className="form-control" 
                            type="password" 
                            name="password" 
                            placeholder="Password"/>

                        <input onChange={(e) => {handleConfirmPass(e)}} 
                            className="form-control" 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="Confirm your password"/>
                    </form>
                </div>
                
            </div>
                <div className="right_side" style={{
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
                
        </div>
            
        </>
    )
}

export default Register;