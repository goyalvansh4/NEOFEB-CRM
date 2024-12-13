import React, { useEffect, useState } from "react";
import GlobalAxios from "../../../Global/GlobalAxios";
import { useParams } from "react-router-dom";
import {
  FaUserTie,
  FaEnvelope,
  FaMobileAlt,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaClock,
  FaMapMarkerAlt,
  FaRegCalendarCheck,
} from "react-icons/fa";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await GlobalAxios.get(`/employees/${id}`);
        setEmployee(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployee();
  }, [id]);


  useEffect(() => {
   const fetchProjects = async () => {
      try {
        const response = await GlobalAxios.get(`/project`);
        setProjects(response.data.data);
      } catch (error) {
        console.error(error);
      }
   };
   fetchProjects();
  }, [employee]);

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-purple-600">Loading Employee Details...</p>
      </div>
    );
  }

  return (
    <>
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Employee Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Employee Name */}
        <div className="flex items-center border rounded-lg p-4 shadow-sm">
          <FaUserTie className="text-gray-600 text-xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold text-gray-800">{employee.employee_name}</p>
          </div>
        </div>

        {/* Employee Email */}
        <div className="flex items-center border rounded-lg p-4 shadow-sm">
          <FaEnvelope className="text-gray-600 text-xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold text-gray-800">{employee.employee_email}</p>
          </div>
        </div>

        {/* Employee Mobile */}
        <div className="flex items-center border rounded-lg p-4 shadow-sm">
          <FaMobileAlt className="text-gray-600 text-xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Mobile</p>
            <p className="font-semibold text-gray-800">{employee.employee_mobile}</p>
          </div>
        </div>

        {/* Designation */}
        <div className="flex items-center border rounded-lg p-4 shadow-sm">
          <FaBriefcase className="text-gray-600 text-xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Designation</p>
            <p className="font-semibold text-gray-800">{employee.designation}</p>
          </div>
        </div>

        {/* Department */}
        <div className="flex items-center border rounded-lg p-4 shadow-sm">
          <FaBuilding className="text-gray-600 text-xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-semibold text-gray-800">{employee.department}</p>
          </div>
        </div>

        {/* Employee Status */}
        <div className="flex items-center border rounded-lg p-4 shadow-sm">
          <FaCalendarAlt className="text-gray-600 text-xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-semibold text-gray-800">{employee.employee_status}</p>
          </div>
        </div>

        {/* Employee Salary */}
        <div className="flex items-center border rounded-lg p-4 shadow-sm">
          <FaMoneyBillWave className="text-gray-600 text-xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Salary</p>
            <p className="font-semibold text-gray-800">₹{employee.employee_salary}</p>
          </div>
        </div>

        {/* Experience */}
        <div className="flex items-center border rounded-lg p-4 shadow-sm">
          <FaClock className="text-gray-600 text-xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Experience</p>
            <p className="font-semibold text-gray-800">{employee.experience} years</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center border rounded-lg p-4 shadow-sm">
          <FaMapMarkerAlt className="text-gray-600 text-xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-semibold text-gray-800">{employee.employee_address}</p>
          </div>
        </div>

        {/* Working Days */}
        <div className="flex items-center border rounded-lg p-4 shadow-sm">
          <FaRegCalendarCheck className="text-gray-600 text-xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Working Days</p>
            <p className="font-semibold text-gray-800">{employee.working_days}</p>
          </div>
        </div>
      </div>
    </div>

{/* make a dropdown for choose the projects to  */}
<div className="container mx-auto py-10">
  <h2 className="text-2xl font-bold text-gray-800 mb-5">Assign Project</h2>
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      const {value } = e.target.project;
      console.log(value);
      // return;
      
      employee.projects.push(value);
      try {
        await GlobalAxios.put(`/employees/${id}`, employee);
        // Fetch the updated employee details
        const response = await GlobalAxios.get(`/employees/${id}`);
        setEmployee(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }}
  >
    <div className="flex items-center border rounded-lg p-4 shadow-sm">
      <label htmlFor="project" className="text-md text-gray-500 mr-4">
        Select Project
      </label>
      <select id="project" name="projects" className="border rounded p-2 flex-grow">
        {/* Replace with actual project options */}
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.project_name}
          </option>
        ))}
      </select>
      <button type="submit" className="ml-4 bg-purple-600 text-white px-4 py-2 rounded">
        Assign
      </button>
    </div>
  </form>
</div>

    {/* Assign project to the employee */}
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Assigned Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employee.projects && employee.projects.length > 0 ? (
          employee.projects.map((project) => (
            <div key={project._id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
              <p className="text-sm text-gray-500">{project.description}</p>
              <p className="text-sm text-gray-500">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No projects assigned.</p>
        )}
      </div>
    </div>

</>
  );
};

export default EmployeeDetails;