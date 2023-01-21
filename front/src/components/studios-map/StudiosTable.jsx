import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

const StudiosTable = (props) => {
    const rows = props.studios
    const query = props.query
    const setQuery = props.setQuery
    const rowCount = props.rowCount
    const pageSize = props.pageSize
    const pos = props.pos
    const columns = [
        { field: 'order', headerName: 'Number', sortable: false, width: 70 },
        { field: 'name', headerName: 'Studio Name', sortable: false, flex: 1 },
        { field: 'address', headerName: 'Address', sortable: false, flex: 1 },
        { field: 'phone_number', headerName: 'Phone Number', sortable: false, flex: 0.5 },
    ];
    const navigate = useNavigate();

    const handleRowClick = (e) => {
        navigate(`/studio/${e.id}/${pos.lat}/${pos.lon}`)
    }

    return (
        <Box style={{ height: '80vh', width: '90%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                page={query.page - 1}
                pageSize={pageSize}
                pagination
                paginationMode='server'
                rowCount={rowCount}
                onPageChange={(page) => setQuery({...query, page: page + 1})}
                disableExtendRowFullWidth={false}
                sx={{
                    // https://mui.com/x/react-data-grid/style/#styling-rows
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'lightGray',
                    '& .MuiDataGrid-row:hover': {
                        color: 'primary.main',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    },
                }}
                onRowClick={(e) => handleRowClick(e)}
            // checkboxSelection
            />
        </Box>
    )
}

export default StudiosTable;