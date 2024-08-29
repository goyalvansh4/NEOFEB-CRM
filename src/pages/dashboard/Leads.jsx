import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";

export function Leads() {
  const data = React.useMemo(
    () => [
      {
        sNo: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        address: "123 Main St",
        mobile: "123-456-7890",
      },
      {
        sNo: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        address: "456 Maple Ave",
        mobile: "098-765-4321",
      },
      // Add more leads as needed
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "S.No",
        accessor: "sNo",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => (
          <Link
            to={`/leads/${value}`}
            className="text-blue-500 hover:underline"
          >
            {value}
          </Link>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Mobile No",
        accessor: "mobile",
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
      <CardHeader
        className="p-4 border-b flex items-center justify-between bg-blue-50 dark:bg-gray-800"
      >
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
        <table
          {...getTableProps()}
          className="min-w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden"
        >
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