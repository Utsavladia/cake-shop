import React, { useState } from "react";
import "./styles.css";
import { faL } from "@fortawesome/free-solid-svg-icons";

const AddressOrder = ({ address, setAddress, uploadAddress }) => {
  const [newAddress, setNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(false);

  const [tempAddress, setTempAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const stateOptions = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleAddAddress = () => {
    setNewAddress(!newAddress);
  };

  const handlesaveAddress = () => {
    const isformvalid = Object.values(tempAddress).every(
      (field) => field.trim() !== ""
    );
    if (isformvalid) {
      setAddress(tempAddress);
      setNewAddress(false);
      setSelectedAddress(true);
      uploadAddress(tempAddress);
    } else {
      alert("Please fill all the required fileds...");
    }
  };

  const handleAddChange = () => {
    setSelectedAddress(true);
  };
  return (
    <div className="cart-container">
      <div className="price-details">
        <h2>Delivery Address</h2>
      </div>

      {selectedAddress && (
        <div className="address-data-selected">
          <input
            name="selectedaddress"
            type="radio"
            onChange={handleAddChange}
            checked={selectedAddress}
          />
          <label htmlFor="selectedaddress">
            <div className="label-address">
              <span className="address-name">{tempAddress.name}</span>
              <span>{tempAddress.phone}</span>
            </div>
            <div className="">
              <p className="text-address">
                {tempAddress.street}, {tempAddress.city}, {tempAddress.state} -{" "}
                <span className="label-address">{tempAddress.pincode}</span>
              </p>
            </div>
          </label>
        </div>
      )}
      <div className="address-data">
        <p className="new-address-button" onClick={handleAddAddress}>
          + Add New Address
        </p>
        {newAddress && (
          <div className="address-inputs">
            <input
              type="text"
              value={tempAddress.name}
              onChange={(e) =>
                setTempAddress({ ...tempAddress, name: e.target.value })
              }
              placeholder="Name"
              className="name-input"
              required
            />
            <input
              required
              type="text"
              value={tempAddress.phone}
              onChange={(e) =>
                setTempAddress({ ...tempAddress, phone: e.target.value })
              }
              placeholder="Phone"
              className="phone-input"
            />
            <input
              required
              type="text"
              value={tempAddress.street}
              onChange={(e) =>
                setTempAddress({ ...tempAddress, street: e.target.value })
              }
              placeholder="Street/Area"
            />
            <input
              required
              type="text"
              value={tempAddress.city}
              onChange={(e) =>
                setTempAddress({ ...tempAddress, city: e.target.value })
              }
              placeholder="City"
            />
            <select
              required
              value={tempAddress.state}
              onChange={(e) =>
                setTempAddress({ ...tempAddress, state: e.target.value })
              }
            >
              <option value="" disabled>
                Select state
              </option>
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <input
              required
              type="text"
              value={tempAddress.pincode}
              onChange={(e) =>
                setTempAddress({ ...tempAddress, pincode: e.target.value })
              }
              placeholder="Pincode"
            />
            <div className="save-address">
              <button className="save-address-b" onClick={handlesaveAddress}>
                Save Address
              </button>
              <button className="save-address-c" onClick={handleAddAddress}>
                Cancle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressOrder;
