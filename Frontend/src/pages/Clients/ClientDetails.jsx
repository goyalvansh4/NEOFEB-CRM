import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaTrash, FaDownload, FaSpinner } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { Tabs, Tab, Box } from "@mui/material";
import GlobalAxios from "../../../Global/GlobalAxios";

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Fetch client details using @tanstack/query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["clientDetails", id],
    queryFn: async () => {
      const response = await GlobalAxios.get(`/client/${id}`);
      return response.data.data;
    },
    onSuccess: (data) => setClientDetails(data), // Set clientDetails on successful fetch
  });

  const { client, invoices } = data || {};

  const handleEditModalOpen = () => {
    setClientDetails(client); // Pre-fill fields with the current client data
    setEditModalOpen(!editModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (id) => {
    try {
      await GlobalAxios.put(`/client/${id}`, clientDetails);
      toast.success("Client details updated successfully!");
      setEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update client details.");
    }
  };

  const handleDeleteClient = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalOpen = () => setDeleteModalOpen(!deleteModalOpen);

  const handleDelete = async () => {
    try {
      await GlobalAxios.delete(`/client/${id}`);
      toast.success("Client deleted successfully!");
      setDeleteModalOpen(false);
      navigate("/dashboard/clients");
    } catch (error) {
      toast.error("Failed to delete client.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-purple-600 text-5xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Typography color="red" className="text-center text-xl">
          Error loading client data. Please try again.
        </Typography>
      </div>
    );
  }

  const getStatusBadgeColor = (status) => {
    console.log(status === "active" ? "bg-green-500" : "bg-red-500");
    return status === "active" ? "bg-green-500" : "bg-red-500";
  }
  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-50">
      {/* Profile Card */}
      <Card className="shadow-xl rounded-lg">
        <CardBody className="p-6 flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
          <div>
            <Typography variant="h4" color="purple" className="font-bold">
              {client?.name}
            </Typography>
            <Typography variant="h6" color="gray">
              {client?.email}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              {client?.company_name}
            </Typography>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="gradient"
              color="green"
              onClick={handleEditModalOpen}
              className="flex items-center space-x-2"
            >
              <FaEdit />
              <span>Edit</span>
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={handleDeleteClient}
              className="flex items-center space-x-2"
            >
              <FaTrash />
              <span>Delete</span>
            </Button>
            <Button
              variant="outlined"
              color="gray"
              onClick={() => navigate("/dashboard/clients")}
              className="flex items-center space-x-2"
            >
              Back
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Tab System */}
      <div className="bg-white shadow-xl rounded-lg p-6">
        <Box>
          {/* Tabs Header */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="client details tabs"
          >
            <Tab label="Overview" />
            <Tab label="Notes" />
            <Tab label="Invoice" />
            <Tab label="Quotes" />
          </Tabs>

          {/* Tab Content */}
          <Box sx={{ mt: 4 }}>
            {activeTab === 0 && (
              <Box>
                <Typography variant="h6" color="primary">
                  Overview
                </Typography>
                <Box className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Box>
                    <Typography variant="subtitle1" color="secondary">
                      Address
                    </Typography>
                    <Typography>
                      {client?.address}, {client?.city}, {client?.state}, {client?.country}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" color="secondary">
                      Bank Details
                    </Typography>
                    <Typography>Bank Name: {client?.bank_name}</Typography>
                    <Typography>Account Number: {client?.bank_account}</Typography>
                    <Typography>IFSC Code: {client?.ifsc_code}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" color="secondary">
                      PAN / GST / CIN
                    </Typography>
                    <Typography>PAN: {client?.pan}</Typography>
                    <Typography>GST: {client?.gst_number}</Typography>
                    <Typography>CIN: {client?.cin}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" color="secondary">
                      Status
                    </Typography>
                    {/* Status Badge */}
                    <a
                      className={`text-sm text-white ${getStatusBadgeColor(client.status)} px-2 py-1 rounded-md`}
                    >
                      {(client?.status).toUpperCase()}
                    </a>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography variant="h6" color="primary">
                  Notes
                </Typography>
                {client?.notes?.length > 0 ? (
                  <ul>
                    {client.notes.map((note, index) => (
                      <li key={index}>
                        <Typography>{note}</Typography>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography>No notes available.</Typography>
                )}
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                {invoices?.length > 0 ? (
          <div className="space-y-6">
            {invoices.map((invoice) => (
              <div
                key={invoice._id}
                className="bg-white shadow-md rounded-lg border border-gray-200 p-6"
              >
                {/* Invoice Header */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-blue-500">
                      Invoice #{invoice.invoice_number}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Invoice Date:{" "}
                      {new Date(invoice.invoice_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Payment Terms: {invoice.payment_terms} days
                    </p>
                  </div>
                  <div>
                    {invoice.invoiceStatus === "Paid" ? (
                      <span className="text-green-800 font-medium px-2 py-1 rounded-md">{invoice.invoiceStatus}</span>
                    ) : (
                      <span className="text-red-500 font-medium px-2 py-1 rounded-md">{invoice.invoiceStatus}</span>
                    )}
                  </div>
                </div>

                {/* Invoice Items */}
                <div>
                  <h4 className="text-md font-bold text-gray-700 mb-2">Items:</h4>
                  <ul className="space-y-4">
                    {invoice.items.map((item) => (
                      <li
                        key={item.id}
                        className="p-4 bg-gray-100 rounded-md shadow-sm"
                      >
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-800">
                            {item.itemName} - {item.description}
                          </span>
                          <span className="text-gray-600">₹{item.total}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Qty: {item.qty}, Price: ₹{item.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          Taxes: CGST {item.cgst}%, SGST {item.sgst}%, IGST {item.igst}%
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total Amount */}
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-xl font-bold text-blue-600">
                    Total Amount: ₹{invoice.totalAmount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No invoices available.
          </p>
        )}
              </Box>
            )}


            {activeTab === 3 && (
              <Box>
                <Typography variant="h6" color="primary">
                  Quotes
                </Typography>
                {client?.quotes?.length > 0 ? (
                  <ul>
                    {client.quotes.map((quote, index) => (
                      <li key={index}>
                        <Typography>{quote}</Typography>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography>No quotes available.</Typography>
                )}
              </Box>
            )}
          </Box>
        </Box>

      </div>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} handler={handleEditModalOpen} size="lg">
        <DialogHeader>Edit Client Details</DialogHeader>
        <DialogBody divider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <div>
              <Input
                label="Name"
                name="name"
                value={clientDetails.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Input
                label="Email"
                name="email"
                type="email"
                value={clientDetails.email || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Input
                label="Company Name"
                name="company_name"
                value={clientDetails.company_name || ""}
                onChange={handleInputChange}
              />
            </div>
            {/* Address Information */}
            <div>
              <Input
                label="Address"
                name="address"
                value={clientDetails.address || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                label="City"
                name="city"
                value={clientDetails.city || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                label="State"
                name="state"
                value={clientDetails.state || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                label="Country"
                name="country"
                value={clientDetails.country || ""}
                onChange={handleInputChange}
              />
            </div>
            {/* Bank Details */}
            <div>
              <Input
                label="Bank Name"
                name="bank_name"
                value={clientDetails.bank_name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                label="Account Number"
                name="bank_account"
                value={clientDetails.bank_account}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                label="IFSC Code"
                name="ifsc_code"
                value={clientDetails.ifsc_code}
                onChange={handleInputChange}
              />
            </div>
            {/* PAN, GST, CIN */}
            <div>
              <Input
                label="PAN"
                name="pan"
                value={clientDetails.pan || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                label="GST Number"
                name="gst_number"
                value={clientDetails.gst_number || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                label="CIN"
                name="cin"
                value={clientDetails.cin || ""}
                onChange={handleInputChange}
              />
            </div>
            {/* Status */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2">
                Status
              </Typography>
              <Select
                label="Select Status"
                name="status"
                value={clientDetails.status || ""}
                onChange={(value) =>
                  setClientDetails((prev) => ({ ...prev, status: value }))
                }
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="pending">Pending</Option>
              </Select>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleEditModalOpen}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={() => { handleSaveChanges(clientDetails._id) }}>
            Save Changes
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} handler={handleDeleteModalOpen}>
        <DialogHeader>Delete Client</DialogHeader>
        <DialogBody divider>
          <Typography>
            Are you sure you want to delete this client? This action cannot be
            undone.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleDeleteModalOpen}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="gradient" color="red">
            Delete
          </Button>
        </DialogFooter>
      </Dialog>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default ClientDetails;