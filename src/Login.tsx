import { Stack, TextField, InputAdornment, Button, Link, Paper, Grid, Box, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { SyntheticEvent, useState } from 'react';
import axios from "axios";
import { ResultType } from "@remix-run/router/dist/utils";
import { render } from "@testing-library/react";
import { Navigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

export const Login = () => {
  
    const { loginWithPopup,isAuthenticated } = useAuth0();
    const isLogged = false
    const login = () => {
        loginWithPopup()
    }

    return (
            <Box>
                <Paper
                    sx={{ padding: '50px', width: '400px', height: 'auto', margin: 'auto', marginTop: '30px' }} elevation={3}>
                    <Stack spacing={4}>
                        {/* <Typography variant='h4' fontFamily='initial'>Login</Typography>

                <TextField label='Email' variant="standard" required></TextField>

                <TextField label='Password' type="password" variant="filled" helperText='Do not share your password with anyone' InputProps={{ endAdornment: <VisibilityIcon></VisibilityIcon> }} required></TextField> */}

                        {/* <Button type="submit" variant="outlined" onClick={handleLogin}> Submit</Button> */}

                        <button className='btn btn-success' type='submit' color='success' onClick={login}> Login</button>

                        <div>New user ?
                            <Link href="/registration" target="_blank"> Register here</Link>
                        </div>
                    </Stack>
                </Paper >
            </Box>
    )
}

