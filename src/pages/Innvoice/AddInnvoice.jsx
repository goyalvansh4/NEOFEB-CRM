import { useState } from "react";
import { Button, Input, Select, Option, IconButton, Typography } from "@material-tailwind/react";

export default function AddInvoice({ showForm, setShowForm }) {
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
        qty: 0,
        price: 0,
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
              total: field === "qty" || field === "price" ? item.qty * item.price : item.total,
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
    props.formStatus();
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <Typography variant="h1" className="mb-6">
        Create Invoice
      </Typography>
      <div className="grid grid-cols-1 gap-6">
        <section className="Bill-from">
          <Typography variant="h6" className="mb-2">
            Bill From
          </Typography>
          <Input label="Street Address" name="street" value={formValues.street} onChange={handleInputChange} required />
          <div className="grid grid-cols-3 gap-4">
            <Input label="City" name="city" value={formValues.city} onChange={handleInputChange} required />
            <Input label="Post Code" name="post" value={formValues.post} onChange={handleInputChange} required />
            <Input label="Country" name="country" value={formValues.country} onChange={handleInputChange} required />
          </div>
        </section>
        <section className="Bill-To">
          <Typography variant="h6" className="mb-2">
            Bill To
          </Typography>
          <Input label="Client's Name" name="clientName" value={formValues.clientName} onChange={handleInputChange} required />
          <Input label="Client's Email" name="clientEmail" type="email" value={formValues.clientEmail} onChange={handleInputChange} required />
          <Input label="Client's Street Address" name="clientStreet" value={formValues.clientStreet} onChange={handleInputChange} required />
          <div className="grid grid-cols-3 gap-4">
            <Input label="Client's City" name="clientCity" value={formValues.clientCity} onChange={handleInputChange} required />
            <Input label="Client's Post Code" name="clientPost" value={formValues.clientPost} onChange={handleInputChange} required />
            <Input label="Client's Country" name="clientCountry" value={formValues.clientCountry} onChange={handleInputChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input label="Invoice Date" name="date" type="date" value={formValues.date} onChange={handleInputChange} required />
            <Select label="Payment Terms" name="payment" value={formValues.payment} onChange={(e) => setFormValues({ ...formValues, payment: e })} required>
              <Option value="1">Net 1 Day</Option>
              <Option value="7">Net 7 Days</Option>
              <Option value="14">Net 14 Days</Option>
              <Option value="30">Net 30 Days</Option>
            </Select>
          </div>
          <Input label="Description" name="description" value={formValues.description} onChange={handleInputChange} placeholder="e.g. Graphic Design Services" required />
        </section>
        <section className="itemList">
          <Typography variant="h6" className="mb-2">
            Item List
          </Typography>
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-5 gap-4 items-center">
              <Input label="Item Name" value={item.itemName} onChange={(e) => handleItemChange(item.id, "itemName", e.target.value)} required />
              <Input label="Qty" type="number" value={item.qty} onChange={(e) => handleItemChange(item.id, "qty", e.target.value)} required />
              <Input label="Price" type="number" value={item.price} onChange={(e) => handleItemChange(item.id, "price", e.target.value)} required />
              <Input label="Total" value={item.qty * item.price} disabled />
              <IconButton onClick={() => handleDeleteItem(item.id)}>
                <i className="fas fa-trash"></i>
              </IconButton>
            </div>
          ))}
          <Button color="blue" onClick={handleAddItem} className="mt-4">
            + Add New Item
          </Button>
        </section>
        <div className="flex justify-between mt-6">
          <Button color="red" onClick={()=>setShowForm(true)}>
            Discard
          </Button>
          <div className="flex gap-4">
            <Button color="blue-gray" onClick={() => handleSubmit("Draft")}>
              Save as Draft
            </Button>
            <Button color="blue" onClick={() => handleSubmit("Pending")}>
              Save & Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}