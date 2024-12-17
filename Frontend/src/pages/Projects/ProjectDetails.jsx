import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalAxios from '../../../Global/GlobalAxios';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await GlobalAxios.get(`/project/${id}`);
        if (response.data.status === 'success') {
          console.log(response.data.data);  
          setProject(response.data.data);
        }
      } catch (error) {
        setError('Error fetching project details: ' + error.message);
      }
    };
    fetchProjectDetails();
  }, [id]);

  if (error) {
    return (
      <div className="text-red-600 text-center py-4">
        Error: {error}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-4 text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10 px-6">
      <div className="mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Project Details</h1>

        {/* Project Information Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Project Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-medium text-gray-600">Name:</span> {project.project_name}</p>
            <p><span className="font-medium text-gray-600">Status:</span> {project.project_status}</p>
            <p><span className="font-medium text-gray-600">Start Date:</span> {new Date(project.start_date).toLocaleDateString()}</p>
            <p><span className="font-medium text-gray-600">Deadline:</span> {new Date(project.deadline).toLocaleDateString()}</p>
            <p><span className="font-medium text-gray-600">Duration:</span> {project.duration}</p>
            <p><span className="font-medium text-gray-600">Price:</span> ₹{project.price}</p>
          </div>
        </div>

        {/* Client Information Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Client Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-medium text-gray-600">Name:</span> {project.client_id.name}</p>
            <p><span className="font-medium text-gray-600">Email:</span> {project.client_id.email}</p>
            <p><span className="font-medium text-gray-600">Phone:</span> {project.client_id.phone_number}</p>
            <p><span className="font-medium text-gray-600">Company:</span> {project.client_id.company_name}</p>
            <p>
              <span className="font-medium text-gray-600">Address:</span> {project.client_id.address}, {project.client_id.city}, {project.client_id.state} - {project.client_id.pincode}
            </p>
            <p><span className="font-medium text-gray-600">GST Number:</span> {project.client_id.gst_number}</p>
            <p><span className="font-medium text-gray-600">Bank:</span> {project.client_id.bank_name}</p>
            <p><span className="font-medium text-gray-600">UPI ID:</span> {project.client_id.upi_id}</p>
          </div>
        </div>

        {/* Assigned Team Members Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Assigned Team Members</h2>
          {project.assigned_to.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600">
              {project.assigned_to.map((member) => (
                <li key={member._id} className="mb-2">Team Member: {member.employee_name}</li>
                
                
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No team members assigned yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;