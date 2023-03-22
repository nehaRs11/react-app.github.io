import { Stack, TextField, Paper, Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect, ChangeEvent, ReactElement, SyntheticEvent } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Password } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, authSelector } from "./redux/authSlice";
import { useAppDispatch, useAppSelector } from "./store";
import { useNavigate } from 'react-router-dom';

export const Registration = () => {
    const navigate = useNavigate();
    const [touched, setTouched] = useState(false)
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPassTwo] = useState("");
    const [error, setError] = useState("");
    const [errorP, setErrorP] = useState("");
    const [check, setCheck] = useState<any[]>([])
    const [isVisible, setVisible] = useState(false);
    const isLog = useAppSelector(authSelector)
    const dispatch = useAppDispatch();

    const Log = (e: React.MouseEvent) => {
        e.preventDefault()
        dispatch(signIn(true))
        if (isLog) {
            console.log("in redux!")
            handleSubmit(e)
        }
    }
    const toggle = () => {
        setVisible(!isVisible);
    }

    function isValidEmail(Email: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email);
    }
    // console.log(touched)
    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid');
        } else {
            setError("");
        }
        setEmail(event.target.value);

    };

    useEffect(() => {

    }, [touched])

    function isValidPass(pass: string) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/.test(pass);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isValidPass(event.target.value)) {
            setErrorP('Password is invalid');
        } else {
            setErrorP("");
        }

        setPass(event.target.value);
    };

    const EmailCheck = () => {
        let flag = false
        axios.get("http://localhost:8000/users")
            .then((res) => {
                setCheck(res.data)
            }
            )
        check.find((i) => {
            if (i.Email === Email) {
                // alert("Email already exists!")
                flag = true
            }
        })
        return flag
    }
    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (pass !== pass2) {
            alert("Passwords don't match");
        }
        if (EmailCheck()) {
            alert("Email already exists!")
        }
        if (pass == null || pass == '' || Email == null || Email == '' || Name == '' || Name == null)
            alert('Please enter all required fields')

        else {
            try {
                const res = await axios.post('http://localhost:8000/users',
                    JSON.stringify({ Name: Name, Email, Password: pass }),
                    {
                        headers: { 'Content-type': 'application/json' },
                        withCredentials: true
                    });
                // console.log(res.data);
                // console.log(JSON.stringify(res));
                alert("Signed in successfully!")
                navigate('/')
            }
            catch (error) {
                console.log(error)
            }
        }

    }
    //Tech3 etc

    return (
        <Paper sx={{ padding: '50px', width: '400px', height: 'auto', margin: 'auto', marginTop: '30px' }} >
            <Stack spacing={4} >
                <Typography variant='h4' fontFamily='initial'>Sign up!</Typography>

                <TextField variant='outlined' value={Name} onChange={(e) => setName(e.target.value)} label='Username' type='text' required> </TextField>

                <TextField variant='outlined' value={Email} onChange={handleEmail} label='Email' type='email' required> </TextField>

                {error && <h6 style={{ color: 'red', fontFamily: 'fantasy' }}>{error}</h6>}

                <TextField variant='outlined' value={pass} onChange={handleChange} label='Password' type={!isVisible ? "password" : "text"} helperText='Do not share your password with anyone' InputProps={{ endAdornment: <VisibilityIcon onClick={toggle} ></VisibilityIcon> }} required >
                </TextField>
                {errorP && <h6 style={{ color: 'red', fontFamily: 'fantasy' }}>{errorP}</h6>}

                <TextField variant='outlined' value={pass2} onChange={(e) => setPassTwo(e.target.value)} label='Confirm Password' type={!isVisible ? "password" : "text"} helperText='Do not share your password with anyone' InputProps={{ endAdornment: <VisibilityIcon onClick={toggle} ></VisibilityIcon> }} required></TextField>

                {/* <Button type='submit' color='success' onChange={handleSubmit}> Submit</Button>  */}
                <Button color={'success'} onClick={Log}> Submit </Button>
                <Button onClick={() => navigate('/')}> Back to Login</Button>

            </Stack>
        </Paper>
    )
}
