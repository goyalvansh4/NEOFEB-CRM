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
import axios from "axios";

const TOKEN = import.meta.env.VITE_API_TOKEN;

const fetchCountries = async () => {
  const response = await axios.get("https://restfulcountries.com/api/v1/countries", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data.data;
};

const fetchStates = async (country) => {
  const response = await axios.get(`https://restfulcountries.com/api/v1/countries/${country}/states`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data.data;
};

const AddClient = () => {
  const [clientDetails, setClientDetails] = useState({
    name: "",
    companyName: "",
    address: "",
    country: "India",
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

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [statesLoading, setStatesLoading] = useState(false);
  const [countriesError, setCountriesError] = useState(null);
  const [statesError, setStatesError] = useState(null);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        setCountriesLoading(false);
      } catch (error) {
        setCountriesError(error.message);
        setCountriesLoading(false);
      }
    };

    fetchCountriesData();
  }, []);

  // Fetch states when the country changes
  useEffect(() => {
    const fetchStatesData = async () => {
      if (!clientDetails.country) return;
      setStatesLoading(true);
      try {
        const data = await fetchStates(clientDetails.country);
        setStates(data);
        setStatesLoading(false);
      } catch (error) {
        setStatesError(error.message);
        setStatesLoading(false);
      }
    };

    fetchStatesData();
  }, [clientDetails.country]);

  // Fetch states based on default country (India) on component mount
  useEffect(() => {
    const fetchStatesData = async () => {
      setStatesLoading(true);
      try {
        const data = await fetchStates("India");
        setStates(data);
        setStatesLoading(false);
      } catch (error) {
        setStatesError(error.message);
        setStatesLoading(false);
      }
    };

    fetchStatesData();
  }, []);

  const handleClientChange = (e) => {
    setClientDetails({
      ...clientDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryChange = (e) => {
    const newCountry = e;
    setClientDetails((prevDetails) => ({ ...prevDetails, country: newCountry }));
  };

  const handleBankChange = (e) => {
    setBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Client Details:", clientDetails);
    console.log("Bank Details:", bankDetails);
    // Add your submission logic here
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
            />
            <Input
              type="text"
              label="CIN"
              name="cin"
              value={clientDetails.cin}
            />
            <Input
              type="text"
              label="GST Number"
              name="gstNumber"
              value={clientDetails.gstNumber}
            />
            <Input
              type="text"
              label="TAN"
              name="tan"
              value={clientDetails.tan}
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
              onChange={handleCountryChange}
              required
              value={clientDetails.country} // default value set to India
            >
              {countriesLoading ? (
                <Option>Loading countries...</Option>
              ) : countriesError ? (
                <Option>Error loading countries</Option>
              ) : (
                countries.map((country) => (
                  <Option
                    key={country.name}
                    value={country.name}
                  >
                    {country.name}
                  </Option>
                ))
              )}
            </Select>

            {/* State Dropdown */}
            <Select
              label="State"
              name="state"
              value={clientDetails.state}
              onChange={(e) =>
                setClientDetails({ ...clientDetails, state: e.target.value })
              }
              required
            >
              {statesLoading ? (
                <Option>Loading states...</Option>
              ) : statesError ? (
                <Option>Error loading states</Option>
              ) : (
                states.map((state) => (
                  <Option key={state.name} value={state.name}>
                    {state.name}
                  </Option>
                ))
              )}
            </Select>
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

          {/* Submit Button */}
          <Button type="submit" style={{ backgroundColor: "#9E58FF" }} className="w-full">
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddClient;
