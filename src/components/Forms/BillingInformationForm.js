import React, { useState, useEffect } from 'react';

const BillingInformationForm = ({showBillingInfos, emitBillingInfo, newPrice, emitPaymentMethod}) => {
 
  const [billingInfo, setBillingInfo] = useState({
    billingName: '',
    billingAddress: '',
    billingApartment: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    billingCountry: '',
    billingPhoneNumber: '',
    billingEmailAddress: '',
    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handleChange " , name, value)
    setBillingInfo({
      ...billingInfo,
      [name]: value,
    });
    emitBillingInfo(billingInfo)

    console.log(billingInfo)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to API or validate the form.
    console.log('Billing Information:', billingInfo);
  };
 
  return (
    <form onSubmit={handleSubmit} style={{marginTop:"32px", paddingBottom: "36px", display : showBillingInfos ? "block" : "none"}}>
    
          <h4 className='mb-4 montserrat-normal'>Billing Information</h4>
      <div className="form-group mb-3">
        <label className="montserrat-light pb-3"  htmlFor="billingName">Billing Name</label>
        <input
          type="text"
          className="form-control"
          id="billingName"
          name="billingName"
          value={billingInfo.billingName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3"  htmlFor="billingAddress">Billing Address</label>
        <input
          type="text"
          className="form-control"
          id="billingAddress"
          name="billingAddress"
          value={billingInfo.billingAddress}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3"  htmlFor="billingApartment">Apartment, Suite, Unit, etc. (Optional)</label>
        <input
          type="text"
          className="form-control"
          id="billingApartment"
          name="billingApartment"
          value={billingInfo.billingApartment}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3"  htmlFor="billingCity">City</label>
        <input
          type="text"
          className="form-control"
          id="billingCity"
          name="billingCity"
          value={billingInfo.billingCity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3"  htmlFor="billingState">State/Province/Region</label>
        <input
          type="text"
          className="form-control"
          id="billingState"
          name="billingState"
          value={billingInfo.billingState}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3"  htmlFor="billingPostalCode">Zip/Postal Code</label>
        <input
          type="text"
          className="form-control"
          id="billingPostalCode"
          name="billingPostalCode"
          value={billingInfo.billingPostalCode}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3"  htmlFor="billingCountry">Country</label>
        <input
          type="text"
          className="form-control"
          id="billingCountry"
          name="billingCountry"
          value={billingInfo.billingCountry}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3"  htmlFor="billingPhoneNumber">Phone Number</label>
        <input
          type="tel"
          className="form-control"
          id="billingPhoneNumber"
          name="billingPhoneNumber"
          value={billingInfo.billingPhoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="montserrat-light pb-3"  htmlFor="billingEmailAddress">Email Address</label>
        <input
          type="email"
          className="form-control"
          id="billingEmailAddress"
          name="billingEmailAddress"
          value={billingInfo.billingEmailAddress}
          onChange={handleChange}
          required
        />
      </div>
    </form>
  );
};

export default BillingInformationForm;
