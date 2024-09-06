import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function Clients() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Set the initial pageIndex from URL, convert from 1-based index to 0-based
  const initialPageIndex = parseInt(searchParams.get("page")) - 1 || 0;

  const [pagination, setPagination] = useState({
    pageIndex: initialPageIndex,
    pageSize: 10,
  });

  // Sync pagination with URL on pageIndex change (1-based index in URL)
  useEffect(() => {
    setSearchParams({ page: pagination.pageIndex + 1 });
  }, [pagination.pageIndex, setSearchParams]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["clients", pagination.pageIndex],
    queryFn: async () => {
      const response = await axios.get(
        `http://192.168.43.152:8000/api/v1/admin/clients?page=${
          pagination.pageIndex + 1
        }&per_page=${pagination.pageSize}`
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  const columns = React.useMemo(
    () => [
      {
        accessorFn: (row, i) => i + 1 + pagination.pageIndex * pagination.pageSize, // S.No with correct pagination
        header: "S.No",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => (
          <NavLink
            to={`/dashboard/client/${info.row.original.id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            {info.getValue()}
          </NavLink>
        ),
      },
      {
        accessorKey: "company_name",
        header: "Company Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
        cell: (info) => (
          <a
            href={`tel:${info.getValue()}`}
            className="text-blue-500 hover:text-blue-700"
          >
            {info.getValue()}
          </a>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => (
          <a
            href={`mailto:${info.getValue()}`}
            className="text-blue-500 hover:text-blue-700"
          >
            {info.getValue()}
          </a>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              info.getValue() === "active"
                ? "bg-green-100 text-green-800"
                : info.getValue() === "inactive"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      },
    ],
    [pagination.pageIndex, pagination.pageSize]
  );

  const table = useReactTable({
    data: data?.data || [],
    columns,
    pageCount: data?.pagination?.total_pages || 1, // Set total pages based on API data
    manualPagination: true,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePreviousPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.max(0, prev.pageIndex - 1), // Ensure we don't go below 0
    }));
  };

  const handleNextPage = () => {
    if (pagination.pageIndex < data?.pagination?.total_pages - 1) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1, // Go to the next page
      }));
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  if (isError) {
    return <div className="text-center mt-10 text-red-500">Error loading data.</div>;
  }

  return (
    <div className="mx-auto my-20 max-w-screen-xl flex flex-col gap-8">
      <Card className="shadow-lg rounded-lg">
        <CardHeader
          className="p-6 flex justify-between items-center"
          style={{ backgroundColor: "#A05AFF", color: "#FFF" }}
        >
          <Typography variant="h6">Client List</Typography>
          <NavLink
            to={`/dashboard/addClient`}
            className="inline-block px-4 py-2 rounded-lg bg-[#FE9496] text-white text-sm font-medium hover:bg-[#f97b7d] transition-all duration-300"
          >
            Add Client
          </NavLink>
        </CardHeader>
        <CardBody className="px-6 py-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                color="indigo"
                onClick={handlePreviousPage}
                disabled={pagination.pageIndex === 0} // Disable if already on first page
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                color="indigo"
                onClick={handleNextPage}
                disabled={pagination.pageIndex >= data?.pagination?.total_pages - 1} // Disable if already on last page
              >
                Next
              </Button>
            </div>
            <div>
              <span className="text-sm text-gray-600">
                Page{" "}
                <strong>
                  {pagination.pageIndex + 1} of {data?.pagination?.total_pages}
                </strong>{" "}
                | Total Clients: {data?.pagination?.total_rows}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Clients;
