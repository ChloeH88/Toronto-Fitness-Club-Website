import * as React from "react";
import axios from "axios";
import { Box, Stack, Typography, Grid } from '@mui/material';
import '../index.css'
import Navigation from "../components/Navigation";
import UserPaymentsHistoryTable from "../components/accounts/UserPaymentHistoryTable";
import UserPaymentFuture from "../components/accounts/UserPaymentFuture";

const UserPayments = (props) => {

    return (
        <Box width='100%'>
            <Navigation />
            <Grid className='left-large-grid' sx={{ m: 2 }}>
                <Box className='payment-history-center-box' sx={{gap:'1em'}}>
                    <Typography variant='h5' fontWeight='bold' color='rgb(237, 147, 21)'>My Payment History</Typography>
                    <UserPaymentsHistoryTable></UserPaymentsHistoryTable>
                </Box>
                <Box className='payment-history-center-box'>
                    <Typography variant='h5' fontWeight='bold' color='rgb(237, 147, 21)'>My Next Payment</Typography>
                    <UserPaymentFuture></UserPaymentFuture>
                </Box>
            </Grid>
        </Box>
    )
}

export default UserPayments;