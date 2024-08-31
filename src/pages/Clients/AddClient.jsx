import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";

const AddClient = () => {
  const [clientDetails, setClientDetails] = useState({
    name: "",
    companyName: "",
    address: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Client Details:", clientDetails);
    console.log("Bank Details:", bankDetails);
    // Add your submission logic here
  };

  return (
    <Card className="shadow-lg rounded-lg mt-6">
      <CardHeader className="p-4 border-b bg-[#9f5affbf] dark:bg-gray-800">
        <Typography variant="h5" className="text-[#FFF] dark:text-gray-100">
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
              type="text"
              label="Company Name"
              name="companyName"
              value={clientDetails.companyName}
              onChange={handleClientChange}
              // required
            />
            <Input
              type="text"
              label="Address"
              name="address"
              value={clientDetails.address}
              onChange={handleClientChange}
              required
            />
            <Input
              type="text"
              label="State"
              name="state"
              value={clientDetails.state}
              onChange={handleClientChange}
              required
            />
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
              type="tel"
              label="Phone Number"
              name="phoneNumber"
              value={clientDetails.phoneNumber}
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
              type="text"
              label="GST Number"
              name="gstNumber"
              value={clientDetails.gstNumber}
              onChange={handleClientChange}
              // required
            />
            <Input
              type="text"
              label="PAN"
              name="pan"
              value={clientDetails.pan}
              onChange={handleClientChange}
              // required
            />
            <Input
              type="text"
              label="TAN"
              name="tan"
              value={clientDetails.tan}
              onChange={handleClientChange}
              // required
            />
            <Input
              type="text"
              label="CIN"
              name="cin"
              value={clientDetails.cin}
              onChange={handleClientChange}
              // required
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
              // required
            />
            <Input
              type="text"
              label="Bank Account"
              name="bankAccount"
              value={bankDetails.bankAccount}
              onChange={handleBankChange}
              // required
            />
            <Input
              type="text"
              label="IFSC Code"
              name="ifscCode"
              value={bankDetails.ifscCode}
              onChange={handleBankChange}
              // required
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
          <Button type="submit" style={{backgroundColor:"#9E58FF"}} className="w-full">
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddClient;
