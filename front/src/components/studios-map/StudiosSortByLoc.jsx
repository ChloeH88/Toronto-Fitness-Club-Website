import { Box, Stack, Typography } from '@mui/material';
import SearchBar from '../SearchBar';
import { useEffect, useState } from 'react';
import Geocode from "react-geocode";

const StudiosSortByLoc = (props) => {
    const {
        setPos
    } = props
    const handleSearch = async (e) => {
        e.preventDefault()
        var postal = e.target.keyword.value;
        // https://www.npmjs.com/package/react-geocode
        Geocode.setApiKey("AIzaSyDqCaJKiXq4ejDBTZOhV0Dbv-FCZiuKpLM");
        Geocode.setLanguage("en");
        Geocode.setRegion("ca");

        // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
        // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
        Geocode.setLocationType("ROOFTOP");

        // Enable or disable logs. Its optional.
        Geocode.enableDebug();
        Geocode.fromAddress(postal).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setPos({lat: lat, lon: lng})
              localStorage.setItem('pos', JSON.stringify({lat: lat, lon: lng}))
            },
            (error) => {
              console.error(error);
            }
          );

    }
    return (
        <Box width='80%'>
            <SearchBar
                placeholder='Wanna check out studios near another place? Click on map OR enter a postal code/address '
                handleSearch={handleSearch}
            />
        </Box>
    )
}

export default StudiosSortByLoc;