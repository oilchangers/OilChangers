import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
function RegistrationForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    })
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
            }
            axios.post(API_BASE_URL + '/user/register', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        redirectToHome();
                        props.showError(null)
                    } else {
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            props.showError('Please enter valid username and password')
        }

    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login');
    }
    const handleNextClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            //sendDetailsToServer()  //  
            document.getElementById('formGroup3').style.display = 'block';
            document.getElementById('formGroup4').style.display = 'none';

        } else {
            props.showError('Passwords do not match');
        }
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            //sendDetailsToServer()  //  
            redirectToLogin()

        } else {
            props.showError('Passwords do not match');
        }
    }


    const handleBackClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            //sendDetailsToServer()  //  
            document.getElementById('formGroup3').style.display = 'none';
            document.getElementById('formGroup4').style.display = 'block';

        } else {
            props.showError('Passwords do not match');
        }
    }
    const theme = createTheme();
    return (
        // <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box component="form" noValidate sx={{ mt: 1, mb:2 }}>
                    <form>
                        <div id="formGroup4">
                            <div className="form-group text-left">

                                <TextField margin="normal"
                                    required
                                    fullWidth
                                    id="email"

                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    label="Enter First Name"
                                    value={state.email}
                                    onChange={handleChange}
                                />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group text-left">

                                <TextField margin="normal"
                                    required
                                    fullWidth
                                    id="email"

                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    label="Enter Last Name"
                                    value={state.email}
                                    onChange={handleChange}
                                />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group text-left">

                                <TextField margin="normal"
                                    required
                                    fullWidth type="num"
                                    id="email"

                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    label="Enter Mobile no"
                                    value={state.email}
                                    onChange={handleChange}
                                />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group text-left">

                                <TextField margin="normal"
                                    required
                                    fullWidth
                                    id="email"

                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    label="Enter email"
                                    value={state.email}
                                    onChange={handleChange}
                                />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group text-left">

                                <TextField margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    id="password"
                                    label="Password"
                                    value={state.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group text-left">

                                <TextField margin="normal"
                                    required
                                    fullWidth
                                    id="confirmPassword"

                                    name="email"
                                    autoComplete="email"
                                    autoFocus

                                    label="Confirm Password"
                                    value={state.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleNextClick}
                            >
                                Next
                            </Button>
                        </div>
                        <div id="formGroup3" >
                            <div className="form-group text-left">
                                <TextField margin="normal"
                                    required
                                    fullWidth
                                    id="email"

                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    label="Enter Street address"
                                    value={state.email}
                                    onChange={handleChange}
                                />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group text-left">
                                <TextField margin="normal"
                                    required
                                    fullWidth
                                    id="email"

                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    label="Enter City"
                                    value={state.email}
                                    onChange={handleChange}
                                />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group text-left">
                                <TextField margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter State"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus

                                    value={state.email}
                                    onChange={handleChange}
                                />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group text-left">
                                <TextField margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter Zip"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus

                                    value={state.email}
                                    onChange={handleChange}
                                />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group text-left">
                                <TextField margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter Birthday"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus

                                    value={state.email}
                                    onChange={handleChange}
                                />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group text-left">
                                <TextField margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter Gender"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus

                                    value={state.email}
                                    onChange={handleChange}
                                />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
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

                    </form>
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

export default withRouter(RegistrationForm);