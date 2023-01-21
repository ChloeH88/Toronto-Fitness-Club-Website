import * as React from "react";
import StudioPin from "./StudioPin";
import GoogleMapReact from 'google-map-react';
import Box from '@mui/material/Box';
import UserPin from './UserPin'
import { stepIconClasses } from "@mui/material";


const StudiosMap = (props) => {
    // const studios = props.studios;
    // const pos = props.pos;  
    const {
        studios,
        pos,//{lat:xxx, lon:xxx}
        setPos
    } = props
    const mapDefaultProps = {
        center: {
            lat: props.pos.lat,
            lng: props.pos.lon
        },
        zoom: 13
    };

    const handleClick = (e) => {
        setPos({ lat: e.lat, lon: e.lng })
        localStorage.setItem('pos', JSON.stringify({ lat: e.lat, lon: e.lng }))
    }
    return (
        <Box style={{ height: '80vh', width: '80%', margin: 20, }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDqCaJKiXq4ejDBTZOhV0Dbv-FCZiuKpLM' }}
                defaultCenter={mapDefaultProps.center}
                defaultZoom={mapDefaultProps.zoom}
                onClick={(e) => handleClick(e)}
            >

                <UserPin
                    lat={pos.lat}
                    lng={pos.lon}
                />

                {studios && studios.map((studio, index) => {
                    return (
                        <StudioPin
                            key={studio.id}
                            lat={studio.latitude}
                            lng={studio.longitude}
                            studio={studio}
                            setStudioID={props.setStudioID}

                        />
                    )
                })}

            </GoogleMapReact>
        </Box>
    )
}

export default StudiosMap;