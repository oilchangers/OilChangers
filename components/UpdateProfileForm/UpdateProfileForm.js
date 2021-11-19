import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#000',
    // color: theme.palette.text.secondary,
}));

function UpdateProfileForm(props) {
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
            document.getElementById('formGroup2').style.display = 'block';
            document.getElementById('formGroup1').style.display = 'none';

        } else {
            props.showError('Passwords do not match');
        }
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            //sendDetailsToServer()  //  
            redirectToHome()

        } else {
            props.showError('Passwords do not match');
        }
    }


    const handleBackClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            //sendDetailsToServer()  //  
            document.getElementById('formGroup2').style.display = 'none';
            document.getElementById('formGroup1').style.display = 'block';

        } else {
            props.showError('Passwords do not match');
        }
    }
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="">
                <CssBaseline />
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <form>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
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
                            </Grid>

                            <Grid item xs={12} md={4}>

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
                            </Grid>

                            <Grid item xs={12} md={4}>

                                <div className="form-group text-left">

                                    <TextField margin="normal"
                                        required
                                        fullWidth
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
                            </Grid>

                            <Grid item xs={12} md={4}>

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
                            </Grid>

                            <Grid item xs={12} md={4}>
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
                            </Grid>

                            <Grid item xs={12} md={4}>
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
                            </Grid>

                            <Grid item xs={12} md={4}>

                                <div className="form-group text-left">
                                    <TextField margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus

                                        label="Enter State"
                                        value={state.email}
                                        onChange={handleChange}
                                    />
                                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                            </Grid>

                            <Grid item xs={12} md={4}>

                                <div className="form-group text-left">
                                    <TextField margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus

                                        label="Enter Zip"
                                        value={state.email}
                                        onChange={handleChange}
                                    />
                                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                            </Grid>

                            <Grid item xs={12} md={4}>

                                <div className="form-group text-left">
                                    <TextField margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus

                                        label="Enter Birthday"
                                        value={state.email}
                                        onChange={handleChange}
                                    />
                                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <div className="form-group text-left">
                                    <TextField margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus

                                        label="Enter Gender"
                                        value={state.email}
                                        onChange={handleChange}
                                    />
                                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <div className="form-group text-left">
                                    <TextField margin="normal"
                                        required
                                        fullWidth
                                        id="password"
                                        name="Password"
                                        autoComplete="email"
                                        autoFocus

                                        label="Password"

                                        value={state.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} md={4}>

                                <div className="form-group text-left">

                                    <TextField margin="normal"
                                        required
                                        fullWidth

                                        name="confirmPassword"
                                        autoComplete="email"
                                        autoFocus
                                        id="confirmPassword"
                                        label="Confirm Password"
                                        value={state.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>



                        </Grid>

                        <Button
                            // style={{ float:'right'}}
                            type="submit"
                            
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmitClick}
                        >
                            Update
                        </Button>
                    </form>
                    <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                        {state.successMessage}
                    </div>
                    <div className="mt-2">
                        {/* <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>  */}
                    </div>

                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default withRouter(UpdateProfileForm);