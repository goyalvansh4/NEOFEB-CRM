import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLeadById } from '../../Api/LeadsApi';
import { FaSpinner, FaExclamationCircle, FaRedo, FaPhone, FaEdit } from 'react-icons/fa'; // Added FaEdit for edit icon
import Modal from 'react-modal'; // Import a modal library or use your own modal
import GlobalAxios from '../../../Global/GlobalAxios';

Modal.setAppElement('#root'); // Set the root element for accessibility

function LeadDetails() {
  const { id } = useParams(); // Get the lead ID from the URL
  const [lead, setLead] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [formData, setFormData] = useState({}); // Form data state

  

  useEffect(() => {
    const fetchLead = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GlobalAxios.get(`/lead/${id}`); // Fetch lead data by ID
        setLead(response.data.data);
        setFormData(response.data.data); // Pre-fill form with the fetched lead data
      } catch (error) {
        setError('Failed to fetch lead data');
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form submission (you can add update logic here)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle update logic here
    console.log('Updated Lead Data:', formData);
    toggleModal(); // Close the modal after submitting
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-primary text-4xl" />
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <FaExclamationCircle className="text-supporting-two text-4xl mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <button
          className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition"
        >
          <FaRedo className="mr-2" /> Retry
        </button>
      </div>
    );

  return (
    <div className="flex justify-center p-4 bg-gray-100 min-h-screen">
      {lead ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-5xl w-full">
          <div className="px-8 py-6">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold mb-6 text-primary">Lead Information</h1>
              <button
                onClick={toggleModal}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="mb-4"><span className="font-semibold text-gray-700">Lead Owner:</span> {lead.leadName}</p>
                <p className="mb-4 flex items-center">
                  <FaPhone className="mr-2 text-green-500" /> 
                  <span className="font-semibold text-gray-700">Phone:</span> {lead.phone}
                </p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Lead Source:</span> {lead.source}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Industry:</span> {lead.source}</p>
                {/* <p className="mb-4"><span className="font-semibold text-gray-700">Annual Revenue:</span> ${lead.annualRevenue}</p> */}
              </div>
              <div>
                <p className="mb-4"><span className="font-semibold text-gray-700">Company:</span> {lead.companyName}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Email:</span> <a href={`mailto:${lead.email}`} className="text-blue-500">{lead.email}</a></p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Lead Status:</span> {lead.leadStatus.leadStatus}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No lead found.</p>
      )}

      {/* Modal for editing lead */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Edit Lead"
        className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-primary">Edit Lead Information</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Lead Name</label>
              <input
                type="text"
                name="leadName"
                value={formData.leadName || ''}
           
                onChange={handleInputChange}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company || ''}
                onChange={handleInputChange}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={toggleModal}
              className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default LeadDetails;
