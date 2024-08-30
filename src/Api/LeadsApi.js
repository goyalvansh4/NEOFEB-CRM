export const fetchLeads = async () => {
    const response = await fetch('http://localhost:5000/leads');
    // console.log(await response.json());
    return await response.json();
};

export const fetchLeadById = async (id) => {
  const response = await fetch(`http://localhost:5000/leads/${id}`);
  const data = await response.json();
  return data;
};