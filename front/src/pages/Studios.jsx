import * as React from "react";
import Navigation from "../components/Navigation";
import StudiosTable from "../components/studios-map/StudiosTable";
import StudiosMap from "../components/studios-map/StudiosMap";
import axios from "axios";
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import '../index.css'

// For Pagenation
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import StudiosSortByLoc from "../components/studios-map/StudiosSortByLoc";
import StudiosSearch from "../components/studios-map/StudiosSearch";
import StudioDisplay from "./Studio";

const Studios = (props) => {
  const [pos, setPos] = useState({ lat: 43.653225, lon: -79.383186 })
  /* studios with pagination */
  const [studios, setStudios] = useState([]);
  // const [page, setPage] = useState(1);
  const [query, setQuery] = useState({ keyword: '', page: 1 })
  const [rowCount, setRowCount] = useState(0);  // total number of rows, for table server-side pagination
  const [pageSize, setPageSize] = React.useState(10);
  const [optionChose, setOptionChose] = useState('studio name');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPos({ lat: position.coords.latitude, lon: position.coords.longitude })
          localStorage.setItem('pos', JSON.stringify({ lat: position.coords.latitude, lon: position.coords.longitude }))

        }
      )
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('pos', JSON.stringify(pos))
    listStudios(pos.lat, pos.lon);
  }, [pos, query])

  const listStudios = async (lat, lon) => {
    let url = `http://127.0.0.1:8000/studios/list/`
    var res;
    if (query.keyword == '') {
      res = await axios.get(url, { params: { lat: lat, lon: lon, page: query.page } });
    } else {
      res = await axios.get(url, { params: { lat: pos.lat, lon: pos.lon, keyword: query.keyword, criterion: optionChose, page: query.page }})
    }
    res.data.results.map((studio, index) => {
      studio['order'] = (query.page - 1) * pageSize + index + 1;
    })
    setStudios(res.data.results);
    setRowCount(res.data.count)
  }




  return (
    <Box>
      <Navigation />
      <Stack className='studio-center-container-stack' sx={{ p: 5 }} spacing={2}>
        <Typography variant='h4'>🥳Check Out Our Studios🥳</Typography>
        <StudiosSortByLoc setPos={setPos} />

      </Stack>

      <Box className='studio-center-container-box'>
        <Stack className='studio-center-container-stack'
          spacing={1}
          style={{ height: '60%', width: '100%' }}
          sx={{
            // https://mui.com/x/react-data-grid/style/#styling-rows
            m: 3,
            p: 1,
            boxShadow: 2,
            border: 2,
            borderColor: 'rgba(247, 251, 244, 0.064)',
          }}

        >
          <StudiosSearch
            pos={pos}
            setStudios={setStudios}
            setRowCount={setRowCount}
            query={query}
            setQuery={setQuery}
            optionChose={optionChose}
            setOptionChose={setOptionChose}
            // page={page}
            pageSize={pageSize}
          />
          <Typography color='green'>*Click on a studio to see more info (classes, etc).</Typography>
          <StudiosTable
            studios={studios}
            query={query}
            setQuery={setQuery}
            rowCount={rowCount}
            pageSize={pageSize}
            pos={pos}
          />
        </Stack>

        <StudiosMap
          studios={studios}
          pos={pos}
          setPos={setPos}
        />
      </Box>
    </Box>
  )


}

export default Studios;