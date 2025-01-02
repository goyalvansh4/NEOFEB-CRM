import React, { useEffect, useState } from 'react';
import GlobalAxios from '../../../Global/GlobalAxios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await GlobalAxios.get('/transaction');
        console.log(response.data.data);
        setTransactions(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-purple-600">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="border border-gray-300 px-4 py-2">S.No</th>
              <th className="border border-gray-300 px-4 py-2">Trans Number</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Assign</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_number}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_date}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_amount}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_type}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_description}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_status}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
