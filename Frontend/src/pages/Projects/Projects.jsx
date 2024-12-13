import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import GlobalAxios from '../../../Global/GlobalAxios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Projects = () => {
  const [clients, setClients] = useState([]); 
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const navigate = useNavigate();

  const fetchClients = async () => { 
    try {
      const response = await GlobalAxios.get('/client');
      setClients(response.data.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };




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
    fetchClients();
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

  const handleEdit = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      await GlobalAxios.put(`/project/${currentProject._id}`, currentProject);
      setProjects((prev) => prev.map((proj) => (proj._id === currentProject._id ? currentProject : proj)));
      setIsModalOpen(false);
      Swal.fire('Success!', 'Project updated successfully.', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'There was a problem updating the project.', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#1BCFB4]">Projects</h1>
          <button onClick={() => navigate('addProject')} className="bg-[#1BCFB4] text-white px-4 py-2 rounded-lg hover:bg-[#1BCFB4]">Add Project</button>
        </div>
        {loading ? (
          <p className="text-center text-[#1BCFB4]">Loading...</p>
        ) : (
          <table className="table-auto w-full border-collapse shadow-lg bg-white rounded-lg overflow-hidden">
            <thead className="bg-[#1BCFB4] text-white">
              <tr>
              <th className="border border-gray-400 px-4 py-2">S.No</th>
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
              {projects.map((project,index) => (
                <tr key={project._id} className="hover:bg-gray-100">
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">{index+1}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">
                    <NavLink to={`${project._id}`} className="text-[#1BCFB4] hover:text-[#1BCFB4]">
                    {project.project_name}
                    </NavLink>
                    </td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">{project.project_status}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">{project.client_id.name}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">₹{project.price}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">{project.start_date}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">{project.deadline}</td>
                  <td className="border border-gray-400 px-4 py-2 text-gray-700">{project.duration}</td>
                  <td className="border-b border-gray-400 px-4 py-4 text-gray-700 flex items-center gap-4 justify-center">
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-[#1BCFB4] hover:text-[#1BCFB4]"
                    >
                      <FaTrash size={20} />
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-[#FA7E80] hover:text-[#FA7E80]"
                    >
                      <FaEdit size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Project Name</label>
                <input
                  type="text"
                  value={currentProject.project_name}
                  onChange={(e) => setCurrentProject({ ...currentProject, project_name: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <input
                  type="text"
                  value={currentProject.project_status}
                  onChange={(e) => setCurrentProject({ ...currentProject, project_status: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  value={currentProject.price}
                  onChange={(e) => setCurrentProject({ ...currentProject, price: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Client Name</label>
                <select
                  value={currentProject.client_id}
                  onChange={(e) =>
                    setCurrentProject({ ...currentProject, client_id: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded"
                >
                  <option value="">Select a Client</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={currentProject.start_date}
                  onChange={(e) => setCurrentProject({ ...currentProject, date: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Deadline</label>
                <input
                  type="date"
                  value={currentProject.deadline}
                  onChange={(e) => setCurrentProject({ ...currentProject, deadline: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Duration</label>
                <input
                  type="text"
                  value={currentProject.duration}
                  onChange={(e) => setCurrentProject({ ...currentProject, duration: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
