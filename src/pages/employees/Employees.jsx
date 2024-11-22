import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    email: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://neofeb.onrender.com/employee");
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEmployees();
  }, []);






  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDelete = async(id) => {
    try {
    const response = await axios.delete(`https://neofeb.onrender.com/employee/${id}`);
      if(response.data.status === "success") {
        setEmployees(employees.filter((emp) => emp._id !== id));
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    if (isEditModalOpen) {
      setSelectedEmployee((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async() => {
    const newEmp = { ...newEmployee};
    try{
      const response = await axios.post("https://neofeb.onrender.com/employee", newEmp);
      console.log(response.data);
      if(response.data.status === "success") {
       setEmployees([...employees, newEmp]);
       setNewEmployee({ name: "", position: "", email: "", status: "" });
       setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    } 
  };

  const handleEditSubmit = async() => {
  try {
    const response = await axios.put(`https://neofeb.onrender.com/employee/${selectedEmployee._id}`, selectedEmployee);
    if(response.data.status === "success") {
      console.log(response.data);
      setEmployees(
        employees.map((emp) => (emp._id === selectedEmployee._id ? selectedEmployee : emp))
      );
      setIsEditModalOpen(false);
      setSelectedEmployee(null);
    }
  } catch (error) {
    console.error(error);
  } 
  };

  return (
    <>
    {loading && <p className="text-xl text-center text-gray-500">Loading...</p>}
    <div className="space-y-6 my-4">
      <div className="w-full flex justify-between px-3">
        <h1 className="text-2xl font-semibold text-[#4BCBEB]">Employees</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#A05AFF] text-white rounded-lg hover:bg-[#9E58FF] flex items-center"
        >
          <FaPlus className="mr-2" /> Add New
        </button>
      </div>
      {employees.length === 0 ? (
        <p className="text-xl text-center text-gray-500">No Data Found</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#1BCFB4] text-white">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{employee.name}</td>
                <td className="border border-gray-300 p-2">{employee.position}</td>
                <td className="border border-gray-300 p-2">{employee.email}</td>
                <td className="border border-gray-300 p-2">{employee.status}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="px-2 py-1 bg-[#FE9496] text-white rounded-lg mr-2 hover:bg-red-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="px-2 py-1 bg-[#A05AFF] text-white rounded-lg hover:bg-[#9E58FF]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <EmployeeModal
          employee={newEmployee}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          onChange={handleModalChange}
        />
      )}
      {isEditModalOpen && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditSubmit}
          onChange={handleModalChange}
        />
      )}
    </div>
    </>
  );
};

const EmployeeModal = ({ employee, onClose, onSubmit, onChange }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-lg w-full">
        <h2 className="text-xl font-semibold text-[#4BCBEB]">
          {employee.id ? "Edit Employee" : "Add New Employee"}
        </h2>
        <div className="space-y-3">
          {["name", "position", "email", "status"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={employee[field] || ""}
              onChange={onChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#A05AFF]"
            />
          ))}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-[#1BCFB4] text-white rounded hover:bg-[#4BCBEB]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employees;