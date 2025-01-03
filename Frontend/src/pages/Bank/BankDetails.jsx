import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import GlobalAxios from '../../../Global/GlobalAxios';

const PrimaryColor = '#4BCBEB';
const SecondaryColor = '#FE9496';
const TextColor = '#333';

const BankDetails = () => {
  const { id } = useParams();
  const [bankDetails, setBankDetails] = useState({});
  const [balances, setBalances] = useState({ totalCredit: 0, totalDebit: 0, clearBalance: 0 });

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await GlobalAxios.get(`/bank/${id}`);
        const data = response.data.data;
        setBankDetails({
          accountNumber: data.bank_account,
          bankName: data.bank_name,
          branch: data.branch,
          account_holder_name: data.account_holder_name,
        });
        setBalances({
          totalCredit: data.creditAmount,
          totalDebit: data.debitAmount,
          clearBalance: data.creditAmount - data.debitAmount,
        });
      } catch (error) {
        console.error('Error fetching bank details:', error);
      }
    };

    fetchBankDetails();
  }, [id]);

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#fff' }}>
      <Card sx={{ backgroundColor: '#fff', color: TextColor, marginBottom: '20px', boxShadow: 3 }}>
        <CardContent sx={{ padding: '20px',display: 'flex', flexDirection: 'column',gap: '10px'}}>
          <Typography variant="h5" sx={{ fontWeight: 'bolder', color: PrimaryColor }}>Bank Details</Typography>
          <Typography variant="body1">Bank Name: {bankDetails.bankName || 'Loading...'}</Typography>
          <Typography variant="body1">Branch: {bankDetails.branch || 'Loading...'}</Typography>
          <Typography variant="body1">Account Holder Name: {bankDetails.account_holder_name}</Typography>
          <Typography variant="body1">Account Number: {bankDetails.accountNumber || 'Loading...'}</Typography>
        </CardContent>
      </Card>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#fff', color: TextColor, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: "green" }}>Total Credit</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: "green" }} >₹ {balances.totalCredit || '0.00'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#fff', color: TextColor, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: "red" }}>Total Debit</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: "red" }} >₹ {balances.totalDebit || '0.00'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#fff', color: TextColor, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: SecondaryColor }}>Clear Balance</Typography>
              <Typography variant="body1">₹ {balances.clearBalance || '0.00'}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BankDetails;