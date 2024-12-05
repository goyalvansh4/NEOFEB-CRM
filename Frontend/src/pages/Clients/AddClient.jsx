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
  Spinner,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalAxios from "../../../Global/GlobalAxios";
import { GetCountries, GetState } from "react-country-state-city";
import axios from "axios";

const AddClient = () => {
  const [loading, setLoading] = useState(false);
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
    status: "",
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

  const navigate = useNavigate();

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      const result = await GetCountries();
      setCountriesList(result);
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (value) => {
    const selectedCountry = countriesList[value];
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      country: selectedCountry.name,
      state: "",
    }));

    const states = await GetState(selectedCountry.id);
    setStatesList(states);
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
      setLoading(true); // Start loading
      return GlobalAxios.post("/client", formData);
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("Client added successfully!", {
        position: "bottom-right",
      });
      // Clear form after successful submission
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
        status: "",
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
    },
    onError: () => {
      setLoading(false);
      toast.error("Failed to add client.", { position: "bottom-right" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: clientDetails.name,
      email: clientDetails.email,
      company_name: clientDetails.companyName,
      phone_number: clientDetails.phoneNumber,
      status: clientDetails.status,
      country: clientDetails.country,
      state: clientDetails.state,
      city: clientDetails.city,
      address: clientDetails.address,
      gst_number: clientDetails.gstNumber,
      pan: clientDetails.pan,
      tan: clientDetails.tan,
      cin: clientDetails.cin,
      bank_name: bankDetails.bankName,
      bank_account: bankDetails.bankAccount,
      ifsc_code: bankDetails.ifscCode,
      upi_id: bankDetails.upiId,
      pincode: clientDetails.pincode,
    };
    mutation.mutate(formData);
  };

  return (
    <Card className="shadow-lg rounded-lg mt-6">
      <CardHeader className="p-4 border-b bg-gradient-to-r from-[#A05AFF] to-[#9E58FF]">
        <Typography variant="h5" className="text-white">
          Add Client
        </Typography>
      </CardHeader>
      <CardBody className="p-4">
        <form onSubmit={handleSubmit}>
          {/* Client Details Section */}
          <Typography variant="h6" className="mb-4 text-[#A05AFF]">
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
              type="number"
              label="Phone Number"
              name="phoneNumber"
              maxLength={10} // Restrict to 10 characters
              pattern="[0-9]{9}"
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
            <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A05AFF]"
            name="status"
            onChange={handleClientChange}>
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
          <Typography variant="h6" className="mb-4 text-[#A05AFF]">
            Address Details:
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Select
              label="Country"
              name="country"
              onChange={(e) => {
                handleCountryChange(e);
              }}
              required
            >
              {countriesList.map((country, index) => (
                <Option key={country.id} value={index}>
                  {country.name}
                </Option>
              ))}
            </Select>

            <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c3c3c]"
              label="State"
              name="state"
              onChange={handleClientChange}
              required
            >
              {statesList.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>

            <Input
              type="text"
              label="City"
              name="city"
              value={clientDetails.city}
              onChange={handleClientChange}
              required
            />

            <Input
              type="number"
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
          <Typography variant="h6" className="mb-4 text-[#A05AFF]">
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
              type="number"
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

          {/* Submit and Back Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#1BCFB4] to-[#4BCBEB] text-white"
              size="lg"
              disabled={loading}
            >
              {loading ? <Spinner className="h-5 w-5" /> : "Submit"}
            </Button>
            <Button
              type="button"
              className="bg-red-500 text-white"
              size="lg"
              onClick={() => {
                navigate("/dashboard/clients");
              }}
            >
              Back
            </Button>
          </div>
        </form>
        <ToastContainer />
      </CardBody>
    </Card>
  );
};

export default AddClient;