import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ShippingAddressForm = () => {

    const [isAddAddress, setIsAddAddress] = useState(false)

    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        street: "",
        province: "",
        city: "",
        district: "",
        postalCode: "",
    });

    const provinces = ["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Bali"];
    const cities = {
        "DKI Jakarta": ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat"],
        "Jawa Barat": ["Bandung", "Bekasi", "Bogor"],
        "Jawa Tengah": ["Semarang", "Solo", "Magelang"],
        "Jawa Timur": ["Surabaya", "Malang", "Kediri"],
        "Bali": ["Denpasar", "Badung", "Gianyar"],
    };

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Alamat berhasil disimpan:\n" + JSON.stringify(address, null, 2));
    };

    return (           
            <div className=" container-shipping-address p-4 shadow montserrat-light">
                    <p className="montserrat-normal">Shipping Address</p>
                    <div className="mb-3">
                        <label className="form-label montserrat-light">Recipient's Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            value={address.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Phone No</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={address.phone}
                            onChange={handleChange}
                            placeholder="08xxxxxxxxxx"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Complete Address</label>
                        <textarea
                            className="form-control"
                            name="street"
                            value={address.street}
                            onChange={handleChange} 
                            rows="3"
                            placeholder="Nama jalan, RT/RW, Nomor rumah, Kelurahan"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Province</label>
                        <select
                            className="form-control"
                            name="province"
                            value={address.province}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih Provinsi</option>
                            {provinces.map((prov, index) => (
                                <option key={index} value={prov}>
                                    {prov}
                                </option>
                            ))}
                        </select>
                    </div>

                    {address.province && (
                        <div className="mb-3">
                            <label className="form-label">City/District</label>
                            <select
                                className="form-control"
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choose City/District</option>
                                {cities[address.province]?.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label">Sub District</label>
                        <input
                            type="text"
                            className="form-control"
                            name="district"
                            value={address.district}
                            onChange={handleChange}
                            placeholder="Illinois"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Postal Code</label>
                        <input
                            type="text"
                            className="form-control"
                            name="postalCode"
                            value={address.postalCode}
                            onChange={handleChange}
                            placeholder="9812"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Confirm Address
                    </button>                
            </div>
    );
};

export default ShippingAddressForm;
