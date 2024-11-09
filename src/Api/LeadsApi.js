import GlobalAxios from "../../Global/GlobalAxios";

export const fetchLeads = async () => {
  const response = await GlobalAxios.get(`/leads`);
  const data = response.data.data.data;
  console.log(data);
  return data;
};

export const fetchLeadById = async (id) => {
const response = await fetch(`https://66d7e6d837b1cadd80529ccf.mockapi.io/admin/api/v1/leads?id=${id}`);
const data = await response.json();
// console.log(data);
return data;
};
