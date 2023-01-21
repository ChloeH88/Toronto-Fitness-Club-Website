import * as React from "react";
import {
    DataGrid,
} from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from 'react';



const UserPaymentsHistoryTable = (props) => {
    const [page, setPage] = useState(1)
    const [rowCount, setRowCount] = useState(0)
    const [payments, setPayments] = useState([])
    const pageSize = 30

    const columns = [
        { field: 'billing_datetime', headerName: 'Billing Time', sortable: true, flex: 1 },
        { field: 'amount', headerName: 'Amount', sortable: true, flex: 1 },
        { field: 'card_num', headerName: 'Card Number', sortable: true, flex: 1 },
    ];

    const listPaymentHistory = async () => {
        let url = `http://127.0.0.1:8000/subscriptions/paymentsHistory/`
        let config = {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userToken"))}` },
            params: {
                page: page
            },
        }

        const { data } = await axios.get(
            url,
            config
        )
        data.results.map((payment, index) => {
            payment.amount = '$' + payment.amount
            payment.billing_datetime = new Date(payment.billing_datetime).toLocaleString('en-ca',{hour12: false})
        })
        setRowCount(data.count)
        setPayments(data.results)

    }

    React.useEffect(() => {
        listPaymentHistory()
    }, [])


    return (
        <DataGrid
            rows={payments}
            columns={columns}
            page={page - 1}
            pageSize={pageSize}
            pagination
            paginationMode='server'
            rowCount={rowCount}
            onPageChange={(page) => setPage(page + 1)}
            disableExtendRowFullWidth={false}
            initialState={{
                pagination: {
                    page: 1,
                },
            }}
            sx={{
                // https://mui.com/x/react-data-grid/style/#styling-rows
                height: '70vh',
                width: '80%',
                boxShadow: 2,
                border: 2,
                borderRadius: '5%',
                borderColor: 'lightGray',
                '& .MuiDataGrid-row:hover': {
                    color: 'gray',

                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold'
                },
            }}
        />
    )
}

export default UserPaymentsHistoryTable;