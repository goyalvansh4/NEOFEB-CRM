import React, { useState } from "react";
import toast, {Toaster} from 'react-hot-toast';
import { FaUserTie, FaEnvelope, FaMobileAlt} from "react-icons/fa";
import GlobalAxios from "../../../Global/GlobalAxios";
import { CgSpinner } from "react-icons/cg";



const AddEmployee = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    employee_name: "",
    employee_email: "",
    employee_mobile: "",
    employee_address: "",
    designation: "",
    department: "",
    employee_status: "Active",
    employee_salary: "",
    projects: [],
    leaves: [],
    incentives: [],
    working_days: "",
    experience: "",
    feedback: "",
    skills: [],
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log("Form Data Submitted:", formData);
    setLoading(true);
    try {
      const response = await GlobalAxios.post("/employees", formData);
      if (response.data.status === "success") {
        toast.success("Employee added successfully");
        setLoading(false);
        setFormData({
          employee_id: "",
          employee_name: "",
          employee_email: "",
          employee_mobile: "",
          employee_address: "",
          designation: "",
          department: "",
          employee_status: "Active",
          employee_salary: "",
          projects: [],
          leaves: [],
          incentives: [],
          working_days: "",
          experience: "",
          feedback: "",
          skills: [],
        });
      }
    } catch (error) {
      toast.error("Error adding employee");
      setLoading(false);
      console.error(error);
    }
  };
  

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <Toaster />
      <div className="w-full max-w-5xl bg-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-purple-600 mb-8 text-center">
          Add New Employee
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Employee ID */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Employee ID</label>
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Employee Name */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Employee Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mt-1">
              <FaUserTie className="text-gray-400 mr-2" />
              <input
                type="text"
                name="employee_name"
                value={formData.employee_name}
                onChange={handleInputChange}
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Employee Email */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mt-1">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="employee_email"
                value={formData.employee_email}
                onChange={handleInputChange}
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Employee Mobile */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Mobile Number</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mt-1">
              <FaMobileAlt className="text-gray-400 mr-2" />
              <input
                type="number"
                name="employee_mobile"
                value={formData.employee_mobile}
                onChange={handleInputChange}
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Employee Address */}
          

          {/* Designation */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select Designation</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Designer">Designer</option>
            </select>
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Employee Status</label>
            <select
              name="employee_status"
              value={formData.employee_status}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Experience</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mt-1">
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Working Days</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mt-1">
              <input
                type="number"
                name="working_days"
                value={formData.working_days}
                onChange={handleInputChange}
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Salary */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Salary</label>
            <input
              type="number"
              name="employee_salary"
              value={formData.employee_salary}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="font-semibold text-gray-700">Address</label>
            <textarea
              name="employee_address"
              value={formData.employee_address}
              onChange={handleInputChange}
              rows={3}
              className="border border-gray-300 rounded-lg px-4 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            {loading ? (
              <div className="flex items-center justify-center">
                <CgSpinner className="animate-spin h-6 w-6 mr-2 text-purple-600" />
                <span className="text-purple-600">Adding Employee...</span>
              </div>
            ) : <button
            type="submit"
            className="w-full bg-purple-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
          >
            Add Employee
          </button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;