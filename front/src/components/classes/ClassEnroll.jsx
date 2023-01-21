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

const ClassEnroll = (props) => {
    const class_ = props.class;
    const [enrollEligible, setEnrollEligible] = useState(undefined);
    const [planEndDate, setPlanEndDate] = useState(undefined)
    const msgLink = props.msgLink;
    const setMsgLink = props.setMsgLink;
    const singleClass = `Single Class: Enroll in ${class_.class_name} only on ${class_.date}?`
    const allClass = `All Classes: Enroll in all ${class_.class_name} classes starting from ${class_.date}?`
    const [enrollChoice, sEnrollChoice] = useState('single-class')
    const token = JSON.parse(localStorage.getItem("userToken"))

    useEffect(() => {
        checkEnroll();
    }, [])

    const checkEnroll = async () => {
        try {
            const {data} = await axios({
                method: "get",
                url: "http://127.0.0.1:8000/subscriptions/update/",
                headers: { Authorization: "Bearer " + token }
            })
            setEnrollEligible(true)
            if (data.cancelled === true) {
                console.log(data)
                setPlanEndDate(data.next_billing_date)
            }
        } catch (e) {
            // User is logged in, but has no plans
            setEnrollEligible(false)
        }
    }

    const handleChooseEnroll = (e) => {
        sEnrollChoice(e.target.value)
    }

    const enroll = async () => {
        if (!checkEnroll) {
            setEnrollEligible(false);
        }
        setMsgLink({
            msg: undefined,
            link: undefined,

        })
        let url = `http://127.0.0.1:8000/classes/enroll/`
        const token = JSON.parse(localStorage.getItem("userToken"))
        if (token === null) {
            setMsgLink({ msg: `Please login first.`, link: '/login/' })
        }
        else {
            const all = enrollChoice === 'all-class' ? true : false
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
                    setMsgLink({ msg: res.data.msg, link: '/myClasses/' })
                })
                .catch(err => {
                    console.log(err)
                    setMsgLink({ msg: err.response.data.msg, link: '/subscriptions/' })
                })
        }
    }



    return (
        <Box mt={3}>
            <Typography variant='h5' color='green'>Enroll</Typography>
            {enrollEligible === false && <Box>
                <Typography color='red'>You cannot enroll our classes. Please subscribe to our plan first.</Typography>
                <Link to={'/subscriptions/'} style={{ textDecoration: 'underline' }}>[Link]</Link>
            </Box>}
            {enrollEligible === true && <Box>
                <Typography><b>Current number of students</b>: {class_.num_students}/{class_.capacity}</Typography>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={enrollChoice}
                        onChange={handleChooseEnroll}
                    >
                        <FormControlLabel value="single-class" control={<Radio />} label={singleClass} />
                        <FormControlLabel value="all-class" control={<Radio />} label={allClass} />
                        {planEndDate && <Typography color='red'><b>Note</b>: You are not able to enroll in classes that is beyond {planEndDate} (end date for your current subscription plan).</Typography>}

                    </RadioGroup>
                </FormControl>

                <button
                    className="w-full text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={enroll}
                    style={{marginTop: 20, marginBottom: 20}}
                >
                    Enroll
                </button>

                {msgLink.msg && !msgLink.link && <Typography>{msgLink.msg}</Typography>}

                {/* error, show link */}
                {msgLink.link &&
                    <Typography style={{ color: 'red' }}>
                        {msgLink.msg}
                        <Link to={msgLink.link} style={{ textDecoration: 'underline' }}>[Link]</Link>
                    </Typography>

                }
            </Box>}

        </Box>
    )
}

export default ClassEnroll;