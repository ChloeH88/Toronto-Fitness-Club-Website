import { Box, Stack, Typography } from '@mui/material';
import SearchBar from '../SearchBar';
import { useEffect, useState } from 'react';
import Geocode from "react-geocode";
import SearchDropDownMenu from '../SearchDropDownMenu';
import axios from "axios";

const StudioClassesSearch = (props) => {
    const {
        setQuery,
        optionChose,
        setOptionChose
    } = props
    const options = [
        'class name',
        'coach name',
        'date',
        'time range'
    ]

    // if user decides to search
    const [searchRequired, setSearchRequired] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault()
        var keyword = e.target.keyword.value
        setQuery({ page: 1, keyword: keyword })

    }

    const handleSearchFieldChange = async (e) => {
        var keyword = e.target.value;
        if (keyword === '') {
            setQuery({ page: 1, keyword: keyword })

        }
        else if (optionChose !== 'date' && optionChose !== 'time range') {
            setQuery({ page: 1, keyword: keyword })
        }
    }

    return (
        <Box width='90%' m={3}>
            <SearchDropDownMenu
                options={options}
                setSearchRequired={setSearchRequired}
                optionChose={optionChose}
                setOptionChose={setOptionChose}
            />
            {optionChose === 'date' && <Typography color='green'>yyyy-mm-dd</Typography>}
            {optionChose === 'time range' && <Typography color='green'>Enter start time - end time in such format: hh:mm - hh:mm</Typography>}
            <SearchBar
                placeholder='Enter your keyword:'
                handleSearch={handleSearch}
                handleSearchFieldChange={handleSearchFieldChange}
            />
        </Box>
    )
}

export default StudioClassesSearch;