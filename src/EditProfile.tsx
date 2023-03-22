import { Stack, TextField, Paper, Button, Typography, Grid } from '@mui/material'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';


function EditProfile() {
    const [age, setAge] = useState(0);
    const navigate = useNavigate();
    const [check, setCheck] = useState<any[]>([])
    const [isVisible, setVisible] = useState(false);


    const toggle = () => {
        setVisible(!isVisible);
    }

    const year = (dob: any) => {
        const date = new Date()
        let today = date.getFullYear()
        // console.log(today)
        // console.log(dob.target.value)
        let gg = (dob.target.value).slice(6, 10)
        console.log(gg)
        let ageToday = 0
        ageToday = today - gg
        setAge(ageToday)
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('First name is required!'),
        lastname: Yup.string().required('Last name is required!'),
        email: Yup.string().required('Email is required!').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'),
        // age: Yup.number().required().positive().integer(),
        address: Yup.string().max(150).required('Address is required!'),
        pass: Yup.string().required('Password is required!').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/, 'Invalid password format'),
        pincode: Yup.number().required('Pincode is required!')
    })

    const initialValues = { email: '', name: '', lastname: '', dob: '', age: '', address: '', country: '', pincode: '', pass: '', pass2: '' }

    useEffect(() => {
        axios.get("http://localhost:8080/users")
            .then((res) => {
                setCheck(res.data)
            })
    }, [])

    const EmailCheck = () => {
        let flag = false
        // console.log("New data: ", values)

        check.find((i) => {
            console.log("Check data: ", i)
            if (i.email === formik.values.email) {
                // alert("Email already exists!")
                flag = true
            }
        })
        return flag
    }
    const formik = useFormik(
        {
            initialValues,
            validationSchema,
            onSubmit: (values) => {
                // let flag = EmailCheck()
                console.log("in submit")
                if (values.pass !== values.pass2) {
                    alert("Passwords don't match");
                }
                if (EmailCheck()) {
                    alert("Email already exists!")
                }

                else {
                    try {
                        axios.patch('http://localhost:8080/users',
                            JSON.stringify({ ...values, age: age }),
                            {
                                headers: { 'Content-type': 'application/json' },
                                withCredentials: true
                            });
                        // console.log(res.data);
                        // console.log(JSON.stringify(res));
                        alert("Signed in successfully!")
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
            }
        }

    );



    return (
        <Paper sx={{ padding: '50px', width: '1300px', height: 'auto', margin: 'auto', marginTop: '30px' }}>
            <Stack spacing={4} >
                <Typography variant='h4' fontFamily='initial'> Sign up!</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onError={() => formik.touched.name && formik.errors.name}
                                helperText={formik.touched.name && formik.errors.name ? <>{formik.errors.name}</> : null}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="lastname"
                                name="lastname"
                                label="Lastname"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onError={() => formik.touched.lastname && formik.errors.lastname}
                                helperText={formik.touched.lastname && formik.errors.lastname ? <>{formik.errors.lastname}</> : null}
                            />
                        </Grid>

                        {/* 3 items */}
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onError={() => formik.touched.email && formik.errors.email}
                                helperText={formik.touched.email && formik.errors.email ? <>{formik.errors.email}</> : null}
                            />
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="dob"
                                name="dob"
                                label="DOB"
                                placeholder='dd-mm-yyyy'
                                value={formik.values.dob}
                                onChange={formik.handleChange}
                                onBlur={(dob) => year(dob)}
                                required
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="age"
                                name="age"
                                label="Age"
                                value={age} inputProps={
                                    { readOnly: true, }
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onError={() => formik.touched.age && formik.errors.age}
                                helperText={formik.touched.age && formik.errors.age ? <>{formik.errors.age}</> : null}
                            />
                        </Grid>

                        <Grid item xs={7}>

                            <TextField
                                fullWidth
                                id="address"
                                name="address"
                                label="Address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onError={() => formik.touched.address && formik.errors.address}
                                helperText={formik.touched.address && formik.errors.address ? <>{formik.errors.address}</> : null}
                            />

                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="country"
                                name="country"
                                label="Country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="pincode"
                                name="pincode"
                                label="Pincode"
                                value={formik.values.pincode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onError={() => formik.touched.pincode && formik.errors.pincode}
                                helperText={formik.touched.pincode && formik.errors.pincode ? <>{formik.errors.pincode}</> : null}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="pass"
                                name="pass"
                                label="Password"
                                value={formik.values.pass}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onError={() => formik.touched.pass && formik.errors.pass}
                                helperText={formik.touched.pass && formik.errors.pass ? <>{formik.errors.pass}</> : null}
                                type={!isVisible ? "password" : "text"}
                                variant="outlined" InputProps={{ endAdornment: <VisibilityIcon onClick={toggle} ></VisibilityIcon> }}
                            /></Grid>

                        <Grid item xs={6}><TextField
                            fullWidth
                            id="pass2"
                            name="pass2"
                            label="Confirm password"
                            value={formik.values.pass2}
                            onChange={formik.handleChange}
                            type={!isVisible ? "password" : "text"}
                            variant="outlined" InputProps={{ endAdornment: <VisibilityIcon onClick={toggle} ></VisibilityIcon> }}
                        /></Grid>

                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}> <Button color='success' variant='contained' type='submit' fullWidth> Update</Button></Grid>
                        <Grid item xs={4}></Grid>

                    </Grid>
                </form></Stack></Paper>

    )
}

export default EditProfile