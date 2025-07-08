import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { checkValidationFormAllControls } from '../../constants/validation';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Checkbox from '@mui/material/Checkbox';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
function RegistrationForm(props) {
    const navigate = useNavigate();
    const [state, setState] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        postal_code: "",
        password: "",
        confirmPassword: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        birthday: "",
        gen: "",
        sms_opt_out: "",

    })

    const [nameError, setNameError] = useState('')
    const [objError, setObjError] = useState('')
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            props.showError(null);
            const payload = {
                "email": state.email,
                "password": state.password,
                "first_name": state.fname,
                "last_name": state.lname,
                "postal_code": state.postal_code,
                "phone": state.phone,
                "address1": state.address1,
                "address2": state.address2,
                "city": state.city,
                "state": state.state,
                "country": state.country,
                "birthday": state.birthday,
                "anniversary": state.anniversary,
                "gender": state.gen,
                "sms_opt_out": state.sms_opt_out,
                "password_confirmation": state.confirmPassword,

            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Token token=--WEBRmfcyzgRpxrWEB--'
            }

            axios.post(API_BASE_URL + '/members', payload, {
                headers: headers
            })
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        redirectToLogin();
                        props.showError(null)
                    } else {
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    props.showError("Some error ocurred");
                });
        } else {
            props.showError('Please enter valid username and password')
        }

    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        navigate('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        navigate('/login');
    }
    const handleNextClickOne = (e) => {
        e.preventDefault();

        var objValidation = checkValidationFormAllControls(document.forms[0].elements, false, [])

        if (objValidation.valid != false) {
            setObjError(objValidation);
            //setEmailError(objValidation['email']);
            //PasswordsetError(objValidation['password']);
            return;
        } else {
            setObjError(objValidation);
            console.log(objValidation.valid);
            document.getElementById('formGroup3').style.display = 'block';
            document.getElementById('formGroup4').style.display = 'none';
        }

    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        var objValidation = checkValidationFormAllControls(document.forms[1].elements, false, [])
        if (objValidation.valid != false) {
            setObjError(objValidation);

            return;
        }
        sendDetailsToServer()


    }


    const handleBackClick = (e) => {
        e.preventDefault();
        document.getElementById('formGroup3').style.display = 'none';
        document.getElementById('formGroup4').style.display = 'block';
    }
    const theme = createTheme();
    return (
        // <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box component="form" name="form1" id="form1" noValidate sx={{ mt: 1, mb: 2 }}>

                    <div id="formGroup4">
                        <div className="form-group text-left">

                            <TextField margin="normal"
                                required
                                fullWidth
                                id="fname"
                                name="first_name"
                                autoComplete="first_name"
                                autoFocus
                                label="Enter first name"
                                value={state.fname}
                                onChange={handleChange}
                            />
                        </div>
                        {objError.first_name ?
                            <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                            }}>{objError.first_name}</span>

                            : ''
                        }
                        <div className="form-group text-left">

                            <TextField margin="normal"
                                required
                                fullWidth
                                id="lname"
                                name="last_name"
                                autoComplete="lname"
                                autoFocus
                                label="Enter Last Name"
                                value={state.lname}
                                onChange={handleChange}
                            />

                        </div>
                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>{objError.last_name}</span>


                        <div className="form-group text-left">

                            <TextField margin="normal"
                                required
                                fullWidth
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                label="Enter email"
                                value={state.email}
                                onChange={handleChange}
                            />

                        </div>
                        {objError.email ?
                            <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                            }}>{objError.email}</span> : ''}
                        <div className="form-group text-left">

                            <TextField margin="normal"
                                required
                                fullWidth
                                inputProps={{
                                    maxLength: 10,
                                    minLength: 10
                                }}
                                id="phone"
                                name="phone"
                                autoComplete="phone"
                                autoFocus
                                type="tel"
                                label="Enter phone no"
                                value={state.phone}
                                onChange={handleChange}
                            />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        {objError.phone ?
                            <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                            }}>{objError.phone}</span> : ''}

                        <div className="form-group text-left">
                            <TextField margin="normal"
                                required
                                fullWidth
                                id="postal_code"
                                label="Enter postal code"
                                name="postal_code"
                                autoComplete="postal_code"
                                autoFocus
                                type="tel"
                                inputProps={{
                                    maxLength: 6,
                                    minLength: 6
                                }}
                                value={state.postal_code}
                                onChange={handleChange}
                            />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        {objError.postal_code ?
                            <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                            }}>{objError.postal_code}</span> : ''}

                        <div className="form-group text-left">

                            <TextField margin="normal"
                                required
                                fullWidth
                                name="password"
                                autoComplete="password"
                                autoFocus
                                id="password"
                                label="Password"
                                type="password"
                                value={state.password}
                                pattern="^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])(?=.{8,})"


                                onChange={handleChange}
                                inputProps={{
                                    match: "password,confirmPassword"

                                }}
                            />
                        </div>
                        {objError.password ?
                            <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                            }}>{objError.password}</span> : ''}
                        <div className="form-group text-left">

                            <TextField margin="normal"
                                required
                                fullWidth
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                autoComplete="confirmPassword"
                                autoFocus
                                pattern="^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])(?=.{8,})"
                                inputProps={{
                                    match: "password,confirmPassword"

                                }}

                                label="Confirm Password"
                                value={state.confirmPassword}
                                onChange={handleChange}

                            />
                        </div>
                        {objError.confirmPassword ?
                            <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                            }}>{objError.confirmPassword}</span> : ''}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleNextClickOne}
                        >
                            Next
                        </Button>
                    </div>
                </Box>
                <Box component="form" name="form2" id="form1" noValidate sx={{ mt: 1, mb: 2 }}>
                    <div id="formGroup3" >
                        <div className="form-group text-left">
                            <TextField margin="normal"
                                required
                                fullWidth
                                id="address1"
                                name="first_address"
                                autoComplete="address1"
                                autoFocus
                                label="Enter address"
                                value={state.address1}
                                onChange={handleChange}
                            />


                        </div>

                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>{objError.address1}</span>

                        <div className="form-group text-left">
                            <TextField margin="normal"
                                required
                                fullWidth
                                id="address2"
                                name="second_address"
                                autoComplete="address2"
                                autoFocus
                                label="Enter address"
                                value={state.address2}
                                onChange={handleChange}
                            />


                        </div>

                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>{objError.address2}</span>

                        <div className="form-group text-left">
                            <TextField margin="normal"
                                required
                                fullWidth
                                id="city"

                                name="city"
                                autoComplete="city"
                                autoFocus
                                label="Enter City"
                                value={state.city}
                                onChange={handleChange}
                            />

                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>{objError.city}</span>

                        <div className="form-group text-left">
                            <TextField margin="normal"
                                required
                                fullWidth
                                id="state"
                                label="Enter State"
                                name="state"
                                autoComplete="state"
                                autoFocus

                                value={state.state}
                                onChange={handleChange}
                            />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>

                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>{objError.state}</span>

                        <div className="form-group text-left">
                            <TextField margin="normal"
                                required
                                fullWidth
                                id="country"
                                label="Enter Country"
                                name="country"
                                autoComplete="country"
                                autoFocus

                                value={state.country}
                                onChange={handleChange}
                            />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>

                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>{objError.country}</span>

                        {/* "address2": state.address2,
                "city": state.city,
                "state": state.state,
                "country": state.country,
                "birthday": state.birthday,
                "anniversary": state.anniversary,
                "gender": state.gender,
                "sms_opt_out": state.sms_opt_out, */}
                        <div className="form-group text-left">
                            <TextField margin="normal"

                                fullWidth
                                id="birthday"
                                label="Enter Birthday"
                                name="birthday"
                                autoComplete="birthday"
                                autoFocus
                                type="Date"
                                value={state.birthday}
                                onChange={handleChange}
                            />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>


                        <div className="form-group text-left">
                            <TextField margin="normal"
                                required
                                fullWidth
                                id="gen"
                                label="Enter Gender"
                                name="gen"
                                autoComplete="gen"
                                autoFocus

                                value={state.gen}
                                onChange={handleChange}
                            />

                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>

                        <div className="form-group text-left">
                            <Checkbox margin="normal"


                                id="sms_opt_out"
                                label="Enter sms opt out"
                                name="sms_opt_out"
                                autoComplete="sms_opt_out"
                                autoFocus

                                value={state.sms_opt_out}
                                onChange={handleChange}
                            />Enter sms opt out
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>

                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>{objError.gen}</span>

                        <div className="d-flex w-100 justify-content-between">
                            <Button
                                type="submit"

                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleBackClick}
                            >
                                Back
                            </Button>

                            <Button
                                type="submit"

                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmitClick}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>


                    <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                        {state.successMessage}
                    </div>
                    <div className="mt-2">
                        <span>Already have an account? </span>
                        <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>
                    </div>

                    { /* </div> */}

                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default RegistrationForm;