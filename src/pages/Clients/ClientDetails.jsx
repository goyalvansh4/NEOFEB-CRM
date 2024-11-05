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
} from "@material-tailwind/react";
import GlobalAxios from "../../../Global/GlobalAxios";

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch client details using @tanstack/query
  const { data: client, isLoading, isError } = useQuery({
    queryKey: ["clientDetails", id],
    queryFn: async () => {
      // const response = await GlobalAxios.get(`/clients/${id}`);
      const response = await axios.get(`https://66d7e6d837b1cadd80529ccf.mockapi.io/admin/api/v1/clients/${id}`);
      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-primary text-4xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-gray-500">Error loading client data.</div>
    );
  }

  // Utility function for badge color based on `added_from` status
  const getStatusBadgeColor = (status) => {
    return status === "manually" ? "bg-green-500" : "bg-blue-500";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Profile Card */}
      <Card className="shadow-lg rounded-lg mb-6">
        <CardBody className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center space-x-6">
            <img
              src="https://via.placeholder.com/100"
              alt="Client Profile"
              className="w-24 h-24 rounded-full border border-gray-200 shadow-md"
            />
            <div>
              <Typography variant="h5" color="purple">
                {client?.name}
              </Typography>
              <Typography variant="subtitle1" color="gray">
                {client?.email}
              </Typography>
              <Typography variant="subtitle2" color="gray">
                {client?.company_name}
              </Typography>
            </div>
          </div>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <button
              className="bg-blue-500 text-white p-3 rounded-lg shadow hover:bg-blue-600"
              onClick={() => toast.info("Download clicked")}
            >
              <FaDownload size={18} />
            </button>
            <button
              className="bg-green-500 text-white p-3 rounded-lg shadow hover:bg-green-600"
              onClick={() => toast.success("Edit clicked")}
            >
              <FaEdit size={18} />
            </button>
            <button
              className="bg-red-500 text-white p-3 rounded-lg shadow hover:bg-red-600"
              onClick={() => toast.error("Delete clicked")}
            >
              <FaTrash size={18} />
            </button>
            <button
              onClick={() => navigate("/dashboard/clients")}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300"
            >
              Back
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Tab System */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
          <TabsHeader className="flex gap-4 w-full">
            <Tab value="overview" className="flex items-center justify-center w-full">
              Overview
            </Tab>
            <Tab value="notes" className="flex items-center justify-center w-full">
              Notes
            </Tab>
            <Tab value="invoice" className="flex items-center justify-center w-full">
              Invoice
            </Tab>
            <Tab value="quotes" className="flex items-center justify-center w-full">
              Quotes
            </Tab>
          </TabsHeader>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Address Information */}
                <div>
                  <Typography variant="subtitle1" color="purple">
                    Address
                  </Typography>
                  <Typography variant="body2" className="text-gray-700">
                    {client?.address}, {client?.city}, {client?.state}, {client?.country}
                  </Typography>
                </div>

                {/* Bank Details */}
                <div>
                  <Typography variant="subtitle1" color="purple">
                    Bank Details
                  </Typography>
                  <Typography variant="body2" className="text-gray-700">
                    Bank Name: {client?.bank_name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-700">
                    Account Number: {client?.bank_account_number}
                  </Typography>
                  <Typography variant="body2" className="text-gray-700">
                    IFSC Code: {client?.bank_ifsc_code}
                  </Typography>
                </div>

                {/* Additional Info */}
                <div>
                  <Typography variant="subtitle1" color="purple">
                    PAN / GST / CIN
                  </Typography>
                  <Typography variant="body2" className="text-gray-700">
                    PAN: {client?.pan}
                  </Typography>
                  <Typography variant="body2" className="text-gray-700">
                    GST: {client?.gst_number}
                  </Typography>
                  <Typography variant="body2" className="text-gray-700">
                    CIN: {client?.cin}
                  </Typography>
                </div>

                {/* Status Badges */}
                <div>
                  <Typography variant="subtitle1" color="purple">
                    Status
                  </Typography>
                  <Badge color="green" className="text-sm">
                    {client?.status}
                  </Badge>
                  <Badge
                    className={`text-sm ml-2 ${getStatusBadgeColor(client?.added_from)}`}
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
              <div className="mt-4">
                <Typography variant="subtitle1" color="purple">
                  Notes
                </Typography>
                <Typography variant="body2" className="text-gray-700">
                  Dummy note content for the client. You can add or edit notes from here.
                </Typography>
              </div>
            )}

            {activeTab === "invoice" && (
              <div className="mt-4">
                <Typography variant="subtitle1" color="purple">
                  Invoice
                </Typography>
                <Typography variant="body2" className="text-gray-700">
                  This tab shows all the invoices related to the client. Dummy invoice data here for now.
                </Typography>
              </div>
            )}

            {activeTab === "quotes" && (
              <div className="mt-4">
                <Typography variant="subtitle1" color="purple">
                  Quotes
                </Typography>
                <Typography variant="body2" className="text-gray-700">
                  The client’s quotes will be displayed here. Currently showing dummy quote data.
                </Typography>
              </div>
            )}
          </div>
        </Tabs>
      </div>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default ClientDetails;