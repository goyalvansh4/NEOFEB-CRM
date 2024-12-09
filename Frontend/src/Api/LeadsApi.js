import GlobalAxios from './../../Global/GlobalAxios';

export const fetchLeads = async () => {
  console.log("fetchLeads");
  const response = await GlobalAxios.get(`/lead`);
  const data = response.data.data;
  console.log(data);
  return data;
};

export const fetchLeadById = async (id) => {
const response = await GlobalAxios.get(`/lead/${id}`);
console.log(response.data.data);
// console.log(data);
return data;
};
