import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalAxios from '../../../Global/GlobalAxios';

const EditLead = () => {

  const { id } = useParams();
  const [leadData, setLeadData] = useState(null);

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await GlobalAxios.get(`/lead/${id}`);
        setLeadData(response.data.data);
      } catch (error) {
        console.error('Error fetching lead data:', error);
      }
    };

    fetchLeadData();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await GlobalAxios.put(`/lead/${id}`, leadData);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating lead:', error);
  }
}

  return (
    <div className="w-[80%] mt-5 mx-auto p-4 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="leadName" className="block text-sm font-medium text-gray-700">Lead Name:</label>
          <input type="text" id="leadName" name="leadName" value={leadData?.leadName || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name:</label>
          <input type="text" id="companyName" name="companyName" value={leadData?.companyName || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input type="email" id="email" name="email" value={leadData?.email || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
          <input type="tel" id="phone" name="phone" value={leadData?.phone || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source:</label>
          <input type="text" id="source" name="source" value={leadData?.source || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="leadStatus" className="block text-sm font-medium text-gray-700">Lead Status:</label>
          <input type="text" id="leadStatus" name="leadStatus" value={leadData?.leadStatus.leadStatus || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="sourceDetails" className="block text-sm font-medium text-gray-700">Source Details:</label>
          <input type="text" id="sourceDetails" name="sourceDetails" value={leadData?.sourceDetails || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Edit</button>
      </form>
    </div>
  );
}

export default EditLead