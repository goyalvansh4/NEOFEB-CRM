import { useState, useEffect } from "react";
import { toast, Toaster } from 'react-hot-toast';
import GlobalAxios from '../../../Global/GlobalAxios';
import { CgSpinner } from "react-icons/cg";
import {
  Button,
  Input,
  Select,
  Option,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export default function AddInvoice({ length, setHideForm }) {
  const [invoiceStatus, setInvoiceStatus] = useState([]);
  const [formValues, setFormValues] = useState({
    invoice_number: "",
    companyBill_id: "",
    client_id: "",
    invoice_date: "",
    payment_terms: "",
    items: [],
    totalAmount: 0,
    invoiceStatus: "",
  });

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [clientDetails, setClientDetails] = useState({
    id: '',
    name: '',
    email: '',
    address: '',
    state: '',
    country: '',
    city: '',
    pincode: '',
    gstNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [HSN, setHSN] = useState([]);
  const [hsnCode, setHsnCode] = useState({
    hsn: "",
    percent: ""
  });
  const [selectedHSN, setSelectedHSN] = useState({
    hsn: "",
  });
  const [showMsg, setShowMsg] = useState({
    show: false,
    msg: "",
  });

  useEffect(() => {

    const fetchCompanies = async () => {
      try {
        const response = await GlobalAxios.get("/companyBill");
        setCompanies(response.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchClients = async () => {
      const response = await GlobalAxios.get("/client");
      console.log(response.data);
      setClient(response.data.data);
    }

    const fetchHSN = async () => {
      const response = await GlobalAxios.get("/hsn");
      setHSN(response.data.data);
    }
    fetchClients();
    fetchHSN();
    fetchCompanies();
  }, [hsnCode]);

  useEffect(() => {
    const fetchInvoiceStatus = async () => {
      try {
        const response = await GlobalAxios.get("/invoiceStatus");
        if (response.data.status === 'success') {
          setInvoiceStatus(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchInvoiceStatus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'invoice_date') {
      if (!value) {
        setFormValues({
          ...formValues,
          [name]: new Date().toISOString().split('T')[0],
        });
      }
      else {
        setFormValues({
          ...formValues,
          [name]: value,
        });
      }
    }
    else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleCompanyChange = (companyId) => {
    const selected = companies.find((company) => company._id === companyId);
    if (selected) {
      setSelectedCompany(selected);
      setFormValues({
        ...formValues,
        companyBill_id: selected._id,
      });
    }
  };


  const handleClientChange = (e) => {
    const selectedClient = client.filter((c) => c.name === e);
    if (selectedClient) {
      setClientDetails({
        id: selectedClient[0]._id,
        name: selectedClient[0].name,
        email: selectedClient[0].email,
        address: selectedClient[0].address,
        state: selectedClient[0].state,
        country: selectedClient[0].country,
        city: selectedClient[0].city,
        pincode: selectedClient[0].pincode,
        gstNumber: selectedClient[0].gst_number || "",
      });
      setFormValues({
        ...formValues,
        client_id: selectedClient[0]._id,
      });
    }
  };

  const handleHsnChange = (hsnId, itemId) => {
    const selected = HSN.find((hsn) => hsn._id === hsnId);
    if (selected) {
      setSelectedHSN({ hsn: selected.hsn });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, hsn: hsnId } : item
        )
      );
    }
  };



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleHsnSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await GlobalAxios.post("/hsn", hsnCode);
      if (response.data.status === 'success') {
        setBtnLoading(false);
        toast.success(response.data.msg);
        setHSN([...HSN, response.data.data]);
        setOpen(false);
      }
    } catch (error) {
      setBtnLoading(false);
      console.log(error);
    }
  }

  const calculateItemTotal = (item) => {
    const selectedHSN = HSN.find((hsn) => hsn._id === item.hsn);
    if(!selectedCompany){
      setShowMsg({
        show: true,
        msg: "Please select Company details",
      });
    }
    else if(!clientDetails.id){
      setShowMsg({
        show: true,
        msg: "Please select Client details",
      });
    }
    else if (!selectedHSN){
      setShowMsg({
        show: true,
        msg: "Please select HSN details",
      });
    }
    else{
      setShowMsg({
        show: false,
        msg: "",
      });
    }

    console.log(selectedHSN);
    const hsnPercent = selectedHSN ? parseFloat(selectedHSN.percent) : 0;

    let cgst = 0,
      sgst = 0,
      igst = 0;

    // Check if client and company states are the same
    if (String(clientDetails.state) === String(selectedCompany.state)) {
      cgst = parseInt(hsnPercent) / 2; // Half to CGST
      sgst = parseInt(hsnPercent) / 2; // Half to SGST
    } else {
      igst = parseInt(hsnPercent); // Full percent to IGST
    }

    const total = Math.round(item.qty * item.price * (1 + (cgst + sgst + igst) / 100));

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
    return Math.round(items.reduce((sum, item) => sum + item.total, 0));
  };

  const handleSubmit = async () => {
    const total = calculateGrandTotal();
    if (formValues.invoice_date === "") {
      formValues.invoice_date = new Date().toISOString().split('T')[0];
    }
    formValues.invoice_number = length + 1;
    formValues.totalAmount = total;
    const invoiceData = {
      ...formValues,
      items: updateAllItemTotals(items),
    };
    setLoading(true);
    try {
      const response = await GlobalAxios.post("/invoice", invoiceData);
      if (response.data.status === "success") {
        setLoading(false);
        toast.success(response.data.msg);
        setFormValues({
          invoice_number: "",
          companyBill_id: "",
          client_id: "",
          invoice_date: "",
          payment_terms: "",
          items: [],
          totalAmount: 0,
          invoiceStatus: "",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setItems([]);
    setHideForm(true);
  };

  return (
    <>
      <div className="p-6 bg-white rounded shadow-lg">
        <Toaster />
        <Typography
          variant="h1"
          style={{ color: "#9E58FF" }}
          className="mb-6 text-2xl font-bold"
        >
          Create Invoice
        </Typography>

        {/* Bill From and Bill To Sections */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <Input
            label="Invoice No"
            name="invoice_number"
            type="number"
            value={(length) ? length + 1 : 1}
            required
            readOnly
          />
          <Input
            label="Invoice Date"
            name="invoice_date"
            type="date"
            value={formValues.invoice_date || new Date().toISOString().split('T')[0]} // Default to today's date
            onChange={(e) => {
              handleInputChange(e)
            }}
            required
          />
          <Select
            label="Payment Terms"
            name="payment_terms"
            color="lightBlue"
            value={formValues.payment_terms}
            onChange={(value) => setFormValues({ ...formValues, payment_terms: value })}
            required
          >
            <Option value="1">Net 1 Day</Option>
            <Option value="7">Net 7 Days</Option>
            <Option value="14">Net 14 Days</Option>
            <Option value="30">Net 30 Days</Option>
          </Select>

        </div>


        {/* Bill From Section */}
        <section className="mb-10">
          <Typography
            variant="h6"
            style={{ color: "#9E58FF", marginTop: "30px" }}
            className="mb-4 text-lg font-medium"
          >
            Bill From
          </Typography>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <Select
              label="Select Company"
              name="companyBill_id"
              color="lightBlue"
              onChange={(e) => handleCompanyChange(e)}
              required
            >
              {companies.map((company) => (
                <Option key={company._id} value={company._id}>
                  {company.name}
                </Option>
              ))}
            </Select>
          </div>
          {selectedCompany && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              <Input label="Company Email" value={selectedCompany.email} readOnly />
              <Input label="Mobile Number" value={selectedCompany.mobile} readOnly />
              <Input label="Address" value={selectedCompany.address} readOnly />
              <Input label="City" value={selectedCompany.city} readOnly />
              <Input label="Country" value={selectedCompany.country} readOnly />
            </div>
          )}
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
              name="Client_name"
              color="lightBlue"
              value={clientDetails.client_name}
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
              name="client_email"
              type="email"
              value={clientDetails.email}
              onChange={handleClientChange}
              required
            />
            <Input
              label="Client GST Number"
              name="clientStreet"
              value={clientDetails.gstNumber}
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
              label="Client's State"
              name="clientPost"
              value={clientDetails.state}
              onChange={handleClientChange}
              required
            />
            <Input
              label="Client's Country"
              name="clientCountry"
              value={clientDetails.country ? clientDetails.country : "India"}
              onChange={handleClientChange}
              required
            />
          </div>

        </section>





        {/* No changes to these sections */}

        {/* Service Details Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center">
          <Typography
            variant="h6"
            className="mb-4 text-lg font-medium"
            style={{ color: "#A05AFF" }}
          >
            Service Details
          </Typography>
          <button
                  onClick={handleClickOpen}
                  disabled={btnloading}
                  className="rounded-xl text-[12px] py-2 px-3 bg-green-500 text-white">
                  {btnloading ? <CgSpinner /> : "Add HSN"}
          </button>
          </div>
          {showMsg.show && <p className="text-red-500">{showMsg.msg}</p>}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center p-4 bg-gray-50 shadow rounded-lg mb-4"
            >
              <div className="w-[20%] flex flex-col gap-2">
              <label className="text-[12px] font-medium" style={{ color: "#A05AFF" }}>
                Item Name
              </label>
              <input
                type="text"
                className="w-[full] border border-gray-500 p-2 rounded-lg"
                value={item.itemName}
                onChange={(e) =>
                  handleItemChange(item.id, "itemName", e.target.value)
                }
                required
              />
              </div>
              <div className="w-[15%] flex flex-col gap-2">
                <label className="text-[12px] font-medium" style={{ color: "#A05AFF" }}>
                  HSN
                </label>
                <select
                  className="w-[full] border border-gray-500 p-2 rounded-lg"
                  name="hsn"
                  value={item.hsn}
                  onChange={(e) => handleHsnChange(e.target.value, item.id)}
                  required
                >
                  <option value="">Select HSN</option>
                  {HSN.map((hsn) => (
                    <option key={hsn._id} value={hsn._id}>
                      {hsn.hsn} - {hsn.percent}%
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-[8%] flex flex-col gap-2">
              <label className="text-[12px] font-medium" style={{ color: "#A05AFF" }}>
                Qty
              </label>
              <input
                type="number"
                className="w-full border border-gray-500 p-2 rounded-lg"
                value={item.qty}
                onChange={(e) =>
                  handleItemChange(item.id, "qty", e.target.value)
                }
                required
              />
              </div>
              <div className="w-[12%] flex flex-col gap-2">
              <label className="text-[12px] font-medium" style={{ color: "#A05AFF" }}>
                Price
              </label>
              <input
                type="number"
                className="w-full border border-gray-500 p-2 rounded-lg"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(item.id, "price", e.target.value)
                }
                required
              />
              </div>
              <div className="w-[5%] flex flex-col gap-2">
              <label className="text-[12px] font-medium" style={{ color: "#A05AFF" }}>
              CGST%
              </label>
              <input
                type="number"
                className="w-full border border-gray-500 p-2 rounded-lg"
                value={item.cgst}
                readOnly
              />
              </div>
              <div className="w-[5%]  flex flex-col gap-2">
              <label className="text-[12px] font-medium" style={{ color: "#A05AFF" }}>
              SGST%
              </label>
              <input
                type="number"
                className="w-full border border-gray-500 p-2 rounded-lg"
                value={item.sgst}
                readOnly
              />
              </div>
              <div className="w-[5%] flex flex-col gap-2">
              <label className="text-[12px] font-medium" style={{ color: "#A05AFF" }}>
              IGST%
              </label>
              <input
                type="number"
                className="w-full border border-gray-500 p-2 rounded-lg"
                value={item.igst}
                readOnly
              />
              </div>
              <div className="w-[15%]  flex flex-col gap-2">
              <label className="text-[12px] font-medium" style={{ color: "#A05AFF" }}>
                Amount
              </label>
              <input
                type="number"
                className="w-full border border-gray-500 p-2 rounded-lg"
                value={Math.round(item.total)}
                readOnly
              />
              </div>
              <div className="w-[5%] flex flex-col items-center gap-4">
                <div></div>
              <IconButton
                onClick={() => handleDeleteItem(item.id)}
                style={{ color: "#FE9496", backgroundColor: "#FEE2E2", padding: "8px" }}
              >
                <i className="fas fa-trash"></i>
              </IconButton>
              </div>
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

        {/* Total Section */}
        <section className="mb-10 flex flex-col gap-4">
          <label className="text-lg font-medium" style={{ color: "#A05AFF" }}>
            Status</label>
          <select
            value={formValues.invoiceStatus}
            onChange={(e) => setFormValues({ ...formValues, invoiceStatus: e.target.value })}
            className="border border-gray-500 p-2 rounded-lg">
            <option value="">Select Status</option>
            {invoiceStatus.map((status) => {
              return <option key={status._id} value={status._id}>{status.invoiceStatus}</option>
            })}
          </select>
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
            {loading ? <CgSpinner className="text-2xl text-puple-800 animate-spin" /> :
              <Button
                style={{ backgroundColor: "#4BCBEB" }}
                onClick={() => handleSubmit()}
              >
                Save & Send
              </Button>
            }
          </div>
        </div>
      </div>

      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle style={{ color: '#A05AFF', fontWeight: 'bold', textAlign: 'center' }}>Add HSN</DialogTitle>
          <DialogContent>
            <form
              onSubmit={handleHsnSubmit}
              className="flex flex-col gap-4 p-4"
              style={{ backgroundColor: '#F9F9FF', borderRadius: '12px' }}
            >
              <input
                className="rounded-xl border py-2 px-3"
                style={{ borderColor: '#1BCFB4', outline: 'none', fontSize: '16px' }}
                type="text"
                name="hsn"
                onChange={(e) => {
                  setHsnCode((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
                placeholder="Enter HSN Code"
                required
              />
              <select
                className="rounded-xl border py-2 px-3"
                style={{ borderColor: '#4BCBEB', fontSize: '16px' }}
                onChange={(e) => {
                  setHsnCode((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
                name="percent"
                required
              >
                <option value="">Select the percent%</option>
                <option value="0">0%</option>
                <option value="3">3%</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
              <button
                type="submit"
                className="rounded-xl py-2 px-3 text-white"
                style={{ backgroundColor: '#9E58FF', fontSize: '18px', fontWeight: 'bold' }}
              >
                Add HSN
              </button>
            </form>

            <ul className="mt-6" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {HSN.map((hsn) => (
                <div
                  className="flex justify-between items-center border-b py-2 px-3 rounded-lg"
                  style={{ backgroundColor: '#EFEFFF', borderColor: '#A05AFF' }}
                  key={hsn._id}
                >
                  <li className="text-black font-medium" style={{ fontSize: '16px' }}>
                    {hsn.hsn} - {hsn.percent}%
                  </li>
                  <button
                    className="rounded-xl text-white py-1 px-3"
                    style={{ backgroundColor: '#FE9496', fontSize: '14px', fontWeight: 'bold' }}
                    onClick={() => {
                      setBtnLoading(true);
                      GlobalAxios.delete(`/hsn/${hsn._id}`)
                        .then((response) => {
                          if (response.data.status === 'success') {
                            setBtnLoading(false);
                            setHSN((prev) => prev.filter((item) => item._id !== hsn._id));
                            toast.success(response.data.msg);
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </ul>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button
              onClick={handleClose}
              style={{ color: '#A05AFF', fontWeight: 'bold' }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </>
  );
}
