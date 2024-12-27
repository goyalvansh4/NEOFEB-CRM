import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaSpinner, FaExclamationCircle, FaRedo, FaPhone, FaCalendarAlt, FaCheck, FaEdit } from 'react-icons/fa';
import GlobalAxios from '../../../Global/GlobalAxios';
import { toast,Toaster } from 'react-hot-toast';

function LeadDetails() {
  const { id } = useParams(); // Get the lead ID from the URL
  const [lead, setLead] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followUpDate, setFollowUpDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [isEditingRemarks, setIsEditingRemarks] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GlobalAxios.get(`/lead/${id}`); 
        // Fetch lead  
        console.log(response.data.data);
        setLead(response.data.data);
        setRemarks(response.data.data.remarks || '');
        setFollowUpDate(response.data.data.follow_up_date || '');
        
      } catch (error) {
        setError('Failed to fetch lead data');
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  const handleFollowUpDateSave = async () => {
    try {
      // Update lead object immutably
      const updatedLead = { ...lead, follow_up_date: followUpDate };
  
      const response = await GlobalAxios.put(`/lead/${id}`, updatedLead);
  
      if (response.data.status === 'success') {
        toast.success('Follow-Up Date updated successfully!');
        setLead(updatedLead); // Update the lead state
        setIsEditingDate(false);
      } else {
        toast.error('Failed to update Follow-Up Date.');
      }
    } catch (error) {
      console.error('Error updating Follow-Up Date:', error);
      toast.error('An error occurred while updating Follow-Up Date.');
    }
  };
  
  const handleRemarksSave = async () => {
    try {
      // Update lead object immutably
      const updatedLead = { ...lead, remarks };
  
      const response = await GlobalAxios.put(`/lead/${id}`, updatedLead);
  
      if (response.data.status === 'success') {
        toast.success('Remarks updated successfully!');
        setLead(updatedLead); // Update the lead state
        setIsEditingRemarks(false);
      } else {
        toast.error('Failed to update Remarks.');
      }
    } catch (error) {
      console.error('Error updating Remarks:', error);
      toast.error('An error occurred while updating Remarks.');
    }
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-primary text-4xl" style={{ color: '#A05AFF' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center">
        <FaExclamationCircle className="text-supporting-two text-4xl mb-4" style={{ color: '#FE9496' }} />
        <p className="text-red-600 mb-4">{error}</p>
        <button
          className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition"
          onClick={() => window.location.reload()}
          style={{ backgroundColor: '#1BCFB4' }}
        >
          <FaRedo className="mr-2" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <Toaster />
      <div className="mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800" style={{ color: '#A05AFF' }}>
            Lead Details
          </h1>
        </div>

        {/* Lead Information */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="mb-4">
                <span className="font-semibold text-gray-700 ">Lead Name:</span> {lead.leadName}
              </p>
              <p className="mb-4">
                <span className="font-semibold text-gray-700">Company Name:</span> {lead.companyName}
              </p>
              <p className="mb-4 flex items-center">
                <span className="font-semibold text-gray-700">Phone:</span> {lead.phone}
              </p>
              <p className="mb-4">
                <span className="font-semibold text-gray-700">Email:</span>{' '}
                <a href={`mailto:${lead.email}`} className="text-blue-500 underline">
                  {lead.email}
                </a>
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
                <span className="font-semibold text-gray-700 mr-3">Lead Status:</span>
               <span className={`${lead.leadStatus === 'Active'? 'bg-green-500' : 'bg-red-500'} rounded-lg text-white px-2 py-1 text-[15px]`}>{lead.leadStatus?.leadStatus}</span>
              </p>
            </div>
          </div>

          {/* Follow-Up Date */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700 sm:flex items-center">
              <FaCalendarAlt className="mr-2" style={{ color: '#9E58FF' }} /> Follow-Up Date:
            </label>
            {isEditingDate ? (
              <div className="flex items-center">
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="border px-3 py-2 rounded w-full mr-2"
                />
                <button
                  onClick={handleFollowUpDateSave}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition"
                  style={{ backgroundColor: '#1BCFB4' }}
                >
                  <FaCheck />
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-gray-800">{followUpDate || 'Not Set'}</span>
                <button
                  onClick={() => setIsEditingDate(true)}
                  className="ml-4 text-blue-500 hover:text-blue-700 transition"
                >
                  <FaEdit />
                </button>
              </div>
            )}
          </div>

          {/* Remarks */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Remarks:</label>
            {isEditingRemarks ? (
              <div className="flex items-center">
                <textarea
                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value)
                  }}
                  className="border px-3 py-2 rounded w-full mr-2"
                  rows="3"
                />
                <button
                  onClick={handleRemarksSave}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition"
                  style={{ backgroundColor: '#1BCFB4' }}
                >
                  <FaCheck />
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-gray-800">{remarks || 'No Remarks'}</span>
                <button
                  onClick={() => setIsEditingRemarks(true)}
                  className="ml-4 text-blue-500 hover:text-blue-700 transition"
                >
                  <FaEdit />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>



      {/* Convert To Deals */}

      <div>
         <div className='mx-auto p-8'>
            <h1 className="text-2xl font-bold text-gray-800" style={{ color: '#A05AFF' }}>
              Convert To Deals
            </h1>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <form>
                <input type="text" placeholder="Deal Name" className="border px-3 py-2 rounded w-full mb-4" />
                <input type="text" placeholder="Deal Source" className="border px-3 py-2 rounded w-full mb-4" />
                <input type="text" placeholder="Deal Price" className="border px-3 py-2 rounded w-full mb-4" />
                <button
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition"
                  style={{ backgroundColor: '#1BCFB4' }}
                >
                  Make Deal
                </button>
              </form>
              </div>
         </div>
       </div>
    </div>
  );
}

export default LeadDetails;