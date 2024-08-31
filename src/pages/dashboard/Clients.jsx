import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { NavLink } from "react-router-dom";

export function Clients() {
  const data = React.useMemo(
    () => [
      { id: 1, name: "John Doe", status: "Active", email: "john@example.com" },
      { id: 2, name: "Jane Smith", status: "Inactive", email: "jane@example.com" },
      { id: 3, name: "Sam Wilson", status: "Pending", email: "sam@example.com" },
      { id: 4, name: "Lucy Brown", status: "Active", email: "lucy@example.com" },
      { id: 5, name: "Jake White", status: "Active", email: "jake@example.com" },
      { id: 6, name: "Emily Davis", status: "Inactive", email: "emily@example.com" },
      { id: 7, name: "John Doe", status: "Active", email: "john@example.com" },
      { id: 8, name: "Jane Smith", status: "Inactive", email: "jane@example.com" },
      { id: 9, name: "Sam Wilson", status: "Pending", email: "sam@example.com" },
      { id: 10, name: "Lucy Brown", status: "Active", email: "lucy@example.com" },
      { id: 11, name: "Jake White", status: "Active", email: "jake@example.com" },
      { id: 12, name: "Emily Davis", status: "Inactive", email: "emily@example.com" },
      // More data...
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              info.getValue() === "Active"
                ? "bg-green-100 text-green-800"
                : info.getValue() === "Inactive"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {info.getValue()}
          </span>
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
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 4 } },
  });

  return (
    <div className="mx-auto my-20 flex max-w-screen-xl flex-col gap-8">
      <Card className="shadow-lg rounded-lg">
        <CardHeader
          className="p-6 flex justify-between items-center"
          style={{ backgroundColor: "#A05AFF", color: "#FFF" }}
        >
          <Typography variant="h6">
            Client List
          </Typography>
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
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                color="indigo"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
            <div>
              <span className="text-sm text-gray-600">
                Page{" "}
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Clients;