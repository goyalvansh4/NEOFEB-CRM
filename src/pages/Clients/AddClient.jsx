import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import GlobalAxios from "../../../Global/GlobalAxios";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import axios from "axios";

const AddClient = () => {
  const [clientDetails, setClientDetails] = useState({
    name: "",
    companyName: "",
    address: "",
    country: "IN",
    state: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    email: "",
    gstNumber: "",
    pan: "",
    tan: "",
    cin: "",
  });

  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    bankAccount: "",
    ifscCode: "",
    upiId: "",
  });

  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");

  // Fetch all countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      const result = await GetCountries();
      setCountriesList(result);
    };
    fetchCountries();
  }, []);

  // Handle country change and fetch states
  const handleCountryChange = async (value) => {
    const selectedCountry = countriesList[value];
    // console.log(selectedCountry.name);
    setCountryId(selectedCountry.id); // Set the country ID for fetching states
    setClientDetails((prevDetails) => ({ ...prevDetails, country: selectedCountry.name, state: "" }));

    // Fetch states based on the selected country
    const states = await GetState(selectedCountry.id);
    setStatesList(states); // Update the states list
  };

  // Handle state change and fetch cities
  const handleStateChange = async (value) => {
    
    setClientDetails((prevDetails) => ({ ...prevDetails, state: value}));
  };

  const handleClientChange = (e) => {
    setClientDetails({
      ...clientDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBankChange = (e) => {
    setBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value,
    });
  };

  const mutation = useMutation({
    mutationFn: (formData) => {
      console.log("Inside Mutation",formData);
      // return GlobalAxios.post("/clients", formData);
      return axios.post("http://192.168.43.152:8000/api/v1/admin/clients",formData);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Map the state fields to the new required field names
    const formData = {
      name: clientDetails.name,
      email: clientDetails.email,
      company_name: clientDetails.companyName, // Changed to company_name
      phone: clientDetails.phoneNumber, // Changed to phone
      country: clientDetails.country,
      state: clientDetails.state,
      city: clientDetails.city,
      address: clientDetails.address,
      gst_number: clientDetails.gstNumber, // Changed to gst_number
      pan: clientDetails.pan,
      tan: clientDetails.tan,
      cin: clientDetails.cin,
      bank_name: bankDetails.bankName, // Changed to bank_name
      bank_account_number: bankDetails.bankAccount, // Changed to bank_account_number
      bank_ifsc_code: bankDetails.ifscCode, // Changed to bank_ifsc_code
      upi_id: bankDetails.upiId, // Changed to upi_id
    };
    
    console.log(formData);
    mutation.mutate(formData); // Submit the form data
  };
  

  return (
    <Card className="shadow-lg rounded-lg mt-6">
      <CardHeader className="p-4 border-b bg-gradient-to-r from-[#A05AFF] to-[#9E58FF] dark:bg-gray-800">
        <Typography variant="h5" className="text-white dark:text-gray-100">
          Add Client
        </Typography>
      </CardHeader>
      <CardBody className="p-4">
        <form onSubmit={handleSubmit}>
          {/* Client Details Section */}
          <Typography variant="h6" className="mb-4 text-[#A05AFF] dark:text-gray-100">
            Client Details:
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              type="text"
              label="Name"
              name="name"
              value={clientDetails.name}
              onChange={handleClientChange}
              required
            />
            <Input
              type="email"
              label="Email"
              name="email"
              value={clientDetails.email}
              onChange={handleClientChange}
              required
            />
            <Input
              type="tel"
              label="Phone Number"
              name="phoneNumber"
              value={clientDetails.phoneNumber}
              onChange={handleClientChange}
              required
            />
            <Input
              type="text"
              label="Company Name"
              name="companyName"
              value={clientDetails.companyName}
              onChange={handleClientChange}
            />
            <Input
              type="text"
              label="PAN"
              name="pan"
              value={clientDetails.pan}
              onChange={handleClientChange}
            />
            <Input
              type="text"
              label="CIN"
              name="cin"
              value={clientDetails.cin}
              onChange={handleClientChange}
            />
            <Input
              type="text"
              label="GST Number"
              name="gstNumber"
              value={clientDetails.gstNumber}
              onChange={handleClientChange}
            />
            <Input
              type="text"
              label="TAN"
              name="tan"
              value={clientDetails.tan}
              onChange={handleClientChange}
            />
          </div>

          {/* Address Section */}
          <Typography variant="h6" className="mb-4 text-[#A05AFF] dark:text-gray-100">
            Address Details:
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Country Dropdown */}
            <Select
              label="Country"
              name="country"
              onChange={(e) => {
                handleCountryChange(e);
              }}
              required
              // value={clientDetails.country}
            >
              {countriesList.map((country, index) => (
                <Option key={country.id} value={index}>
                  {country.name}
                </Option>
              ))}
            </Select>

            {/* State Dropdown */}
            <Select
              label="State"
              name="state"
              // value={clientDetails.state}
              onChange={(e) => {
                // console.log(e);
                handleStateChange(e);
              }}
              required
            >
              {statesList.map((state, index) => (
                <Option key={state.id} value={state.name}>
                  {state.name}
                </Option>
              ))}
            </Select>

            {/* City Dropdown */}
            <Input
              type="text"
              label="City"
              name="city"
              value={clientDetails.city}
              onChange={handleClientChange}
              required
            />

            <Input
              type="text"
              label="Pincode"
              name="pincode"
              value={clientDetails.pincode}
              onChange={handleClientChange}
              required
            />
            <Input
              type="text"
              label="Address"
              name="address"
              value={clientDetails.address}
              onChange={handleClientChange}
              required
            />
          </div>

          {/* Bank Details Section */}
          <Typography variant="h6" className="mb-4 text-[#A05AFF] dark:text-gray-100">
            Bank Details:
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              type="text"
              label="Bank Name"
              name="bankName"
              value={bankDetails.bankName}
              onChange={handleBankChange}
            />
            <Input
              type="text"
              label="Bank Account"
              name="bankAccount"
              value={bankDetails.bankAccount}
              onChange={handleBankChange}
            />
            <Input
              type="text"
              label="IFSC Code"
              name="ifscCode"
              value={bankDetails.ifscCode}
              onChange={handleBankChange}
            />
            <Input
              type="text"
              label="UPI ID"
              name="upiId"
              value={bankDetails.upiId}
              onChange={handleBankChange}
            />
          </div>

          {/* Submit and Discard Buttons */}
          <div className="flex justify-between">
            <Button type="submit" color="green" size="lg">
              Submit
            </Button>
            <Button
              type="button"
              color="red"
              size="lg"
              onClick={() => {
                setClientDetails({
                  name: "",
                  companyName: "",
                  address: "",
                  country: "IN",
                  state: "",
                  city: "",
                  pincode: "",
                  phoneNumber: "",
                  email: "",
                  gstNumber: "",
                  pan: "",
                  tan: "",
                  cin: "",
                });
                setBankDetails({
                  bankName: "",
                  bankAccount: "",
                  ifscCode: "",
                  upiId: "",
                });
              }}
            >
              Discard
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddClient;