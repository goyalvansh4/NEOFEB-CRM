import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Button, Input, Card, CardBody, Typography, Tooltip } from "@material-tailwind/react";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdEdit, MdDelete } from "react-icons/md";
import GlobalAxios from "../../../Global/GlobalAxios";
import { useNavigate } from "react-router-dom";

const addLead = async (leadData) => {
  const response = await GlobalAxios.post("/leads", leadData);
  return response.data;
};

export function AddLead() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [sendStatus, setSendStatus] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingStatusId, setEditingStatusId] = useState(null);
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    leadName: "",
    company: "",
    email: "",
    phone: "",
    leadSource: "",
  });

  // Fetch statuses using useQuery (updated for React Query v5)
  const { data: statusData, isLoading: isFetchingStatuses, refetch } = useQuery({
    queryKey: ["leadStatuses"],
    queryFn: async () => {
      const response = await GlobalAxios.get("/lead-statuses");
      return response.data.data;
    },
  });

  // Mutation to add lead
  const leadMutation = useMutation({
    mutationFn: addLead,
    onSuccess: () => {
      queryClient.invalidateQueries(["leadsData"]);
      setFormData({ leadName: "", company: "", email: "", phone: "", leadSource: "" });
    },
  });

  // Mutation to manage statuses
  const statusMutation = useMutation({
    mutationFn: async (status) => {
      const url = isEditing ? `/lead-statuses/${editingStatusId}` : "/lead-statuses";
      return isEditing
        ? await GlobalAxios.put(url, status)
        : await GlobalAxios.post(url, status);
    },
    onSuccess: () => {
      refetch(); // Refetch statuses
      setShowModal(false);
      setIsEditing(false);
      setEditingStatusId(null);
      setSendStatus({}); // Reset status form
    },
  });

  const deleteStatus = async (id) => {
    if (window.confirm("This action is not reversible. Are you sure you want to delete?")) {
      await GlobalAxios.delete(`/lead-statuses/${id}`);
      refetch();
    }
  };

  // Handle input change for lead form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle status form input change
  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setSendStatus({ ...sendStatus, [name]: value });
  };

  // Handle lead form submission
  const handleLeadSubmit = (e) => {
    e.preventDefault();
    leadMutation.mutate(formData);
  };

  // Handle status form submission
  const handleStatusSubmit = (e) => {
    e.preventDefault();
    statusMutation.mutate(sendStatus);
  };

  // Open modal to manage status
  const handleModal = () => setShowModal(true);

  // Enter edit mode with selected status
  const handleEditStatus = (statusItem) => {
    setSendStatus({ name: statusItem.name, description: statusItem.description });
    setIsEditing(true);
    setEditingStatusId(statusItem.id);
    setShowModal(true);
  };

  const handleNavigate = () => {
    navigate("add-source");
  }

  return (
    <>
      <div className="flex justify-end gap-2 px-5">
        <button>
          <MdOutlineFileDownload size={20} color="#1BCFB4" />
        </button>
        <button
          onClick={handleModal}
          className="bg-[#1BCFB4] text-[12px] text-white py-1 px-2 rounded-md"
        >
          Manage Status
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="w-[400px] p-5 bg-white rounded-lg shadow-md space-y-4">
            <Typography variant="h6" className="text-gray-800">
              {isEditing ? "Edit Status" : "Add Status"}
            </Typography>
            <form onSubmit={handleStatusSubmit} className="space-y-4">
              <label className="block text-gray-700">Status Name *</label>
              <Input
                name="name"
                placeholder="Status Name *"
                required
                value={sendStatus.name || ""}
                onChange={handleStatusChange}
                className="p-2 rounded-sm border border-gray-300"
              />
              <label className="block text-gray-700">
                Description <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                name="description"
                placeholder="Description"
                value={sendStatus.description || ""}
                onChange={handleStatusChange}
                className="p-2 rounded-sm border border-gray-300 text-sm text-black"
                rows="3"
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-[#1BCFB4] text-white text-sm py-1 px-3 rounded-md"
                  disabled={statusMutation.isLoading}
                >
                  {isEditing ? "Update" : "Add"}
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingStatusId(null);
                    setSendStatus({});
                    setShowModal(false); // Close modal on cancel
                  }}
                  className="bg-red-500 text-white text-sm py-1 px-3 rounded-md"
                >
                  Cancel
                </Button>
              </div>
            </form>

            {isFetchingStatuses ? (
              <p className="text-center text-gray-500">Loading statuses...</p>
            ) : (
              <div className="space-y-2">
                {statusData?.map((status) => (
                  <div key={status.id} className="flex items-center justify-between p-2 border-b">
                    <Tooltip content={status.description}>
                      <p className="uppercase text-gray-700">{status.name}</p>
                    </Tooltip>
                    <div className="flex items-center gap-2">
                      {status.is_deletable ? (
                        <>
                          <MdEdit
                            onClick={() => handleEditStatus(status)}
                            className="text-blue-500 cursor-pointer"
                          />
                          <MdDelete
                            onClick={() => deleteStatus(status.id)}
                            className="text-red-500 cursor-pointer"
                          />
                        </>
                      ) : (
                        <p className="text-xs text-gray-500">Not Changeable</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Card className="shadow-lg rounded-lg my-10 max-w-5xl mx-auto">
        <CardBody>
          <Typography variant="h5" className="mb-4 text-gray-800">
            Add New Lead
          </Typography>
          <form onSubmit={handleLeadSubmit}>
            <div className="mb-4">
              <Input
                label="Lead Name *"
                name="leadName"
                value={formData.leadName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <button onClick={handleNavigate} className="px-2 py-1 text-[12px] bg-[#FE9496] text-white mb-2 rounded-lg">Add Source</button>
              <Input
                label="Lead Source"
                name="leadSource"
                value={formData.leadSource}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-[#FE9496] text-white text-sm py-2 px-4 rounded-md"
              ripple={true}
              disabled={leadMutation.isLoading}
            >
              {leadMutation.isLoading ? "Adding..." : "Add Lead"}
            </Button>
          </form>
          {leadMutation.isError && <p className="text-red-500 mt-4">Error adding lead.</p>}
          {leadMutation.isSuccess && <p className="text-green-500 mt-4">Lead added successfully!</p>}
        </CardBody>
      </Card>
    </>
  );
}

export default AddLead;
