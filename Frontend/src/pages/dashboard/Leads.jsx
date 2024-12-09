import { Skeleton } from "primereact/skeleton";
import React, { useEffect, useMemo, useState } from "react";
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
import { MdDelete, MdEdit } from "react-icons/md";
import { fetchLeads } from "../../Api/LeadsApi";
import GlobalAxios from "../../../Global/GlobalAxios";
import Swal from "sweetalert2";

export function Leads() {

  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchLeads = async () => {
      const response = await GlobalAxios.get("/lead");
      setIsLoading(true);
      if (response.data.status === "success") {
        setIsLoading(false);
        setLeads(response.data.data);
      } else {
        setIsLoading(false);
        setError(response.data.message);
      }
    }
    fetchLeads();
  }, []);

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      { Header: "S.No", accessor: (row, index) => index + 1 }, // Auto-generate S.No
      { Header: "Name", accessor: "leadName" },
      { Header: "Company", accessor: "companyName" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Lead Source", accessor: "source" },
      { Header: "Status", accessor: "leadStatus.leadStatus" },
    ],
    []
  );

  // Memoize data to prevent re-computation on each render
  const data = useMemo(() => leads || [], [leads]);

  // Set up the react-table instance with pagination
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
      initialState: { pageIndex: 0, pageSize: 10 }, // Default pagination settings
    },
    usePagination
  );

  // Handle "Add Lead" navigation
  const handleAddLead = () => navigate("/dashboard/addLead");

  // Handle "Follow Up" navigation
  const handleFollowUp = () => navigate("/dashboard/followUp");

  // Render loading skeleton
  if (isLoading) {
    return (
      <Card className="shadow-lg rounded-lg my-10">
        <CardHeader className="p-4 border-b flex items-center justify-between bg-[#A05AFF]">
          <Typography variant="h5" className="text-white">
            Leads
          </Typography>
          <Button className="bg-[#FE9496]" ripple={true} onClick={handleAddLead}>
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
    );
  }

  // Render error message
  if (error) {
    return <div>Error loading leads: {error.message}</div>;
  }

  // Render leads table
  return (
    <Card className="shadow-lg rounded-lg my-10">
      <CardHeader className="p-4 border-b flex items-center justify-between bg-[#A05AFF]">
        <Typography variant="h5" className="text-white">
          Leads
        </Typography>
        <div className="flex gap-2">
          <Button className="bg-[#02f1b9] text-[11px]" onClick={handleFollowUp}>
            Follow Up : {leads.follow_up_count}
          </Button>
          <Button className="bg-[#FE9496]" ripple={true} onClick={handleAddLead}>
            Add Leads
          </Button>
        </div>
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
                <th className="text-left px-4 py-2 text-xs font-semibold text-gray-700 uppercase">
                  Actions
                </th>
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
                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-sm text-gray-800"
                    >
                      {(cell.render("Cell").props.column.Header === "Name") ? <NavLink to={`${cell.render("Cell").props.data[0]._id}`}>
                        {cell.render("Cell")}
                      </NavLink> : cell.render("Cell")}
                    </td>
                  ))}
                  <td className="px-4 flex gap-2 text-sm text-gray-800">
                    <button
                      className="text-[18px] text-blue-500 px-2 py-1 rounded-lg"
                      onClick={() => navigate(`/dashboard/editLead/${row.original._id}`)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="text-[18px] text-red-500 px-2 py-1 rounded-lg"
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Are you sure?",
                          text: "This action cannot be undone!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#1BCFB4",
                          cancelButtonColor: "#FE9496",
                          confirmButtonText: "Yes, delete it!",
                        });

                        if (result.isConfirmed) {
                          try {
                            const response = await GlobalAxios.delete(`/lead/${row.original._id}`);
                            if (response.data.status === "success") {
                              Swal.fire({
                                title: "Deleted!",
                                text: "The lead has been deleted.",
                                icon: "success",
                              });
                              setLeads((prevLeads) =>
                                prevLeads.filter((lead) => lead._id !== row.original._id)
                              );
                            } else {
                              Swal.fire({
                                title: "Error!",
                                text: "Failed to delete the lead. Please try again.",
                                icon: "error",
                              });
                            }
                          } catch (error) {
                            console.error("Error deleting lead:", error);
                            Swal.fire({
                              title: "Error!",
                              text: "Something went wrong while deleting the lead.",
                              icon: "error",
                            });
                          }
                        }
                      }}
                    >
                      <MdDelete />
                    </button>

                  </td>
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
            Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) =>
                gotoPage(Number(e.target.value) - 1 || 0)
              }
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