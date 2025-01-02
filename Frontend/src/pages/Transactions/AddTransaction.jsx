import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSave } from 'react-icons/fa';
import GlobalAxios from './../../../Global/GlobalAxios';

const AddTransaction = () => {
  const { id } = useParams();
  const [bankDetails, setBankDetails] = useState({});
  const [clients, setClients] = useState([]);
  const [transaction, setTransaction] = useState({
    transaction_number: '',
    transaction_date: '',
    transaction_amount: '',
    transaction_type: '',
    transaction_description: '',
    transaction_status: '',
    transaction_remarks: '',
    transaction_client: '',
  });

  useEffect(() => {
    GlobalAxios.get(`/bank/${id}`)
      .then(response => setBankDetails(response.data.data))
      .catch(() => toast.error('Error fetching bank details'));

    GlobalAxios.get('/client')
      .then(response => setClients(response.data.data))
      .catch(() => toast.error('Error fetching clients'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'transaction_type'){
      setTransaction({ ...transaction, transaction_type: e.target.nextElementSibling.innerText });
      console.log(e.target.nextElementSibling.innerText,transaction);
    }
    else{
      setTransaction({ ...transaction, [name]: value });
    }
  };

  const handleTransactionValidation = () => {
    console.log(transaction);
    const { transaction_type, transaction_amount } = transaction;
    const amount = parseInt(transaction_amount);
   console.log(transaction_type, amount);
    if (!transaction_type || isNaN(amount)) {
      toast.error('Please provide valid transaction type and amount');
      return false;
    }

    if (transaction_type === 'debit') {
      if (amount > balance) {
        toast.error(`Bank balance is low. Current balance: ₹${balance}`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleTransactionValidation();
       
    const { transaction_type, transaction_amount } = transaction;
    const amount = parseInt(transaction_amount);

    // Update balance based on transaction type
    if (transaction_type === 'credit') {
      setBalance((prev) => prev + amount);
    } else if (transaction_type === 'debit') {
      setBalance((prev) => prev - amount);
    }

    GlobalAxios.post('/transaction', { ...transaction, transaction_bank: id })
      .then(() => toast.success('Transaction added successfully'))
      .catch(() => toast.error('Error adding transaction'));
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-purple-600">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-600">Bank Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Bank Name</label>
              <input
                type="text"
                value={bankDetails.bank_name || ''}
                readOnly
                className="w-full p-2 border border-gray-600 rounded text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Account Number</label>
              <input
                type="text"
                value={bankDetails.bank_account || ''}
                readOnly
                className="w-full p-2 border border-gray-600 rounded text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">IFSC Code</label>
              <input
                type="text"
                value={bankDetails.ifsc_code || ''}
                readOnly
                className="w-full p-2 border border-gray-600 rounded text-gray-700"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-600">Transaction Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Transaction Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="transaction_number"
                placeholder="Transaction Number"
                value={transaction.transaction_number}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Transaction Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="transaction_date"
                value={transaction.transaction_date}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label className="block text-gray-700 mb-2">Transaction Amount <span className="text-red-500">*</span></label>
              <input
                type="number"
                name="transaction_amount"
                placeholder="Transaction Amount"
                required
                value={transaction.transaction_amount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded focus:ring-2 focus:ring-primary"
              />
              <p className="text-sm text-gray-500 mt-1">Current Balance: ₹{bankDetails.balance}</p>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Amount Type <span className="text-red-500">*</span></label>
              <div className='flex gap-4 items-center mt-2'>
                <label className='flex items-center gap-2'>
                  <input
                    type="radio"
                    required
                    name="transaction_type"
                    value="credit"
                    onChange={handleChange}
                  />
                  <span className='text-lg text-green-500'>Credit</span>
                </label>
                <label className='flex items-center gap-2'>
                  <input
                    type="radio"
                    required
                    name="transaction_type"
                    value="debit"
                    onChange={handleChange}
                  />
                  <span className='text-lg text-red-500'>Debit</span>
                </label>
              </div>
            </div>
            </div>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Transaction Description <span className="text-red-500">*</span></label>
              <textarea
                name="transaction_description"
                placeholder="Transaction Description"
                value={transaction.transaction_description}
                required
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Transaction Status <span className="text-red-500">*</span></label>
              <select name="transaction_status"
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded focus:ring-2 focus:ring-primary">
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Transaction Remarks <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="transaction_remarks"
                placeholder="Transaction Remarks"
                required
                value={transaction.transaction_remarks}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-600">Assign To</h3>
          <div>
            <label className="block text-gray-700 mb-2">Client <span className="text-red-500">*</span></label>
            <select
              name="transaction_client"
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Client</option>
              {clients.map(client => (
                <option key={client._d} value={client._id}>{client.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white p-3 rounded flex items-center justify-center w-full md:w-auto transition-all"
          >
            <FaSave className="mr-2" /> Save Transaction
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddTransaction;