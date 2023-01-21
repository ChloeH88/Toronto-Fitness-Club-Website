import { Box, Stack, Typography } from '@mui/material';
import SearchBar from '../SearchBar';
import { useEffect, useState } from 'react';
import Geocode from "react-geocode";
import SearchDropDownMenu from '../SearchDropDownMenu';
import axios from "axios";

const StudiosSearch = (props) => {
    const {
        setQuery,
        optionChose,
        setOptionChose
    } = props
    const options = [
        'studio name',
        'amenity',
        'class name',
        'coach name'
    ]

    // if user decides to search
    const [searchRequired, setSearchRequired] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault()
        var keyword = e.target.keyword.value
        setQuery({keyword: keyword, page: 1})
        
    }

    const handleSearchFieldChange = async(e) => {
        var keyword = e.target.value;
        setQuery({keyword: keyword, page: 1})
    }

    return (
        <Box width='90%' m={3}>
            <SearchDropDownMenu
                options={options}
                setSearchRequired={setSearchRequired}
                optionChose={optionChose}
                setOptionChose={setOptionChose}
            />
            <SearchBar
                placeholder='Enter your keyword:'
                handleSearch={handleSearch}
                handleSearchFieldChange={handleSearchFieldChange}
            />
        </Box>
    )
}

export default StudiosSearch;