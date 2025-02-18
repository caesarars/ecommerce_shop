import React from "react";
import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { faCcMastercard } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <div className="container_footer bg-dark">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center pt-5">
                    <div className="d-flex flex-column justify-content-center ">
                        <h3 className="montserrat-normal">Ars Empire</h3>
                        <p>an online fashion shop to fill your day with confidence</p>
                    </div>
                    <div className="d-flex flex-column align-items-center montserrat-light">    
                        <h3>Our Social Media</h3>
                        <p style={{textAlign:"left", width:"240px"}}><FontAwesomeIcon color="#c13584" icon={faInstagram}/> Instagram</p>
                        <p style={{textAlign:"left", width:"240px"}}><FontAwesomeIcon color="#4267B2" icon={faFacebook}/> Facebook</p>
                        <p style={{textAlign:"left", width:"240px"}}><FontAwesomeIcon color="#ff0050" icon={faTiktok}/> TikTok</p>
                        <p style={{textAlign:"left", width:"240px"}}><FontAwesomeIcon color="red" icon={faYoutube}/> Youtube</p>
                    </div>
                    {/*<div className="d-flex flex-column justify-content-center">
                        <h3>Payment</h3>
                        <p><FontAwesomeIcon size="2" color="cyan" icon={faCcVisa}/> Visa</p>
                        <p><FontAwesomeIcon color="orange" icon={faCcMastercard}/> Mastercards</p>
                        <p></p>
                    </div>*/}
                </div>
            </div>
           
        </div>
    )
}

export default Footer;