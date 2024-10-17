import React, { useState } from 'react';

const ShippingInformationForm = ({hideShippingShowBilling, showShippingInfos, emitShippingInfo}) => {

  const [shippingInfo, setShippingInfo] = useState({
    recipientName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    emailAddress: '',
    specialInstructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
    emitShippingInfo(shippingInfo)
  };

  const handleContinue = () => {
    hideShippingShowBilling();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to API or validate the form.
    console.log('Shipping Information:', shippingInfo);
  };

  return (
    <div onSubmit={handleSubmit} style={{marginTop:"32px", paddingBottom:"32px", display: showShippingInfos ? "block" : "none"}}>
      <h4 className='mb-4 montserrat-normal'>Shipping Information</h4>
      <div className="form-group mb-3">
        <label className="montserrat-light pb-3" htmlFor="recipientName">Recipient Name</label>
        <input
          type="text"
          className="form-control"
          id="recipientName"
          name="recipientName"
          value={shippingInfo.recipientName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3" htmlFor="address">Street Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={shippingInfo.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3" htmlFor="apartment">Apartment, Suite, Unit, etc. (Optional)</label>
        <input
          type="text"
          className="form-control"
          id="apartment"
          name="apartment"
          value={shippingInfo.apartment}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3" htmlFor="city">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={shippingInfo.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3" htmlFor="state">State/Province/Region</label>
        <input
          type="text"
          className="form-control"
          id="state"
          name="state"
          value={shippingInfo.state}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3" htmlFor="postalCode">Zip/Postal Code</label>
        <input
          type="text"
          className="form-control"
          id="postalCode"
          name="postalCode"
          value={shippingInfo.postalCode}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3" htmlFor="country">Country</label>
        <input
          type="text"
          className="form-control"
          id="country"
          name="country"
          value={shippingInfo.country}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3" htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          className="form-control"
          id="phoneNumber"
          name="phoneNumber"
          value={shippingInfo.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3" htmlFor="emailAddress">Email Address</label>
        <input
          type="email"
          className="form-control"
          id="emailAddress"
          name="emailAddress"
          value={shippingInfo.emailAddress}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label className="montserrat-light pb-3" htmlFor="specialInstructions">Special Delivery Instructions (Optional)</label>
        <textarea
          className="form-control"
          id="specialInstructions"
          name="specialInstructions"
          value={shippingInfo.specialInstructions}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>
      <div className='row'>
        <button onClick={handleContinue} className='btn btn-success'>Continue to Billing Information</button>
      </div>
    </div>
  );
};

export default ShippingInformationForm;
