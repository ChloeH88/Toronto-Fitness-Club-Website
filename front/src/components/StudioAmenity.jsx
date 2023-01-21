import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

const StudioAmenity = (props) => {
    var rows = props.amenities

    const columns = [
        { field: 'name', headerClassName: 'amenity-header', headerName: 'Name', headerAlign: 'center', align: 'center', sortable: true, flex: 1 },
        { field: 'quantity', headerClassName: 'amenity-header', headerName: 'Quantity', headerAlign: 'center', align: 'center', sortable: true, flex: 1 },
    ];

    return (
        // <Box style={{ height: '80vh', width: '90%' }}>
        <Box
            style={{ width: '60%' }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                sx={{
                    // https://mui.com/x/react-data-grid/style/#styling-rows
                    boxShadow: 2,
                    border: 2,
                    borderRadius: '5%',
                    borderColor: 'lightGray',
                    '& .MuiDataGrid-row:hover': {
                        color: 'primary.main',
                        cursor: 'pointer'
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold'
                    },
                    height: '60vh',
                    width: '100%',
                    textAlign: 'center'
                }}
            />
        </Box>
    )
}

export default StudioAmenity;