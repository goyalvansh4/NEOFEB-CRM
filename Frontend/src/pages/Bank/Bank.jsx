import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import GlobalAxios from '../../../Global/GlobalAxios';

const BankCard = ({ bank, onEdit, onDelete }) => {
  return (
    <div className="bg-gradient-to-r from-[#A05AFF] to-[#9348fc] shadow-lg rounded-lg p-6 mb-4 relative">
      <button className="absolute top-4 right-4 bg-[#FE9496] text-white px-4 py-2 rounded-full hover:bg-red-500 transition duration-200">
        Add Transaction
      </button>
      <h2 className="text-2xl font-bold text-white mb-2">{bank.bank_name}</h2>
      <p className="text-white mb-1">
        <strong>Account Holder Name:</strong> {bank.account_holder_name}
      </p>
      <p className="text-white mb-1">
        <strong>Bank Account:</strong> {bank.bank_account}
      </p>
      <p className="text-white mb-1">
        <strong>IFSC Code:</strong> {bank.ifsc_code}
      </p>
      <p className="text-white mb-1 flex items-center">
        <strong>Status:</strong>
        {bank.status === 'Active' ? (
          <FaCheckCircle className="text-[#1BCFB4] ml-2" />
        ) : (
          <FaTimesCircle className="text-[#FE9496] ml-2" />
        )}
        {bank.status}
      </p>
      <div className="flex gap-2 mt-2 justify-end">
        <button
          onClick={() => onEdit(bank)}
          className="bg-white text-[#A05AFF] px-4 py-2 rounded-lg hover:bg-[#4BCBEB] transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(bank)}
          className="bg-white text-[#FE9496] px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const Bank = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bankData, setBankData] = useState({
    bank_name: '',
    account_holder_name: '',
    bank_account: '',
    ifsc_code: '',
    status: '',
  });
  const [bankDetails, setBankDetails] = useState([]);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await GlobalAxios.get('/bank');
        setBankDetails(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBankDetails();
  }, []);

  const handleDelete = async (bank) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${bank.bank_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#A05AFF',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await GlobalAxios.delete(`/bank/${bank._id}`);
          if (response.data.status === 'success') {
            Swal.fire({
              title: 'Deleted!',
              text: 'The bank has been deleted.',
              icon: 'success',
              confirmButtonColor: '#A05AFF',
              confirmButtonText: 'Deleted!',
            });
            setBankDetails(bankDetails.filter((item) => item._id !== bank._id));
          }
        } catch (error) {
          console.log(error);
          Swal.fire('Error!', 'Failed to delete the record.', 'error');
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isEditing
        ? await GlobalAxios.put(`/bank/${bankData._id}`, bankData)
        : await GlobalAxios.post('/bank', bankData);

      if (response.data.status === 'success') {
        Swal.fire({
           title:'Success!',
           confirmButtonColor: '#A05AFF',
           text:`Bank ${isEditing ? 'updated' : 'added'} successfully!`,
           icon:'success',
           confirmButtonText: 'Ok',
          });
        setBankDetails((prevDetails) => {
          if (isEditing) {
            return prevDetails.map((item) => (item._id === bankData._id ? bankData : item));
          }
          return [...prevDetails, response.data.data];
        });
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error!', 'Failed to submit the form.', 'error');
    }
  };

  return (
    <>
      <div className="mx-auto py-8 px-2">
        <div className="flex justify-between items-center mx-auto my-5 p-2">
          <h1 className="text-xl font-bold text-gray-800">Bank Accounts</h1>
          <button
            onClick={() => {
              setBankData({
                bank_name: '',
                account_holder_name: '',
                bank_account: '',
                ifsc_code: '',
                status: '',
              });
              setIsEditing(false);
              setShowModal(true);
            }}
            className="bg-[#A05AFF] text-[14px] text-white py-2 px-3 hover:bg-[#4BCBEB] transition duration-200 rounded-lg"
          >
            Add Bank
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {bankDetails.map((bank) => (
            <BankCard
              key={bank._id}
              bank={bank}
              onEdit={(bank) => {
                setBankData(bank);
                setIsEditing(true);
                setShowModal(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-[150px] left-[50%] transform -translate-x-1/2 bg-gray-300 w-[400px] rounded-xl z-50 p-6 shadow-lg">
          <h3 className="text-xl text-center text-primary my-4">
            {isEditing ? 'Edit Bank' : 'Add Bank'}
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              value={bankData.bank_name}
              onChange={(e) => setBankData({ ...bankData, bank_name: e.target.value })}
              type="text"
              className="border border-gray-500 rounded-md px-2 py-2"
              placeholder="Bank Name"
              required
            />
            <input
              value={bankData.account_holder_name}
              onChange={(e) =>
                setBankData({ ...bankData, account_holder_name: e.target.value })
              }
              type="text"
              className="border border-gray-500 rounded-md px-2 py-2"
              placeholder="Account Holder Name"
              required
            />
            <input
              value={bankData.bank_account}
              onChange={(e) => setBankData({ ...bankData, bank_account: e.target.value })}
              type="number"
              className="border border-gray-500 rounded-md px-2 py-2"
              placeholder="Bank Account No"
              required
            />
            <input
              value={bankData.ifsc_code}
              onChange={(e) => setBankData({ ...bankData, ifsc_code: e.target.value })}
              type="text"
              className="border border-gray-500 rounded-md px-2 py-2"
              placeholder="IFSC Code"
              required
            />
            <select
              value={bankData.status}
              onChange={(e) => setBankData({ ...bankData, status: e.target.value })}
              className="border border-gray-500 rounded-md px-2 py-2"
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="bg-[#A05AFF] text-white py-2 px-3 rounded-lg hover:bg-[#4BCBEB] transition duration-200"
              >
                {isEditing ? 'Update' : 'Add'} Bank
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-[#FE9496] text-white py-2 px-3 rounded-lg hover:bg-red-500 transition duration-200"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Bank;