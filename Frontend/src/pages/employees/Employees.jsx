import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Import the icons
import GlobalAxios from "../../../Global/GlobalAxios";
import Swal from 'sweetalert2';
import { FaFolderPlus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';


const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await GlobalAxios.get("/employees");
        setEmployees(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEmployees();
  }, []);


  const handleAdd = () => {
    navigate('addEmployee');
  };

  const handleEdit = (employee) => {
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1BCFB4',
        cancelButtonColor: '#FE9496',
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (result.isConfirmed) {
        const response = await GlobalAxios.delete(`/employees/${id}`);
        if (response.data.status === "success") {
          setEmployees(employees.filter((emp) => emp._id !== id));
          Swal.fire({
            title: 'Deleted!',
            text: 'The employee has been deleted.',
            icon: 'success',
            confirmButtonColor: '#1BCFB4',
          });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while deleting the employee.',
        icon: 'error',
      });
    }
  };  

  return (
    <>
      <div className="space-y-6 my-4">
        <div className="w-full flex justify-between px-3">
          <h1 className="text-2xl font-semibold text-[#1BCFB4]">Employees</h1>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-[#1BCFB4] text-white rounded-lg hover:bg-[#1BCFB4] flex items-center"
          >
            <FaPlus className="mr-2" /> Add New
          </button>
        </div>
        {loading ? <p className="text-xl text-center text-gray-500">Loading...</p> :
          employees.length === 0 ? (
            <p className="text-xl text-center text-gray-500">No Data Found</p>
          ) : (
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-[#1BCFB4] text-white">
                  <th className="border border-gray-300 p-2">S.No</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Position</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Status</th>
                  <th className="border border-gray-300 p-2">Department</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees?.map((employee) => (
                  <tr key={employee._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{employee.employee_id}</td>
                    <td className="border border-gray-300 p-2">
                      <NavLink to={`${employee._id}`} className="text-[#1BCFB4] hover:text-[#0E7490]">
                      {employee.employee_name}
                      </NavLink>
                      </td>
                    <td className="border border-gray-300 p-2">{employee.designation}</td>
                    <td className="border border-gray-300 p-2">{employee.employee_email}</td>
                    <td className="border border-gray-300 p-2">{employee.employee_status}</td>
                    <td className="border border-gray-300 p-2">{employee.department}</td>
                    <td className="flex gap-2 justify-center border-b border-gray-300 px-2 py-4 text-center">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="text-[#A05AFF] hover:text-[#9E58FF] text-xl mr-2"
                        aria-label="Edit"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="text-[#FE9496] hover:text-red-700 text-xl"
                        aria-label="Delete"
                      >
                        <FaTrash size={20} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
      </div>
    </>
  );
};

export default Employees;