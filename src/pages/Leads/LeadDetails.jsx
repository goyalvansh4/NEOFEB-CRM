import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLeadById } from '../../Api/LeadsApi';
import { FaSpinner, FaExclamationCircle, FaRedo, FaPhone } from 'react-icons/fa'; // Added FaPhone for phone icons

function LeadDetails() {
  const { id } = useParams(); // Get the lead ID from the URL
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLead = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeadById(id);
      const filteredData = data.filter((lead) => parseInt(lead.id) == parseInt(id));
      // console.log(filteredData);
      setLead(filteredData[0]);
      console.log(lead);  
    } catch (error) {
      setError('Failed to fetch lead data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead(id);
  }, [id]);

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
          onClick={fetchLead}
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
            <h1 className="text-2xl font-semibold mb-6 text-primary">Lead Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="mb-4"><span className="font-semibold text-gray-700">Lead Owner:</span> {lead.leadName}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Title:</span> {lead.title}</p>
                <p className="mb-4 flex items-center">
                  <FaPhone className="mr-2 text-green-500" /> 
                  <span className="font-semibold text-gray-700">Phone:</span> {lead.phone}
                </p>
                <p className="mb-4 flex items-center">
                  <FaPhone className="mr-2 text-green-500" /> 
                  <span className="font-semibold text-gray-700">Mobile:</span> {lead.phone}
                </p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Lead Source:</span> {lead.leadSource}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Industry:</span> {lead.industry}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Annual Revenue:</span> ${lead.annualRevenue}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Email Opt Out:</span> {lead.emailOptOut ? 'Yes' : 'No'}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Modified By:</span> {lead.modifiedBy}</p>
              </div>
              <div>
                <p className="mb-4"><span className="font-semibold text-gray-700">Company:</span> {lead.company}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Lead Name:</span> {lead.leadName}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Email:</span> <a href={`mailto:${lead.email}`} className="text-blue-500">{lead.email}</a></p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Fax:</span> {lead.fax || '—'}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Website:</span> <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">{lead.website}</a></p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Lead Status:</span> {lead.leadStatus}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">No. of Employees:</span> {lead.numOfEmployees || '—'}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Rating:</span> {lead.rating || '—'}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Created By:</span> {lead.createdBy}</p>
                <p className="mb-4"><span className="font-semibold text-gray-700">Skype ID:</span> <a href={`skype:${lead.skypeId}?chat`} className="text-blue-500">{lead.skypeId}</a></p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No lead found.</p>
      )}
    </div>
  );
}

export default LeadDetails;
