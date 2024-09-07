import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input, Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";

const addLead = async (leadData) => {
  const response = await axios.post(
    "https://66d7e6d837b1cadd80529ccf.mockapi.io/admin/api/v1/leads",
    leadData
  );
  return response.data;
};

export function AddLead() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    leadName: "",
    company: "",
    email: "",
    phone: "",
    leadSource: "",
  });

  const mutation = useMutation({
    mutationFn: addLead,
    onSuccess: () => {
      queryClient.invalidateQueries(["leadsData"]); // Invalidate the leads query to refresh data
      setFormData({ leadName: "", company: "", email: "", phone: "", leadSource: "" });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Card className="shadow-lg rounded-lg my-10 max-w-5xl mx-auto">
      <CardBody>
        <Typography variant="h5" className="mb-4">
          Add New Lead
        </Typography>
        <form onSubmit={handleSubmit}>
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
            className="bg-[#FE9496]"
            ripple={true}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Adding..." : "Add Lead"}
          </Button>
        </form>
        {mutation.isError && <p className="text-red-500 mt-4">Error adding lead.</p>}
        {mutation.isSuccess && <p className="text-green-500 mt-4">Lead added successfully!</p>}
      </CardBody>
    </Card>
  );
}

export default AddLead;
