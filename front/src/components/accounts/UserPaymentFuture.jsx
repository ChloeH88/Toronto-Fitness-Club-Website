import * as React from "react";
import { Box, Stack, Typography, Grid } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from 'react';

const UserPaymentFuture = (props) => {
    const [payment, setPayment] = useState([])

    const getFuturePayment = async () => {
        let url = `http://127.0.0.1:8000/subscriptions/paymentFuture/`
        let config = {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
        }

        axios.get(
            url,
            config
        )
            .then(res => {
                const data = res.data
                if (data.next_billing_date !== null) {

                    setPayment(res.data)
                }
            })
            .catch(err => console.log('No Future Payment'))

    }

    React.useEffect(() => {
        getFuturePayment()
    }, [])


    return (
        <Box sx={{ m: 2 }}>
            {payment.length === 0 && <Typography>No Future Payment</Typography>}
            {payment.length !== 0 &&
                <>
                    <Typography><b>Next Billing Date</b>: {payment.next_billing_date}</Typography>
                    <Typography><b>Next Billing Amount</b>: ${payment.next_billing_amount}</Typography>
                </>
            }
        </Box>
    )
}

export default UserPaymentFuture;