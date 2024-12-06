import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import AddInvoice from './AddInnvoice';
import GlobalAxios from '../../../Global/GlobalAxios';


const Invoice = () => {
  const data = React.useMemo(
    () => [
      {
        id: '#RT3080',
        dueDate: '19 Aug 2021',
        client: 'Jensen Huang',
        amount: '800.9Rs',
        status: 'Paid',
      },
      {
        id: '#XM9141',
        dueDate: '20 Sep 2021',
        client: 'Alex Grim',
        amount: '556Rs',
        status: 'Pending',
      },
      // Add more dummy data here
    ],
    []
  );

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await GlobalAxios.get('/invoice');
        setInvoices(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchInvoices();
  }, []);

  

  const [hideForm, setHideForm] = useState(true);
  


  const openForm = () => {
    setHideForm(false);
  };

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'dueDate',
        header: 'Due Date',
        cell: info => `Due ${info.getValue()}`,
      },
      {
        accessorKey: 'client',
        header: 'Client',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: info => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              info.getValue() === 'Paid'
                ? 'bg-green-100 text-green-800'
                : info.getValue() === 'Pending'
                ? 'bg-yellow-100 text-yellow-800'
                : ''
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
   <> {hideForm ? <div className="min-h-screen text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Typography variant="h3" style={{color:"#A05AFF"}} className="text-4xl">
              Invoices
            </Typography>
            <Typography variant="small" className="text-gray-900">
              There are {data.length} total invoices
            </Typography>
          </div>
          <Button
            onClick={openForm}
            className="inline-block px-4 py-2 rounded-lg bg-[#9E58FF] text-white text-sm font-medium hover:bg-[#FE9496] transition-all duration-300"
          >
            + New Invoice
          </Button>
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
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
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
              <tbody className=" divide-y divide-[#4BCBEB]">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
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
          </CardBody>
        </Card>
      </div>
      
    </div>
    : <AddInvoice setHideForm={setHideForm}  />}
    </>
  );
};

export default Invoice;