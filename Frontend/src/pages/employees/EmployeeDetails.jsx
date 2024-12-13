import React, { useEffect, useState } from "react";
import GlobalAxios from "../../../Global/GlobalAxios";
import { useParams } from "react-router-dom";
import { FaUserTie, FaEnvelope, FaMobileAlt, FaBriefcase, FaBuilding, FaCalendarAlt, FaMoneyBillWave ,FaClock,FaMapMarkerAlt,FaRegCalendarCheck} from "react-icons/fa";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

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

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-purple-600">Loading Employee Details...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">Employee Details</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Employee Name */}
          <div className="flex items-center bg-purple-50 rounded-lg p-4 shadow">
            <FaUserTie className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold text-gray-800">{employee.employee_name}</p>
            </div>
          </div>

          {/* Employee Email */}
          <div className="flex items-center bg-purple-50 rounded-lg p-4 shadow">
            <FaEnvelope className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">{employee.employee_email}</p>
            </div>
          </div>

          {/* Employee Mobile */}
          <div className="flex items-center bg-purple-50 rounded-lg p-4 shadow">
            <FaMobileAlt className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="font-semibold text-gray-800">{employee.employee_mobile}</p>
            </div>
          </div>

          {/* Designation */}
          <div className="flex items-center bg-purple-50 rounded-lg p-4 shadow">
            <FaBriefcase className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Designation</p>
              <p className="font-semibold text-gray-800">{employee.designation}</p>
            </div>
          </div>

          {/* Department */}
          <div className="flex items-center bg-purple-50 rounded-lg p-4 shadow">
            <FaBuilding className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-semibold text-gray-800">{employee.department}</p>
            </div>
          </div>

          {/* Employee Status */}
          <div className="flex items-center bg-purple-50 rounded-lg p-4 shadow">
            <FaCalendarAlt className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold text-gray-800">{employee.employee_status}</p>
            </div>
          </div>

          {/* Employee Salary */}
          <div className="flex items-center bg-purple-50 rounded-lg p-4 shadow">
            <FaMoneyBillWave className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Salary</p>
              <p className="font-semibold text-gray-800">₹{employee.employee_salary}</p>
            </div>
          </div>

          <div className="flex items-center bg-purple-50 rounded-lg p-4 shadow">
            <FaClock className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-semibold text-gray-800">{employee.experience}  years</p>
            </div>
          </div>

          {/* Address */}
          <div className=" flex items-center  bg-purple-50 rounded-lg p-4 shadow">
          <FaMapMarkerAlt className="text-purple-600 text-xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-semibold text-gray-800">{employee.employee_address}</p>
          </div>
          </div>
          

          
          <div className=" flex items-center bg-purple-50 rounded-lg p-4 shadow">
          <FaRegCalendarCheck className="text-purple-600 text-xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Working Days</p>
            <p className="font-semibold text-gray-800">{employee.working_days}</p>
          </div>
          </div>






        </div>

        

       

        
      </div>
    </div>
  );
};

export default EmployeeDetails;