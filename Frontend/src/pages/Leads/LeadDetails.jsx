import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaSpinner, FaExclamationCircle, FaRedo, FaPhone, FaEdit } from 'react-icons/fa'; // Icons
import Modal from 'react-modal';
import GlobalAxios from '../../../Global/GlobalAxios';

Modal.setAppElement('#root'); // Set the root element for accessibility

function LeadDetails() {
  const { id } = useParams(); // Get the lead ID from the URL
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchLead = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GlobalAxios.get(`/lead/${id}`); // Fetch lead data
        setLead(response.data.data);
        setFormData(response.data.data);
      } catch (error) {
        setError('Failed to fetch lead data');
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Lead Data:', formData);
    toggleModal(); // Close modal after submitting
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-primary text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <FaExclamationCircle className="text-supporting-two text-4xl mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <button
          className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition"
          onClick={() => window.location.reload()}
        >
          <FaRedo className="mr-2" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Lead Details</h1>
          <button
            onClick={toggleModal}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
        </div>

        {/* Lead Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="mb-4">
              <span className="font-semibold text-gray-700">Lead Name:</span> {lead.leadName}
            </p>
            <p className="mb-4">
              <span className="font-semibold text-gray-700">Company Name:</span> {lead.companyName}
            </p>
            <p className="mb-4 flex items-center">
              <FaPhone className="mr-2 text-green-500" />
              <span className="font-semibold text-gray-700">Phone:</span> {lead.phone}
            </p>
            <p className="mb-4">
              <span className="font-semibold text-gray-700">Email:</span>{' '}
              <a href={`mailto:${lead.email}`} className="text-blue-500 underline">
                {lead.email}
              </a>
            </p>
            <p className="mb-4">
              <span className="font-semibold text-gray-700">Follow-Up Date:</span>{' '}
              {lead.follow_up_date}
            </p>
          </div>
          <div>
            <p className="mb-4">
              <span className="font-semibold text-gray-700">Source:</span> {lead.source}
            </p>
            <p className="mb-4">
              <span className="font-semibold text-gray-700">Source Details:</span> {lead.sourceDetails || 'N/A'}
            </p>
            <p className="mb-4">
              <span className="font-semibold text-gray-700">Remarks:</span> {lead.remarks || 'N/A'}
            </p>
            <p className="mb-4">
              <span className="font-semibold text-gray-700">Lead Status:</span>{' '}
              {lead.leadStatus?.leadStatus}
            </p>
          </div>
        </div>
      </div>

      {/* Modal for editing */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Edit Lead"
        className="bg-white rounded-lg max-w-xl shadow-lg  mx-auto p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Lead Information</h2>
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
              <label className="block mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName || ''}
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
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
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
              className="bg-blue-500 text-white px-4 py-2 rounded"
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