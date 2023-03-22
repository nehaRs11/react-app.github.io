import { Stack, TextField, InputAdornment, Button, Link, Paper, Grid, Box, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { ChangeEvent, SyntheticEvent, useState, createContext, useContext, useEffect } from 'react';
import axios from "axios";
import { forEachChild } from "typescript";
import { User } from "@auth0/auth0-react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Usercontext";
import { signIn, authSelector } from "./redux/authSlice";
import { useAppDispatch, useAppSelector } from "./store";


export const NormLogin = () => {
    const [Email, setEmail] = useState('');
    const [error, setError] = useState("");
    const [errorP, setErrorP] = useState("");
    const [pass, setPass] = useState("");
    const [check, setCheck] = useState<any[]>([])
    const navigate = useNavigate();
    const [isVisible, setVisible] = useState(false);

    //redux
    const isLog = useAppSelector(authSelector)
    const dispatch = useAppDispatch();

    const Log = (e: React.MouseEvent) => {
        e.preventDefault()
        dispatch(signIn(true))
        console.log(isLog)
        if (isLog) {
            // console.log("in redux!")
            proceedLogin(e)
        }
    }

    // useEffect(() => {
    //     if (isLog) {
    //         console.log("in redux!")
    //         // proceedLogin()
    //     }
    // }, [isLog])

    const userContext = useContext(UserContext)

    const toggle = () => {
        setVisible(!isVisible);
    }

    function isValidEmail(Email: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email);
    }

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid');
        } else {
            setError("");
        }
        setEmail(event.target.value);
    };

    function isValidPass(pass: string) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/.test(pass);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isValidPass(event.target.value)) {
            setErrorP('Password is invalid');
        } else {
            setErrorP("");
        }

        setPass(event.target.value);
    };

    const proceedLogin = (e: React.MouseEvent) => {
         if(Email==='neh13@gmail.com'){
            if(pass==='Neha@23R'){
                navigate("/home")
            }
        }
       
        //axios.get("http://localhost:8080/users")
          //  .then((res) => {
          //      setCheck(res.data)
        //    })

    };
    useEffect(() => {
        check.find((i) => {
            if (i.email === Email) {
                if (i.pass === pass) {
                    // console.log("success");
                    // alert("Logged in!")
                    // userCont=i.id                    
                    navigate("/home")
                    userContext.setUser({
                        Name: i.Name,
                        Email: i.Email,
                        Password: i.pass,
                        Id: i.id
                    })
                }
            }
        })
    }, [check])

    return (<Box>
        <Paper sx={{ padding: '50px', width: '400px', height: 'auto', margin: 'auto', marginTop: '30px' }} elevation={3}>
            <Stack spacing={4}>

                <Typography variant='h4' fontFamily='fantasy'>Login</Typography>

                <TextField variant="outlined" value={Email} onChange={e => setEmail(e.target.value)} label='Email' required></TextField>
                {error && <h6 style={{ color: 'red', fontFamily: 'fantasy' }}>{error}</h6>}


                <TextField value={pass} onChange={e => setPass(e.target.value)} label='Password' type={!isVisible ? "password" : "text"}
                    variant="outlined" InputProps={{ endAdornment: <VisibilityIcon onClick={toggle} ></VisibilityIcon> }} required >
                </TextField>
                {errorP && <h6 style={{ color: 'red', fontFamily: 'fantasy' }}>{errorP}</h6>}

                <Button color={'success'} onClick={proceedLogin}> Login</Button>
                {/* <button onClick={proceedLogin}>Login</button> */}
                <div style={{ fontFamily: 'fantasy', fontSize: '25px' }}>
                    <Button href="/registration" >Create an account</Button>
                </div>
            </Stack>
        </Paper >
    </Box>
    )
}
