import React from "react";
import "./DiscountBanner.css"
import modelDiscount from "../../static/model/model2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const DiscountBanner = () => {
    return (
        <div className="container_discount mt-5">
            <div className="">
                <div className="d-flex justify-content-between align-items-center background_orange">
                     <img src={modelDiscount} alt="discount_model" style={{width:"30%", borderRadius:"16px"}}/>
                     <div className="d-flex flex-column">
                        <h3 className="montserrat-normal fontSizeDiscount">Grab you 30% Off Discount</h3>
                        <p className="montserrat-light fontSizeRegister">Register Here</p>
                     </div>
                     <div>
                        <p></p>
                     </div>
                </div>
            </div>
            <div className="mt-5 mb-5">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="montserrat-normal" style={{fontSize:"2em", width:"540px", textAlign:"center"}}>Subscribe to our newsletter to get our latest promo</p>
                    <p className="montserrat-light">Get off 30% for you first register</p>
                    <div>
                        <div className="input-group mb-3" style={{width:"360px"}}>
                            <span className="input-group-text" id="basic-addon2">
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </span>
                            <input type="email" className="form-control" placeholder="Your email" aria-label="youremail" aria-describedby="basic-addon2" />
                        </div>
                    </div>
                    <div className="btn btn-warning w-25">Subscribe</div>
                </div>
            </div>
        </div>
    )
}

export default DiscountBanner