import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Spinner, // Import Spinner from Material-Tailwind
  Input, // Import Input for the search field
  Select, // Import Select for dropdowns
  Option, // Import Option for Select dropdown
} from "@material-tailwind/react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import GlobalAxios from "../../../Global/GlobalAxios";
import axios from "axios";

export function Clients() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial values from search params
  const initialPageIndex = parseInt(searchParams.get("page")) - 1 || 0;
  const initialSearch = searchParams.get("search") || "";
  const initialOrderBy = searchParams.get("order_by") || "new_first";
  const initialPerPage = parseInt(searchParams.get("per_page")) || 10;
  const [isEmpty,setISEmpty] = useState(true);

  const [pagination, setPagination] = useState({
    pageIndex: initialPageIndex,
    pageSize: initialPerPage,
  });

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [perPage, setPerPage] = useState(initialPerPage);

  // Debouncing the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000); // Delay of 1000ms

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Sync pagination, debounced search, order_by, and per_page with URL
  useEffect(() => {
    setSearchParams({
      page: pagination.pageIndex + 1,
      search: debouncedSearch,
      order_by: orderBy,
      per_page: perPage,
    });
  }, [pagination.pageIndex, debouncedSearch, orderBy, perPage, setSearchParams]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["clients", pagination.pageIndex, debouncedSearch, orderBy, perPage],
    queryFn: async () => {
      const response = await axios.get(
        `https://neofeb.onrender.com/client`, {
          params: {
            page: pagination.pageIndex + 1,
            per_page: perPage,
            search: debouncedSearch,
            order_by: orderBy,
          },
        }
      );
      if(response.data.data.length > 0){
        setISEmpty(false);
      }
      return response.data;
    },
    keepPreviousData: true,
  });

  // const data=[];
  // const isLoading=false;
  // const isError=false;

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Client Id",
        cell: (info) => "#" + info.getValue(),
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
        accessorKey: "phone_number",
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
    pageCount: data?.pagination?.total_pages || 1,
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
      pageIndex: Math.max(0, prev.pageIndex - 1),
    }));
  };

  const handleNextPage = () => {
    if (pagination.pageIndex < data?.pagination?.total_pages - 1) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner className="h-12 w-12 text-indigo-500" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">Error loading data.</div>
    );
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
          {/* Search and Filter Section */}
          <div className="flex justify-between items-center mb-6">
            <Input
              label="Search Client"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mr-4 w-1/3"
            />
            <Select
              label="Order By"
              value={orderBy}
              onChange={(e) => setOrderBy(e)}
              className="mr-4 w-full"
            >
              <Option value="old_first">Old First</Option>
              <Option value="new_first">New First</Option>
            </Select>
            <Select
              label="Per Page"
              value={perPage}
              onChange={(e) => setPerPage(parseInt(e))}
              className="w-full"
            >
              <Option value={10}>10</Option>
              <Option value={20}>20</Option>
              <Option value={30}>30</Option>
              <Option value={40}>40</Option>
              <Option value={50}>50</Option>
            </Select>
          </div>


          {isEmpty 
          ? 
          <div className="text-center text-gray-500">No Clients found.</div>
          :
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                    <button onClick={handleEdit} className="px-2 py-1 bg-blue-500 text-white rounded-sm">
                      Edit
                    </button>
                    <button onClick={handleDelete} className="px-2 py-1 bg-red-500 text-white rounded-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          }
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                color="indigo"
                onClick={handlePreviousPage}
                disabled={pagination.pageIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                color="indigo"
                onClick={handleNextPage}
                disabled={pagination.pageIndex >= data?.pagination?.total_pages - 1}
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