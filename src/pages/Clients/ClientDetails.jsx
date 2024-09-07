import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Fetch client details by ID
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(`/api/clients/${id}`);
        setClient(response.data);
      } catch (error) {
        console.error("Error fetching client details", error);
      }
    };
    fetchClientDetails();
  }, [id]);

  if (!client) {
    return <div className="text-center text-gray-500">Loading client details...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={client.profile_image || 'default-avatar.png'}
          alt={client.name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold text-primary">{client.name}</h2>
          <p className="text-gray-500">{client.email}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <div>
            <p className="font-semibold">Full Name:</p>
            <p>{client.name}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{client.email}</p>
          </div>
        </div>

        <div className="flex justify-between text-sm mt-4">
          <div>
            <p className="font-semibold">Contact Number:</p>
            <p>{client.phone}</p>
          </div>
          <div>
            <p className="font-semibold">Company Name:</p>
            <p>{client.company_name || 'N/A'}</p>
          </div>
        </div>

        <div className="flex justify-between text-sm mt-4">
          <div>
            <p className="font-semibold">Country:</p>
            <p>{client.country || 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold">City:</p>
            <p>{client.city || 'N/A'}</p>
          </div>
        </div>

        <div className="flex justify-between text-sm mt-4">
          <div>
            <p className="font-semibold">State:</p>
            <p>{client.state || 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold">Address:</p>
            <p>{client.address || 'N/A'}</p>
          </div>
        </div>

        <div className="flex justify-between text-sm mt-4">
          <div>
            <p className="font-semibold">GST Number:</p>
            <p>{client.gst_number || 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold">PAN:</p>
            <p>{client.pan || 'N/A'}</p>
          </div>
        </div>

        <div className="flex justify-between text-sm mt-4">
          <div>
            <p className="font-semibold">Created:</p>
            <p>{client.created_at}</p>
          </div>
          <div>
            <p className="font-semibold">Updated:</p>
            <p>{client.updated_at}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-primary text-white px-4 py-2 rounded shadow">Edit</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded shadow ml-2">Delete</button>
      </div>
    </div>
  );
};

export default ClientDetails;
