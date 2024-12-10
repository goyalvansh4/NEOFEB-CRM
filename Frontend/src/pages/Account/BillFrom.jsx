import React, { useEffect, useState } from "react";
import { Select, Option, Typography } from "@material-tailwind/react";
import GlobalAxios from "../../../Global/GlobalAxios";

const BillFrom = ({ selectedCompany, setSelectedCompany }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await GlobalAxios.get("/companies");
        setCompanies(response.data.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleCompanyChange = (value) => {
    const company = companies.find((c) => c.name === value);
    setSelectedCompany(company);
  };

  return (
    <div className="mb-6">
      <Typography variant="h6" className="mb-4 text-lg font-medium" style={{ color: "#9E58FF" }}>
        Bill From
      </Typography>
      <Select
        label="Select Company"
        value={selectedCompany?.name || ""}
        onChange={handleCompanyChange}
        required
      >
        {companies.map((company) => (
          <Option key={company._id} value={company.name}>
            {company.name}
          </Option>
        ))}
      </Select>
      {selectedCompany && (
        <div className="mt-4">
          <p><strong>Address:</strong> {selectedCompany.address}</p>
          <p><strong>City:</strong> {selectedCompany.city}</p>
          <p><strong>State:</strong> {selectedCompany.state}</p>
          <p><strong>Country:</strong> {selectedCompany.country}</p>
        </div>
      )}
    </div>
  );
};

export default BillFrom;
