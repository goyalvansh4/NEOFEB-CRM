import { useState, useEffect } from "react";
import GlobalAxios from '../../../Global/GlobalAxios';

import {
  Button,
  Input,
  Select,
  Option,
  IconButton,
  Typography,
} from "@material-tailwind/react";

export default function AddInvoice({ setHideForm }) {
  const [formValues, setFormValues] = useState({
    id: "",
    street: "",
    city: "",
    post: "",
    country: "",
    clientName: "",
    clientEmail: "",
    clientStreet: "",
    clientCity: "",
    clientPost: "",
    clientCountry: "",
    date: "",
    payment: "1",
    description: "",
    items: [],
    grandTotal: 0,
    status: "Pending",
  });

  const [items, setItems] = useState([]);
  const [client, setClient] = useState([]);
  const [clientDetails, setClientDetails] = useState({
    email: '',
    address: '',
    country: '',
    city: '',
    pincode: '',
    gstNumber: '',
  });

  useEffect(() => {
    const fetchClients = async () => {
      const response = await GlobalAxios.get("/client");
      console.log(response.data);
      setClient(response.data.data);
    }
    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleClientChange = (e) => {
    console.log(e);
    const selectedClient = client.filter((c) => c.name === e);
    console.log(selectedClient[0]);
    if (selectedClient) {
      setClientDetails({
        email: selectedClient[0].email,
        address: selectedClient[0].address,
        country: selectedClient[0].country,
        city: selectedClient[0].city,
        pincode: selectedClient[0].pincode,
        gstNumber: selectedClient[0].gst_number || "",
      });
    }
  };

  const calculateItemTotal = (item) => {
    let cgst = 0, sgst = 0, igst = 0;
    console.log(clientDetails.gstNumber);
    if (clientDetails.gstNumber.startsWith("05")) {
      sgst = 2.5;
      igst = 0;
    } else {
      cgst = 2.5;
      igst = 5;
    }
    const total = item.qty * item.price * (1 + (cgst + sgst + igst) / 100);
    return { ...item, cgst, sgst, igst, total };
  };

  const updateAllItemTotals = (items) => {
    return items.map((item) => calculateItemTotal(item));
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        itemName: "",
        description: "",
        hsn: "",
        qty: 0,
        price: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        total: 0,
      },
    ]);
  };

  const handleItemChange = (id, field, value) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? calculateItemTotal({ ...item, [field]: value })
        : item
    );
    setItems(updatedItems);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSubmit = (status) => {
    const grandTotal = calculateGrandTotal();
    const invoiceData = {
      ...formValues,
      id: Date.now(),
      items: updateAllItemTotals(items),
      grandTotal,
      status,
    };
    console.log("Invoice Data:", invoiceData); // Debugging purposes

    setFormValues({
      id: "",
      street: "",
      city: "",
      post: "",
      country: "",
      clientName: "",
      clientEmail: "",
      clientStreet: "",
      clientCity: "",
      clientPost: "",
      clientCountry: "",
      date: "",
      payment: "1",
      description: "",
      items: [],
      grandTotal: 0,
      status: "Pending",
    });
    setItems([]);
    setHideForm(true);
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <Typography
        variant="h1"
        style={{ color: "#9E58FF" }}
        className="mb-6 text-2xl font-bold"
      >
        Create Invoice
      </Typography>

      {/* Bill From and Bill To Sections */}
      {/* Bill From Section */}
      <section className="mb-10">
        <Typography
          variant="h6"
          style={{ color: "#9E58FF" }}
          className="mb-4 text-lg font-medium"
        >
          Bill From
        </Typography>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Input
            label="Company Name"
            name="comp_name"
            value={formValues.comp_name}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Company Email"
            name="comp_email"
            value={formValues.comp_email}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Mobile Number"
            type="number"
            name="comp_number"
            value={formValues.comp_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
        <Input
          label="Street Address"
          name="street"
          value={formValues.street}
          onChange={handleInputChange}
          required
        />
          <Input
            label="City"
            name="city"
            value={formValues.city}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Post Code"
            type="number"
            name="post"
            value={formValues.post}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Country"
            name="country"
            value={formValues.country}
            onChange={handleInputChange}
            required
          />
        </div>
      </section>

      {/* Bill To Section */}
      <section className="mb-10">
        <Typography
          variant="h6"
          style={{ color: "#9E58FF" }}
          className="mb-4 text-lg font-medium"
        >
          Bill To
        </Typography>
        <div className="grid grid-cols-3 gap-4 mt-4">
        <Select
          label="Client's Name"
          name="clientName"
          value={formValues.clientName} 
          onChange={handleClientChange} 
          required
        >
          {client.map((Client) => (
            <Option key={Client._id} value={Client.name}> 
              {Client.name}
            </Option>
          ))}
        </Select>


        <Input
          label="Client's Email"
          name="clientEmail"
          type="email"
          value={clientDetails.email}
          onChange={handleClientChange}
          required
        />
        <Input
          label="Client's Street Address"
          name="clientStreet"
          value={clientDetails.address}
          onChange={handleClientChange}
          required
        />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Input
            label="Client's City"
            name="clientCity"
            value={clientDetails.city}
            onChange={handleClientChange}
            required
          />
          <Input
            label="Client's Post Code"
            name="clientPost"
            value={clientDetails.pincode}
            onChange={handleClientChange}
            required
          />
          <Input
            label="Client's Country"
            name="clientCountry"
            value={clientDetails.country}
            onChange={handleClientChange}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6">
          <Input
            label="Invoice Date"
            name="date"
            type="date"
            value={formValues.date}
            onChange={handleInputChange}
            required
          />
          <Select
            label="Payment Terms"
            name="payment"
            value={formValues.payment}
            onChange={(e) =>
              setFormValues({ ...formValues, payment: e.target.value })
            }
            required
          >
            <Option value="1">Net 1 Day</Option>
            <Option value="7">Net 7 Days</Option>
            <Option value="14">Net 14 Days</Option>
            <Option value="30">Net 30 Days</Option>
          </Select>
        </div>
      </section>





      {/* No changes to these sections */}
      
      {/* Service Details Section */}
      <section className="mb-10">
        <Typography
          variant="h6"
          className="mb-4 text-lg font-medium"
          style={{ color: "#A05AFF" }}
        >
          Service Details
        </Typography>
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-3 gap-4 items-center p-4 bg-gray-50 shadow rounded-lg mb-4"
          >
            <Input
              label="Item Name"
              value={item.itemName}
              onChange={(e) =>
                handleItemChange(item.id, "itemName", e.target.value)
              }
              required
            />
            <Input
              label="Description"
              value={item.description}
              onChange={(e) =>
                handleItemChange(item.id, "description", e.target.value)
              }
              required
            />
            <Input
              label="HSN"
              value={item.hsn}
              onChange={(e) =>
                handleItemChange(item.id, "hsn", e.target.value)
              }
              required
            />
            <Input
              label="Qty"
              type="number"
              value={item.qty}
              onChange={(e) =>
                handleItemChange(item.id, "qty", e.target.value)
              }
              required
            />
            <Input
              label="Price"
              type="number"
              value={item.price}
              onChange={(e) =>
                handleItemChange(item.id, "price", e.target.value)
              }
              required
            />
            <Input
              label="CGST%"
              type="number"
              value={item.cgst}
              readOnly
            />
            <Input
              label="SGST%"
              type="number"
              value={item.sgst}
              readOnly
            />
            <Input
              label="IGST%"
              type="number"
              value={item.igst}
              readOnly
            />
            <Input
              label="Amount"
              value={item.total.toFixed(2)}
              readOnly
            />
            <IconButton
              onClick={() => handleDeleteItem(item.id)}
              style={{ color: "#FE9496" }}
            >
              <i className="fas fa-trash"></i>
            </IconButton>
          </div>
        ))}
        <Button
          style={{ backgroundColor: "#4BCBEB", color: "white" }}
          onClick={handleAddItem}
          className="mt-4"
          fullWidth
        >
          + Add New Item
        </Button>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          style={{ backgroundColor: "#FE9496" }}
          onClick={() => setHideForm(true)}
        >
          Discard
        </Button>
        <div className="flex gap-6">
          <Button
            style={{ backgroundColor: "#1BCFB4" }}
            onClick={() => handleSubmit("Draft")}
          >
            Save as Draft
          </Button>
          <Button
            style={{ backgroundColor: "#4BCBEB" }}
            onClick={() => handleSubmit("Pending")}
          >
            Save & Send
          </Button>
        </div>
      </div>
    </div>
  );
}
