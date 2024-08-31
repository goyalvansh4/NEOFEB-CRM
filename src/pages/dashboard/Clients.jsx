import React from "react";
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

export function Clients() {
  const data = React.useMemo(
    () => [
      { id: 1, name: "John Doe", status: "Active", email: "john@example.com" },
      { id: 2, name: "Jane Smith", status: "Inactive", email: "jane@example.com" },
      { id: 3, name: "Sam Wilson", status: "Pending", email: "sam@example.com" },
      { id: 4, name: "Lucy Brown", status: "Active", email: "lucy@example.com" },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: info => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: info => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: info => info.getValue(),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: info => info.getValue(),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <Card className="shadow-lg rounded-lg">
        <CardHeader variant="gradient" color="blue" className="p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Client List
          </Typography>
          <Button color="green" size="sm">
            Add Client
          </Button>
        </CardHeader>
        <CardBody className="px-6 py-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Clients;