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

export function Leads () {
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
    <Card className="shadow-lg rounded-lg my-10">
      <CardHeader
        className="p-4 border-b flex items-center justify-between"
      >
        <Typography variant="h5" className="text-gray-800">
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
      <CardBody className="p-4 overflow-x-auto my-10">
        <table
          {...getTableProps()}
          className="min-w-full bg-white dark:bg-gray-800"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="text-left px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b dark:border-gray-700">
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
};

export default Leads;
