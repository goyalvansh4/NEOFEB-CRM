import { useState } from "react";
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
              total:
                (item.qty * item.price * (1 + (item.cgst + item.sgst + item.igst) / 100)) || 0,
            }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = (status) => {
    const grandTotal = items.reduce((sum, item) => sum + item.total, 0);
    const invoiceData = {
      ...formValues,
      id: Date.now(),
      items,
      grandTotal,
      status,
    };
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

      {/* Bill From Section */}
      <section className="mb-10">
        <Typography
          variant="h6"
          style={{ color: "#9E58FF" }}
          className="mb-4 text-lg font-medium"
        >
          Bill From
        </Typography>
        <Input
          label="Street Address"
          name="street"
          value={formValues.street}
          onChange={handleInputChange}
          required
        />
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Input
            label="City"
            name="city"
            value={formValues.city}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Post Code"
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
        <Input
          label="Client's Name"
          name="clientName"
          value={formValues.clientName}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Client's Email"
          name="clientEmail"
          type="email"
          value={formValues.clientEmail}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Client's Street Address"
          name="clientStreet"
          value={formValues.clientStreet}
          onChange={handleInputChange}
          required
        />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Input
            label="Client's City"
            name="clientCity"
            value={formValues.clientCity}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Client's Post Code"
            name="clientPost"
            value={formValues.clientPost}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Client's Country"
            name="clientCountry"
            value={formValues.clientCountry}
            onChange={handleInputChange}
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
              onChange={(e) =>
                handleItemChange(item.id, "cgst", e.target.value)
              }
              required
            />
            <Input
              label="SGST%"
              type="number"
              value={item.sgst}
              onChange={(e) =>
                handleItemChange(item.id, "sgst", e.target.value)
              }
              required
            />
            <Input
              label="IGST%"
              type="number"
              value={item.igst}
              onChange={(e) =>
                handleItemChange(item.id, "igst", e.target.value)
              }
              required
            />
            <Input
              label="Amount"
              value={item.total.toFixed(2)}
              disabled
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