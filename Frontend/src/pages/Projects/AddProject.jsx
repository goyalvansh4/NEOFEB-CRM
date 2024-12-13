import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalAxios from '../../../Global/GlobalAxios';
import { Button } from "@material-tailwind/react";

const AddProject = () => {
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projectData, setProjectData] = useState({
    project_name: '',
    project_status: '',
    client_id: '',
    assigned_to: [],
    price: '',
    start_date: '',
    deadline: '',
    duration: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch clients and employees
    const fetchData = async () => {
      try {
        const clientResponse = await GlobalAxios.get('/client');
        setClients(clientResponse.data.data);

        const employeeResponse = await GlobalAxios.get('/employees');
        setEmployees(employeeResponse.data.data);
      } catch (error) {
        console.error('Error fetching clients or employees:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setProjectData({
      ...projectData,
      assigned_to: selectedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await GlobalAxios.post('/project', projectData);
      alert('Project added successfully!');
      navigate('/projects');
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full  bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center text-purple-600">Add New Project</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Project Name */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              name="project_name"
              value={projectData.project_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Project Status */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Project Status</label>
            <input
              type="text"
              name="project_status"
              value={projectData.project_status}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Client */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Client</label>
            <select
              name="client_id"
              value={projectData.client_id}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select a Client</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={projectData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Start Date */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={projectData.start_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Deadline */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={projectData.deadline}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Duration */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              name="duration"
              value={projectData.duration}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>


          {/* Buttons */}
          <div className="col-span-2 flex justify-between">
            <Button
              type="button"
              className="bg-[#FA7E80] text-white px-6 py-2 rounded hover:bg-[#FA7E80] focus:outline-none focus:ring-2 focus:ring-[#FA7E80]"
              size="lg"
              onClick={() => navigate("/dashboard/projects")}
            >
              Back
            </Button>

            <button
              type="submit"
              className="bg-[#1BCFB4] text-white px-6 py-2 rounded hover:bg-[#1BCFB4] focus:outline-none focus:ring-2 focus:ring-[#1BCFB4]"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
