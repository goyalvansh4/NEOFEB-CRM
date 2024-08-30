import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLeadById } from '../../Api/LeadsApi';

function LeadDetails() {
  const { id } = useParams(); // Get the lead ID from the URL
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const data = await fetchLeadById(id);
        setLead(data);
      } catch (error) {
        setError('Failed to fetch lead data');
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {lead ? (
        <div>
          <h1>Lead Details</h1>
          <p><strong>ID:</strong> {lead.id}</p>
          <p><strong>Name:</strong> {lead.leadNameAll}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Phone:</strong> {lead.phone}</p>
          <p><strong>Company:</strong> {lead.company}</p>
          <p><strong>Lead Source:</strong> {lead.leadSource}</p>
          {/* Display other lead details as needed */}
        </div>
      ) : (
        <p>No lead found.</p>
      )}
    </div>
  );
}

export default LeadDetails;
