import React, { useState, useEffect } from 'react';
import GlobalAxios from '../../../Global/GlobalAxios';

const FollowUp = () => {
  const [followUpLeads, setFollowUpLeads] = useState([]);

  useEffect(() => {
    const fetchFollowUpLeads = async () => {
      try {
        const response = await GlobalAxios.get('/lead');
        if(response.data.status === 'success') {
          const leads = response.data.data;
          const followUpLeads = leads.filter(lead => lead.follow_up_date === new Date().toISOString().split('T')[0]);
          setFollowUpLeads(followUpLeads);
        }
      } catch (error) {
        console.error('Error fetching follow-up leads:', error);
      }
    };
    fetchFollowUpLeads();
  }, []);

  return (
    <div className="p-5  mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Follow-Up Leads</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
          <th className="border border-gray-200 px-4 py-2 font-semibold text-left">S.No</th>
            <th className="border border-gray-200 px-4 py-2 font-semibold text-left">Name</th>
            <th className="border border-gray-200 px-4 py-2 font-semibold text-left">Company Name</th>
            <th className="border border-gray-200 px-4 py-2 font-semibold text-left">Email</th>
            <th className="border border-gray-200 px-4 py-2 font-semibold text-left">Lead Status</th>
            
          </tr>
        </thead>
        <tbody>
          {followUpLeads.length > 0 ? (
            followUpLeads.map((lead,index) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">{index+1}</td>
                <td className="border border-gray-200 px-4 py-2">{lead.leadName}</td>
                <td className="border border-gray-200 px-4 py-2">{lead.companyName}</td>
                <td className="border border-gray-200 px-4 py-2">{lead.email}</td>
                <td className="border border-gray-200 px-4 py-2">{lead.leadStatus.leadStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-6">
                No follow-up leads available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FollowUp;
