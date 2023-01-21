import * as React from "react";
import axios from "axios";
import { Box, Stack, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import '../index.css'
import { Routes, Route, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import StudioAmenity from "../components/StudioAmenity";
import StudioClasses from "../components/classes/StudioClasses";

const Studio = (props) => {
    let { studio_id, lat, lon } = useParams();
    const [studio, setStudio] = useState(undefined);
    const [amenityShow, setAmenityShow] = useState(false);
    const [classShow, setClassShow] = useState(false);
    const navigate = useNavigate();

    const retrieveStudio = async () => {
        let url = `http://127.0.0.1:8000/studios/${studio_id}/`
        const { data } = await axios.get(url, { params: { lat: lat, lon: lon } })
        data.amenities.map((amenity, index) => amenity.id = index)
        setStudio(data);
    }

    const handleClickBack = () => {
        navigate('/studios/')
    }

    const handleClickAmenity = () => {
        setAmenityShow(!amenityShow)
    }

    const handleClickClass = () => {
        setClassShow(!classShow)
    }

    useEffect(() => {
        retrieveStudio()
    }, [])



    return (
        <Box>
            <Navigation />
            <Box sx={{ mt: 2, pl: 8 }}>
                <button
                    className="text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded"
                    onClick={handleClickBack}
                >
                    <ArrowBackIcon />
                    Back
                </button>
            </Box>

            {studio &&
                <Grid className='left-large-grid' sx={{ mt: 2, m: 5 }}>
                    <Box className='studio-center-container-box' style={{ flexDirection: 'column', justifyContent: 'start', gap: 10 }}>
                        <Typography variant='h4'>{studio.name}</Typography>
                        <Typography >
                            <b>📍Address: </b>
                            {studio.address}
                            <a href={studio.link} target="_blank">  [Get Direction]</a>
                        </Typography>

                        <Typography ><b>📞Phone Number: </b>{studio.phone_number}</Typography>

                        <button
                            className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold py-2 px-4 rounded-full"
                            onClick={handleClickAmenity}
                        >
                            See Amenities
                            {!amenityShow && <KeyboardArrowDownIcon />}
                            {amenityShow && <KeyboardArrowUpIcon />}
                        </button>

                        {amenityShow && <StudioAmenity
                            amenities={studio.amenities}
                        />}

                        <button
                            className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold py-2 px-4 rounded-full"
                            onClick={handleClickClass}
                        >
                            Class Schedules
                            {!classShow && <KeyboardArrowDownIcon />}
                            {classShow && <KeyboardArrowUpIcon />}
                        </button>

                        {classShow && <StudioClasses studio={studio}></StudioClasses>}

                    </Box>
                    <Box className='studio-center-container-box' style={{ flexDirection: 'column', justifyContent: 'start' }}>
                        {studio.images.map((img, index) => (
                            <img src={img.image} key={index}></img>
                        ))}
                    </Box>
                </Grid>
            }
        </Box>
    )
}

export default Studio;