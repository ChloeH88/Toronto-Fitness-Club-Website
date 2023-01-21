import * as React from "react";
import {
    DataGrid,
} from '@mui/x-data-grid';


const ClassTable = (props) => {
    const {
        info,
        setter,
        sDroppedClass,
    } = props;

    const columns = [
        { field: 'class_name', headerName: 'Class', sortable: true, flex: 1 },
        { field: 'coach_name', headerName: 'Coach', sortable: true, flex: 1 },
        { field: 'date', headerName: 'date', sortable: true, flex: 1 },
        { field: 'start_time', headerName: 'Start Time', sortable: true, flex: 1 },
        { field: 'end_time', headerName: 'End Time', sortable: true, flex: 1 },
    ];

    const handleRowClick = (e) => {
        sDroppedClass(e.row)
    }

    return (
        <DataGrid
            rows={info.classes}
            columns={columns}
            page={info.page - 1}
            pageSize={info.pageSize}
            pagination
            paginationMode='server'
            rowCount={info.rowCount}
            onPageChange={(page) => setter({ ...info, page: page + 1 })}
            disableExtendRowFullWidth={false}
            onRowClick={(e) => handleRowClick(e)}
            initialState={{
                pagination: {
                    page: 1,
                },
            }}
            sx={{
                // https://mui.com/x/react-data-grid/style/#styling-rows
                height: '100vh',
                width: '90%',
                boxShadow: 2,
                border: 2,
                borderRadius: '5%',
                borderColor: 'lightGray',
                '& .MuiDataGrid-row:hover': {
                    color: 'primary.main',
                    cursor: 'pointer',
                    textDecoration: 'underline',

                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold'
                },
            }}
        />
    )
}

export default ClassTable;