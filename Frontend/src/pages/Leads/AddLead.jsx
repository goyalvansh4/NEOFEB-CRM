import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Button, Input, Card, CardBody, Typography, Tooltip } from "@material-tailwind/react";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdEdit, MdDelete } from "react-icons/md";
import GlobalAxios from "../../../Global/GlobalAxios";
import { useNavigate } from "react-router-dom";

const addLead = async (leadData) => {
  const response = await GlobalAxios.post("/lead", leadData);
  return response.data;
};

export function AddLead() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [sendStatus, setSendStatus] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingStatusId, setEditingStatusId] = useState(null);
  const navigate = useNavigate();
  const [sources, setSources] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [formData, setFormData] = useState({
    leadName: "",
    companyName: "",
    email: "",
    phone: "",
    source: "",
    sourceDetails: "",
    notes: "",
    moreAboutSource: "",
  });

  useEffect(() => {
    const fetchSources = async () => {
      const response = await GlobalAxios.get("/source");
      setSources(response.data.data);
    };
    fetchSources();
  }, []);


  useEffect(() => {
    const fetchStatus = async () => {
      const response = await GlobalAxios.get("/status");
      setStatuses(response.data.data);
    };
    fetchStatus();
  }, []);
    // Fetch statuses using useQuery (updated for React Query v5)
    const { data: statusData, isLoading: isFetchingStatuses, refetch } = useQuery({
      queryKey: ["leadStatuses"],
      queryFn: async () => {
        const response = await GlobalAxios.get("/status");
        return response.data.data;
      },
    });

     // Mutation to manage statuses
  const statusMutation = useMutation({
    mutationFn: async (status) => {
      const url = `/status`;
      return await GlobalAxios.post(url, status);
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
      await GlobalAxios.delete(`/status/${id}`);
      refetch();
    }
  };
  
  const leadMutation = useMutation({
    mutationFn: addLead,
    onSuccess: () => {
      queryClient.invalidateQueries(["leadsData"]);
      setFormData({ name: "", companyName: "", email: "", phone: "", source: "", notes: "", moreAboutSource: "" });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const { notes, ...requiredData } = formData;
    const payload = notes ? { ...requiredData, notes } : requiredData;
    leadMutation.mutate(payload);
  };

  // Handle status form input change
  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setSendStatus({ ...sendStatus, [name]: value });
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
          onClick={() => setShowModal(true)}
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
                label="Lead Name"
                name="leadName"
                value={formData.leadName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                label="Company Name"
                name="companyName"
                value={formData.companyName}
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
            <div className="mb-4 flex gap-2 items-center">
              <button
                onClick={() => navigate("add-source")}
                className="w-[20%] px-2 py-1 text-[12px] bg-[#FE9496] text-white mb-2 rounded-lg"
              >
                Add Source
              </button>
              <select
                name="source"
                value={formData.source_id}
                onChange={handleInputChange}
                className="p-2 rounded-md border border-gray-300 w-full"
                required
              >
                <option value="">Select Source</option>
                {sources?.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
              <input type="text" name="moreAboutSource" value={formData.moreAboutSource} onChange={handleInputChange} className="p-2 rounded-md border border-gray-300 w-full" placeholder="More About Source (Optional)" />
            </div>
            <div className="mb-4 flex flex-col gap-2 justify-center">
              <label className="text-gray-700">Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="p-2 rounded-md border border-gray-300 w-full"
                required
              >
                <option value="">Select Status</option>
                {statuses?.map((status) => (
                  <option key={status._id} value={status._id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <textarea
                className="border-2 px-2 py-1 w-full rounded-md"
                rows={5}
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any Notes (Optional)"
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