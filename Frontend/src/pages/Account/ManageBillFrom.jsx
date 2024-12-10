import React, { useState, useEffect } from "react";
import { Typography, Button, Input, IconButton, Select } from "@material-tailwind/react";
import GlobalAxios from "../../../Global/GlobalAxios";

const ManageBillFrom = () => {
  const [states, setStates] = useState([
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
  ]);
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    mobile: "",
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });


  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await GlobalAxios.get("/companyBill");
        setCompanies(response.data.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddCompany = () => {
    setFormValues({ id: null, name: "", address: "", city: "", state: "", country: "" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditCompany = (company) => {
    setFormValues(company);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteCompany = async (id) => {
    try {
      await GlobalAxios.delete(`/companyBill/${id}`);
      setCompanies(companies.filter((company) => company.id !== id));
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await GlobalAxios.put(`/companyBill/${formValues._id}`, formValues);
        setCompanies((prev) =>
          prev.map((company) => (company.id === formValues.id ? formValues : company))
        );
      } else {
        const response = await GlobalAxios.post("/companyBill", formValues);
        setCompanies([...companies, response.data.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting company:", error);
    }
  };

  return (
    <div className="mb-6">
      <Typography variant="h6" className="mb-4 text-lg font-medium" style={{ color: "#9E58FF" }}>
        Manage Bill From
      </Typography>

      {/* Add New Company Button */}
      <Button className="mb-4" color="green" onClick={handleAddCompany}>
        + Add New Company
      </Button>

      {/* List of Companies */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <Typography variant="subtitle1" className="mb-2 font-medium">
          Company List
        </Typography>
        {companies.length > 0 ? (
          <div className="grid gap-4">
            {companies.map((company) => (
              <div
                key={company.id}
                className="flex justify-between items-center border-b pb-2 mb-2"
              >
                <div>
                  <Typography variant="body2" className="font-bold">
                    {company.name}
                  </Typography>
                  <Typography variant="body2">{company.email}</Typography>
                  <Typography variant="body2">
                    {company.city}, {company.state}, {company.country}
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <Button color="blue" size="sm" onClick={() => handleEditCompany(company)}>
                    Edit
                  </Button>
                  <Button color="red" size="sm" onClick={() => handleDeleteCompany(company.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Typography variant="body2">No companies available.</Typography>
        )}
      </div>

      {/* Modal for Add/Edit Company */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <Typography variant="h6" className="mb-4 text-lg font-medium">
              {isEditing ? "Edit Company" : "Add Company"}
            </Typography>
            <form className="grid gap-4">
              <Input
                label="Name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Mobile Number"
                name="mobile"
                value={formValues.mobile}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Address"
                name="address"
                value={formValues.address}
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
              <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              label="State"
              name="state"
                onChange={handleInputChange}
                required
              >
               {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
               ))}
              </select>
              <Input
                label="Country"
                name="country"
                value={"India"}
                //onChange={handleInputChange}
                readOnly
                required
              />
            </form>
            <div className="flex justify-between mt-6">
              <Button color="gray" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button color="blue" onClick={handleSubmit}>
                {isEditing ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBillFrom;