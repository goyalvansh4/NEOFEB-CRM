import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useTable } from "react-table";
import { NavLink } from "react-router-dom";
import { fetchLeads } from "../../Api/LeadsApi";

export function Leads() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLeads().then((data) => setData(data));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "S.No",
        accessor: "id",
      },
      {
        Header: "Lead Name All",
        accessor: "leadNameAll",
        Cell: ({ row }) => (
          <NavLink to={`/dashboard/leads/${row.original.id}`} className="text-blue-500 hover:underline">
            {row.original.leadNameAll}
          </NavLink>
        ),
      },
      {
        Header: "Company",
        accessor: "company",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Lead Source",
        accessor: "leadSource",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <Card className="shadow-lg rounded-lg mt-6">
      <CardHeader className="p-4 border-b flex items-center justify-between bg-blue-50 dark:bg-gray-800">
        <Typography variant="h5" className="text-gray-800 dark:text-gray-100">
          Leads
        </Typography>
        <Button
          color="blue"
          className="bg-blue-500"
          ripple="light"
          onClick={() => console.log("Add Leads")}
        >
          Add Leads
        </Button>
      </CardHeader>
      <CardBody className="p-4 overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="text-left px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200 dark:divide-gray-700">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-sm text-gray-800 dark:text-gray-300"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default Leads;