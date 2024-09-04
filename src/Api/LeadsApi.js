export const fetchLeads = async () => {
  const response = await fetch(`https://66d7e6d837b1cadd80529ccf.mockapi.io/admin/api/v1/leads`);
  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchLeadById = async (id) => {
const response = await fetch(`http://localhost:5000/leads/${id}`);
const data = await response.json();
return data;
};
