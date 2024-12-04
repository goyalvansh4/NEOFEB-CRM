import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaTrash, FaDownload, FaSpinner } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {
  Tabs,
  TabsHeader,
  Tab,
  Card,
  CardBody,
  Typography,
  Badge,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import GlobalAxios from "../../../Global/GlobalAxios";

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Fetch client details using @tanstack/query
  const { data: client, isLoading, isError } = useQuery({
    queryKey: ["clientDetails", id],
    queryFn: async () => {
      const response = await GlobalAxios.get(`/client/${id}`);
      return response.data.data;
    },
    onSuccess: (data) => setClientDetails(data), // Set clientDetails on successful fetch
  });

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

  const getStatusBadgeColor = (status) =>
    status === "manually" ? "bg-green-500" : "bg-blue-500";

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
              color="blue"
              onClick={() => toast.info("Download clicked")}
              className="flex items-center space-x-2"
            >
              <FaDownload />
              <span>Download</span>
            </Button>
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
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
          <TabsHeader className="flex gap-6">
            <Tab value="overview">Overview</Tab>
            <Tab value="notes">Notes</Tab>
            <Tab value="invoice">Invoice</Tab>
            <Tab value="quotes">Quotes</Tab>
          </TabsHeader>

          <div className="mt-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Typography variant="subtitle1" className="text-purple-600">
                    Address
                  </Typography>
                  <Typography className="text-gray-700">
                    {client?.address}, {client?.city}, {client?.state},{" "}
                    {client?.country}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle1" className="text-purple-600">
                    Bank Details
                  </Typography>
                  <Typography className="text-gray-700">
                    Bank Name: {client?.bank_name}
                  </Typography>
                  <Typography className="text-gray-700">
                    Account Number: {client?.bank_account}
                  </Typography>
                  <Typography className="text-gray-700">
                    IFSC Code: {client?.ifsc_code}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle1" className="text-purple-600">
                    PAN / GST / CIN
                  </Typography>
                  <Typography className="text-gray-700">
                    PAN: {client?.pan}
                  </Typography>
                  <Typography className="text-gray-700">
                    GST: {client?.gst_number}
                  </Typography>
                  <Typography className="text-gray-700">
                    CIN: {client?.cin}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle1" className="text-purple-600">
                    Status
                  </Typography>
                  <Badge color="green" className="text-sm">
                    {client?.status}
                  </Badge>
                  <Badge
                    className={`text-sm ml-2 ${getStatusBadgeColor(
                      client?.added_from
                    )}`}
                  >
                    {client?.added_from}
                  </Badge>
                  <div className="flex space-x-2 mt-2">
                    <Badge color="blue" className="text-xs">
                      Created: {client?.created_at_human}
                    </Badge>
                    <Badge color="indigo" className="text-xs">
                      Updated: {client?.updated_at_human}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <Typography>Notes content goes here</Typography>
            )}
            {activeTab === "invoice" && (
              <Typography>Invoice content goes here</Typography>
            )}
            {activeTab === "quotes" && (
              <Typography>Quotes content goes here</Typography>
            )}
          </div>
        </Tabs>
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
                <Option value="manually">Manually Added</Option>
              </Select>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleEditModalOpen}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={()=>{handleSaveChanges(clientDetails._id)}}>
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