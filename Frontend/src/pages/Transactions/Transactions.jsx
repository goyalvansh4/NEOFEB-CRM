import React, { useEffect, useState } from "react";
import GlobalAxios from "../../../Global/GlobalAxios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await GlobalAxios.get("/transaction");
        console.log(response.data.data);
        setTransactions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await GlobalAxios.get("/client");
        console.log(response.data.data);
        setClients(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
    fetchClients();
  }, []);

  const assignTransactionToClient = async (transactionId, clientId) => {
    console.log("Assigning transaction:", transactionId, clientId);
    try {
      const response = await GlobalAxios.put(`/transaction/${transactionId}`, {
        transaction_client:clientId,
      });
      console.log("Transaction assigned successfully:", response.data);

      const updatedTransactions = await GlobalAxios.get("/transaction");
      setTransactions(updatedTransactions.data.data);
    } catch (error) {
      console.error("Error assigning transaction:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-purple-600">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-500 shadow-md rounded-lg px-1">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="border border-gray-300 px-4 py-2">S.No</th>
              <th className="border border-gray-300 px-4 py-2">Transaction No</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Balance</th>
              <th className="border border-gray-300 px-4 py-2">Assign</th>
            </tr>
          </thead>
          <tbody className="text-center border border-gray-300">
            {transactions.map((transaction, index) => (
              <tr key={transaction._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_number}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_date}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_amount}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full ${transaction.transaction_type === "credit" ? "bg-green-500" : "bg-red-500"
                      }`}
                  >
                    {transaction.transaction_type}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_description}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_bank.balance || "--"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {transaction.transaction_client ? (
                    <span>{transaction.transaction_client.name}</span>
                  ) : (
                    <div>
                      <select
                        onChange={(e)=>{setSelectedClient(e.target.value)}}
                        defaultValue=""
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="" disabled>
                          Assign Client
                        </option>
                        {clients.map((client) => (
                          <option key={client._id} value={client._id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                      <button
                        className="ml-2 bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
                        onClick={() =>
                          assignTransactionToClient(transaction._id, selectedClient)
                        }
                      >
                        Assign
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;