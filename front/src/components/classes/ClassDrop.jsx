import * as React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { Box, Stack, Typography, Button } from '@mui/material';
import { Link } from "react-router-dom";

const ClassDrop = (props) => {
    const myRef = useRef(null)
    const class_ = props.class;
    // const listFutureClass = props.listFutureClass;
    const future = props.future
    const setFuture = props.setFuture;
    const [msg, setMsg] = useState(undefined);
    const singleClass = `Single Class: Drop ${class_.class_name} on ${class_.date}?`
    const allClass = `All Classes: Drop all ${class_.class_name} classes starting from ${class_.date}?`
    const [dropChoice, sDropChoice] = useState('single-class')

    const handleDropChoice = (e) => {
        sDropChoice(e.target.value)
    }

    const drop = async () => {
        setMsg(undefined)
        let url = `http://127.0.0.1:8000/classes/drop/`
        const token = JSON.parse(localStorage.getItem("userToken"))
        const all = dropChoice === 'all-class' ? true : false
        axios({
            method: 'post',
            url: url,
            data: {
                class_id: class_.base_klass,
                date: class_.date,
                all: all
            },
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                setMsg('Successfully dropped.')
                console.log(future)
                setFuture({
                    ...future,
                    dropped: future.dropped + 1
                })
                props.sDroppedClass(undefined);
                // listFutureClass()
            })
            .catch(err => {
                console.log(err)
                setMsg(err.response.data.msg)
            })
    }

    useEffect(() => {
        myRef.current.scrollIntoView()
    })



    return (
        <Box
            mt={3}
            ref={myRef}
            sx={{
                boxShadow: 2,
                border: 2,
                borderRadius: '6%',
                borderColor: 'lightGray',
                p: 3,
                m: 2
            }}>
            <Typography variant='h5' color='green'>Drop Class</Typography>
            <Box>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={dropChoice}
                        onChange={handleDropChoice}
                    >
                        <FormControlLabel value="single-class" control={<Radio />} label={singleClass} />
                        <FormControlLabel value="all-class" control={<Radio />} label={allClass} />
                    </RadioGroup>
                </FormControl>
            </Box>
            <button
                className="w-full text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={drop}
            >
                Drop
            </button>

            {msg && <Typography>{msg}</Typography>}
        </Box>
    )
}

export default ClassDrop;