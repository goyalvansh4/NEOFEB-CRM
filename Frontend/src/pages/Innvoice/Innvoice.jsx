import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Button,
  Typography,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  IconButton,
} from '@material-tailwind/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import GlobalAxios from '../../../Global/GlobalAxios';
import AddInvoice from './AddInnvoice';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

const Invoice = () => {
  

  const [data, setData] = useState([]);
  const [hideForm, setHideForm] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [statusList, setStatusList] = useState([]);
  const [editingStatusId, setEditingStatusId] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await GlobalAxios.get('/invoice');
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await GlobalAxios.get('/invoiceStatus'); // Assuming there's an API endpoint to get all statuses
        console.log(response.data.data);
        setStatusList(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStatuses();
  }, []);

  const openStatusModal = () => {
    setShowStatusModal(true);
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    setStatusText('');
    setEditingStatusId(null);
  };

  const handleStatusChange = (e) => {
    setStatusText(e.target.value);
  };

  const handleAddStatus = async () => {
    if (statusText.trim() === '') return;
    try {
      const response = await GlobalAxios.post('/invoiceStatus', { invoiceStatus: statusText }); // Assuming there's an API endpoint to add status
      setStatusList((prevStatuses) => [...prevStatuses, response.data.data]);
      setStatusText('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditStatus = async (id, newStatus) => {
    try {
      const response = await GlobalAxios.put(`/invoiceStatus/${id}`, { invoiceStatus: newStatus }); // Assuming there's an API endpoint to update status
      if(response.data.status === 'success') {
        console.log('Status updated successfully');
        setStatusList((prevStatuses) =>
          prevStatuses.map((status) =>
            status._id === id ? { ...status, invoiceStatus: newStatus } : status
          )
        );
        setStatusText('');
        setEditingStatusId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteStatus = async (id) => {
    try {
      const response = await GlobalAxios.delete(`/invoiceStatus/${id}`); // Assuming there's an API endpoint to delete status
      if(response.data.status === 'success'){
       setStatusList((prevStatuses) => prevStatuses.filter((status) => status._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        accessorKey: '',
        header: 'ID',
        cell: (info) => `${info.row.index + 1}`,
      },
      {
        accessorKey: 'invoice_date',
        header: 'Due Date',
        cell: (info) => `${info.getValue()}`,
      },
      {
        accessorKey: 'client_name',
        header: 'Client',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'total',
        header: 'Amount',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'invoiceStatus.invoiceStatus',
        header: 'Status',
        cell: (info) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              info.getValue() === 'Paid'
                ? 'bg-green-100 text-green-800'
                : info.getValue() === 'Pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {info.getValue()}
          </span>
        ),
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
    <>
      {hideForm ? (
        <div className="min-h-screen text-white p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <Typography variant="h3" style={{ color: '#A05AFF' }} className="text-4xl">
                  Invoices
                </Typography>
                <Typography variant="small" className="text-gray-900">
                  There are {data.length} total invoices
                </Typography>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={openStatusModal}
                  className="inline-block px-4 py-2 rounded-lg bg-[#9E58FF] text-white text-sm font-medium hover:bg-[#FE9496] transition-all duration-300"
                >
                  + Add Status
                </Button>
                <Button
                  onClick={() => setHideForm(false)}
                  className="inline-block px-4 py-2 rounded-lg bg-[#9E58FF] text-white text-sm font-medium hover:bg-[#FE9496] transition-all duration-300"
                >
                  + New Invoice
                </Button>
              </div>
            </div>
            <Card className="shadow-lg">
              <CardBody>
                <div className="flex justify-end mb-4">
                  <Select label="Filter by status" color="white">
                    <Option value="all">All</Option>
                    <Option value="paid">Paid</Option>
                    <Option value="pending">Pending</Option>
                  </Select>
                </div>
                <table className="min-w-full divide-y divide-[#4BCBEB]">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="divide-y divide-[#4BCBEB]">
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
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
        </div>
      ) : (
        <AddInvoice setHideForm={setHideForm} />
      )}

      {/* Modal for Adding/Editing Status */}
      <Dialog open={showStatusModal} handler={closeStatusModal}>
        <DialogHeader>{editingStatusId ? 'Edit Status' : 'Add Status'}</DialogHeader>
        <DialogBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (editingStatusId) {
                handleEditStatus(editingStatusId, statusText);
              } else {
                handleAddStatus();
              }
            }}
          >
            <Input
              label="Status"
              value={statusText}
              onChange={handleStatusChange}
              required
            />
            <Button
              type="submit"
              className="bg-[#9E58FF] text-white mt-5"
            >
              {editingStatusId ? 'Update Status' : 'Submit'}
            </Button>
          </form>
          <div className="mt-4">
            <Typography variant="h6">Previous Statuses:</Typography>
            <ul className="mt-2">
              {statusList.map((item) => (
                <li key={item._id} className="flex justify-between items-center mt-2">
                  <span>{item.invoiceStatus}</span>
                  <div className="flex gap-3">
                    <IconButton
                      onClick={() => {
                        setEditingStatusId(item._id);
                        setStatusText(item.invoiceStatus);
                      }}
                      color="green"
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteStatus(item._id)}
                      color="red"
                    >
                      <FaTrash />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button onClick={closeStatusModal} color="gray">
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Invoice;