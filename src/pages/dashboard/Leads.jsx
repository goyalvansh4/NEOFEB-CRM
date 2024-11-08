import { Skeleton } from "primereact/skeleton";
import React, { useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { fetchLeads } from "../../Api/LeadsApi";



export function Leads() {
  const navigate = useNavigate(); // Use the navigate function from react-router-dom
   
  const { data: leads, error, isLoading } = useQuery({
    queryKey: ["leadsData"],
    queryFn: async () => await fetchLeads(),
  });

  const columns = useMemo(
    () => [
      { Header: "S.No", accessor: "id" },
      {
        Header: "Name",
        accessor: "leadName",
        Cell: ({ row }) => (
          <NavLink
            to={`/dashboard/leads/${row.original.id}`}
            className="text-[#1BCFB4] hover:underline"
          >
            {row.original.leadName}
          </NavLink>
        ),
      },
      { Header: "Company", accessor: "company" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Lead Source", accessor: "leadSource" },
    ],
    []
  );

  const data = useMemo(() => leads || [], [leads]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
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
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );


  


  if (isLoading) {
    return (
      <>
      <Card className="shadow-lg rounded-lg my-10">
        <CardHeader className="p-4 border-b flex items-center justify-between bg-[#A05AFF]">
          <Typography variant="h5" className="text-white">
            Leads
          </Typography>
          
          <Button
            className="bg-[#FE9496]"
            ripple={true}
            onClick={() => navigate("/dashboard/addLead")} // Navigate to Add Lead route
          >
            Add Leads
          </Button>
        </CardHeader>
        <CardBody className="p-4 overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                {["S.No", "Lead Name", "Company", "Email", "Phone", "Lead Source"].map(
                  (header, index) => (
                    <th
                      key={index}
                      className="text-left px-4 py-2 text-xs font-semibold text-gray-700 uppercase"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Show skeleton rows */}
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 text-sm">
                    <Skeleton width="50px" />
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <Skeleton width="150px" />
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <Skeleton width="100px" />
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <Skeleton width="180px" />
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <Skeleton width="120px" />
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <Skeleton width="100px" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      </>
    );
  }

  if (error) {
    return <div>Error loading leads: {error.message}</div>;
  }

  return (
    <>
    <Card className="shadow-lg rounded-lg my-10">
      <CardHeader className="p-4 border-b flex items-center justify-between bg-[#A05AFF]">
        <Typography variant="h5" className="text-white">
          Leads
        </Typography>
        
        <Button
          className="bg-[#FE9496]"
          ripple={true}
          onClick={() => navigate("/dashboard/addLead")} // Navigate to Add Lead route
        >
          Add Leads
        </Button>
      </CardHeader>
      <CardBody className="p-4 overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full bg-white rounded-lg overflow-hidden"
        >
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="text-left px-4 py-2 text-xs font-semibold text-gray-700 uppercase"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="divide-y divide-gray-200"
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-100"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-sm text-gray-800"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="bg-[#A05AFF] mr-2"
              ripple={true}
            >
              {"<<"}
            </Button>
            <Button
              onClick={previousPage}
              disabled={!canPreviousPage}
              className="bg-[#A05AFF] mr-2"
              ripple={true}
            >
              {"<"}
            </Button>
            <Button
              onClick={nextPage}
              disabled={!canNextPage}
              className="bg-[#A05AFF] mr-2"
              ripple={true}
            >
              {">"}
            </Button>
            <Button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="bg-[#A05AFF]"
              ripple={true}
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
              onChange={(e) => gotoPage(Number(e.target.value) - 1 || 0)}
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
    </>
  );
}

export default Leads;