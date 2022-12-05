import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { Box, Stack, Typography, Grid } from '@mui/material';

const Classes = (props) => {
    const studio = props.studio
    const [page, setPage] = useState(1);
    const [classes, setClasses] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const pageSize = 30;
    const [showClassInfo, sShowClassInfo] = useState(false);
    const [class_, setClass] = useState(undefined);
    const myRef = useRef(null)

    const columns = [
        { field: 'class_name', headerName: 'Class', sortable: true, flex: 1 },
        { field: 'coach_name', headerName: 'Coach', sortable: true, flex: 1 },
        // { field: 'description', headerName: 'Description', sortable: true, flex: 1.5 },
        // { field: 'keywords', headerName: 'Keywords', sortable: true, flex: 1.5 },
        { field: 'date', headerName: 'date', sortable: true, flex: 1 },
        { field: 'start_time', headerName: 'Start Time', sortable: true, flex: 1 },
        { field: 'end_time', headerName: 'End Time', sortable: true, flex: 1 },
    ];

    const listClasses = async () => {
        let url = `http://127.0.0.1:8000/classes/schedule/${studio.id}/`
        const { data } = await axios.get(url, { params: { page: page } });
        setClasses(data.results);
        setRowCount(data.count)
    }

    const handleRowClick = (e) => {
        sShowClassInfo(true);
        setClass(e.row);
        myRef.current.scrollIntoView()
    }

    const showClassInfoFunc = () => {
        return (
            <Box id='class'
                sx={{
                    boxShadow: 2,
                    border: 2,
                    borderRadius: '6%',
                    borderColor: 'lightGray',
                    p: 3,
                    m: 2
                }}
                ref={myRef}
            >
                <Typography variant='h5' fontWeight='bold' color='green'>{class_.class_name}</Typography>
                <Typography><b>Description</b>: {class_.description}</Typography>
                <Typography><b>Keywords</b>: {class_.keywords}</Typography>
                <Typography><b>Coach</b>: {class_.coach_name}</Typography>
                <Typography><b>Start Date</b>: {class_.start_date}</Typography>
                <Typography><b>End Date</b>: {class_.end_date}</Typography>
                <Typography><b>Capacity</b>: {class_.capacity} students</Typography>
                <Typography><b>Current number of Students</b>: {class_.num_students} students</Typography>

            </Box>
        )
    }

    React.useEffect(() => {
        listClasses();
    }, [])

    return (
        <Box style={{ height: '100vh', width: '90%' }}>
            {showClassInfo && showClassInfoFunc()}
            <DataGrid
                rows={classes}
                columns={columns}
                pageSize={pageSize}
                paginationMode='server'
                rowCount={rowCount}
                onPageChange={(page) => setPage(page + 1)}
                disableExtendRowFullWidth={false}
                onRowClick={(e) => handleRowClick(e)}
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
                }}
            // checkboxSelection
            />
        </Box>
    )
}

export default Classes;