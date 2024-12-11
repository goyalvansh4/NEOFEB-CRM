import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalAxios from "../../../Global/GlobalAxios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState(null);
  const { id } = useParams();
  const printRef = useRef();

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const response = await GlobalAxios.get(`/invoice/${id}`);
        if (response.data.status === "success") {
          setInvoice(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvoiceDetails();
  }, []);

  if (!invoice) {
    return <div className="text-center text-gray-600">Loading Invoice Details...</div>;
  }

  const {
    invoice_number,
    companyBill_id,
    client_id,
    items,
    invoice_date,
    payment_terms,
    totalAmount,
    invoiceStatus,
  } = invoice;


  // Handle PDF generation
  const handlePrint = async()=>{
    const invoiceElement = printRef.current; // Ref to the invoice content
    const canvas = await html2canvas(invoiceElement, { scale: 1.5 }); // Higher scale for better quality
    const imgData = canvas.toDataURL("image/png",0.5);

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${invoice_number}.pdf`);
  }


  
  return (

    <>
    <div className="flex justify-between items-center mt-5">
        <h1 className="text-2xl font-bold text-purple-700">Invoice Details</h1>
        <button
          onClick={handlePrint}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Download PDF
        </button>
      </div>

    <div ref={printRef} className="max-w-4xl mx-auto bg-white p-8 shadow-lg border border-gray-200 mt-8">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-700">Invoice</h1>
          <p className="text-sm text-gray-600">Invoice #{invoice_number}</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold text-gray-800">{companyBill_id.name}</h2>
          <p className="text-sm text-gray-600">{companyBill_id.address}</p>
          <p className="text-sm text-gray-600">{companyBill_id.city}, {companyBill_id.state}, {companyBill_id.country}</p>
          <p className="text-sm text-gray-600">Email: {companyBill_id.email}</p>
          <p className="text-sm text-gray-600">Phone: {companyBill_id.mobile}</p>
        </div>
      </div>

      {/* Client Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-purple-700">Bill To:</h3>
        <p className="text-sm text-gray-800">{client_id.name}</p>
        <p className="text-sm text-gray-600">{client_id.company_name}</p>
        <p className="text-sm text-gray-600">{client_id.address}, {client_id.city}, {client_id.state}, {client_id.country}</p>
        <p className="text-sm text-gray-600">Email: {client_id.email}</p>
        <p className="text-sm text-gray-600">Phone: {client_id.phone_number}</p>
      </div>

      {/* Invoice Date & Status */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-purple-700">Invoice Date</h3>
          <p className="text-sm text-gray-600">{new Date(invoice_date).toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-purple-700">Payment Terms</h3>
          <p className="text-sm text-gray-600">{payment_terms} days</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Status</h3>
          <a
            className={`text-md px-2 py-2 rounded-md font-medium  ${
              invoiceStatus.invoiceStatus === "Paid"
                ? "text-green-800"
                : "text-red-500"
            }`}
          >
            {invoiceStatus.invoiceStatus}
          </a>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-purple-700 mb-4">Items</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left text-sm text-gray-700">#</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm text-gray-700">Item Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm text-gray-700">Description</th>
              <th className="border border-gray-200 px-4 py-2 text-center text-sm text-gray-700">Quantity</th>
              <th className="border border-gray-200 px-4 py-2 text-right text-sm text-gray-700">Price</th>
              <th className="border border-gray-200 px-4 py-2 text-right text-sm text-gray-700">GST(%)</th>
              <th className="border border-gray-200 px-4 py-2 text-right text-sm text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">{item.itemName}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">{item.description}</td>
                <td className="border border-gray-200 px-4 py-2 text-center text-sm text-gray-700">{item.qty}</td>
                <td className="border border-gray-200 px-4 py-2 text-right text-sm text-gray-700">₹{item.price}</td>
                <td className="border border-gray-200 px-4 py-2 text-right text-sm text-gray-700">{item.igst ? item.igst : item.sgst+item.cgst}%</td>
                <td className="border border-gray-200 px-4 py-2 text-right text-sm text-gray-700">₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="text-right">
        <h3 className="text-lg font-semibold text-gray-800">Total Amount: ₹{totalAmount}</h3>
      </div>
    </div>
  </>
  );
};

export default InvoiceDetails;