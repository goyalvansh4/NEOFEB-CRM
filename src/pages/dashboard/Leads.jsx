import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useTable, usePagination } from "react-table";
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
    prepareRow,
    page, // Instead of using rows, use page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Set initial page size
    },
    usePagination
  );

  return (
    <Card className="shadow-lg rounded-lg my-10">
      <CardHeader className="p-4 border-b flex items-center justify-between bg-[#A05AFF] dark:bg-gray-800">
        <Typography variant="h5" className="text-[#FFF] dark:text-gray-100">
          Leads
        </Typography>
        <Button
         style={{ backgroundColor: "#FE9496" }}
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
            {page.map((row) => {
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
        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              style={{ backgroundColor: "#A05AFF" }}
              className="mr-2"
            >
              {"<<"}
            </Button>
            <Button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
             style={{ backgroundColor: "#A05AFF" }}
              className="mr-2"
            >
              {"<"}
            </Button>
            <Button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              style={{ backgroundColor: "#A05AFF" }}
              className="mr-2"
            >
              {">"}
            </Button>
            <Button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
             style={{ backgroundColor: "#A05AFF" }}
            >
              {">>"}
            </Button>
          </div>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(pageNumber);
              }}
              className="w-16 p-1 border rounded-md"
            />
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="ml-2 p-1 border rounded-md"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </CardBody>
    </Card>
  );
}

export default Leads;