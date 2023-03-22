import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { type } from '@testing-library/user-event/dist/type'
import { Form, Formik } from 'formik'
import { Stack, TextField, InputAdornment, Button, Link, Paper, Grid, Box, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { UserContext } from "./Usercontext";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar, Toolbar } from '@mui/material';

type users = {
    Name: string,
    Email: string,
    Password: string | undefined,
    id: any
}
export const Edit = () => {
    const navigate = useNavigate();
    const [Name, setName] = useState("");
    const [details, setDetails] = useState<users>()
    const [isVisible, setVisible] = useState(false);
    const userContext = useContext(UserContext)
    const user = userContext.user
    const toggle = () => {
        setVisible(!isVisible);
    }


    const update = (values: { Name: string | undefined; Email: string | undefined; Password: string | undefined; id: string | undefined }) => {
        axios.put(`http://localhost:8000/users/${values?.id}`, values)
            .then((res) => {
                alert("Successfully updated!")
                // toast("Wow so easy!");
            })
            .catch((err) => alert(err))
    }

    return (
        <>
            <AppBar color='inherit' sx={{ margin: '40' }}>
                <Toolbar>
                    <Button startIcon={<ArrowBackIosIcon />} color="inherit" onClick={() => navigate('/home')} sx={{ float: 'left' }}>  </Button>
                    <Typography sx={{flexGrow:1, fontFamily:'initial'}} variant='h5' >Update</Typography>
                </Toolbar>
            </AppBar>
            <Formik initialValues={{
                Name: user?.Name,
                Email: user?.Email,
                Password: user?.Password,
                id: user?.Id
            }} onSubmit={(values) => {
                update(values)
            }}
            >
                {
                    ({ handleSubmit, values, handleChange }) => (
                        <Form onSubmit={handleSubmit}>
                            <Paper sx={{ padding: '50px', width: '400px', height: 'auto', margin: 'auto', marginTop: '100px' }} elevation={3}>
                                <Stack spacing={4}>

                                    <TextField name='Name' value={values.Name} onChange={handleChange}
                                        label='Name' variant="standard" required></TextField>

                                    <TextField name='Email' value={values.Email} onChange={handleChange}
                                        label='Email' variant="standard" required></TextField>

                                    <TextField value={values.Password} name='Password' onChange={handleChange}
                                        label='Password' type={!isVisible ? "password" : "text"}
                                        variant="filled" InputProps={{ endAdornment: <VisibilityIcon onClick={toggle} ></VisibilityIcon> }} required >
                                    </TextField>

                                    <Button type='submit' color='success' > Submit</Button>
                                </Stack>
                            </Paper >
                        </Form>
                    )
                }
            </Formik>

        </>)
}
