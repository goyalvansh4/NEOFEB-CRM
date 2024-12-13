import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalAxios from '../../../Global/GlobalAxios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await GlobalAxios.get("/project");
        setProjects(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#AB014A',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await GlobalAxios.delete(`/project/${projectId}`);
          setProjects(projects.filter((pro) => pro._id !== projectId));
          Swal.fire(
            'Deleted!',
            'Your project has been deleted.',
            'success'
          );
        } catch (error) {
          console.error(error);
          Swal.fire('Error!', 'There was a problem deleting the project.', 'error');
        }
      }
    });
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-8">
        <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Projects</h1>
        <button onClick={() => navigate('addProject')} className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800">Add Project</button>
        </div>
        {loading ? (
          <p className="text-center text-purple-600">Loading...</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-400 shadow-lg bg-white">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="border border-gray-400 px-4 py-2">Project Name</th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
                <th className="border border-gray-400 px-4 py-2">Client Name</th>
                <th className="border border-gray-400 px-4 py-2">Price</th>
                <th className="border border-gray-400 px-4 py-2">Start Date</th>
                <th className="border border-gray-400 px-4 py-2">Deadline</th>
                <th className="border border-gray-400 px-4 py-2">Duration</th>
                <th className="border border-gray-400 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="hover:bg-gray-100">
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">{project.project_name}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">{project.project_status}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">{project.client_name}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">₹{project.price}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">{project.start_date}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">{project.deadline}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">{project.duration}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700 flex gap-4 justify-center">
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => navigate(`/project/${project._id}/edit`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Projects;