import React, { useState } from 'react';
import axios from 'axios';
import { checkValidationFormAllControls } from '../../constants/validation';
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
 

 

function UpdateProfileForm(props) {
    const [objError, setObjError] = useState('')
    // const [dataObj, setStateData] = useState(JSON.parse(localStorage.getItem("data")))
    console.log(props);
    var objData = props.location.state.state
    var stateObj={
        fname: objData.first_name,
        lname: objData.last_name,
        phone: objData.phone,
        // email: objData.email,
        postal_code: objData.postal_code,
        address1: objData.address1,
        address2: objData.address2,
        city: objData.city,
        state: objData.state,
        country: objData.country,
        birthday: objData.birthday,
        gen: objData.gender,
        

    }
    const [state, setState] = useState(stateObj)
     
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const sendDetailsToServer = () => {
        if (state.fname.length && state.fname.length) {
            props.showError(null);
            const payload = {
                // "email": state.email,
                // "password": state.password,
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
                // "password_confirmation": state.confirmPassword,

            }
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Token token=--WEBRmfcyzgRpxrWEB--'+':'+objData.apikey
            }

            axios.put(API_BASE_URL + '/members', payload, {
                headers: headers
            })
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        console.log(response.data.apikey);
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.apikey);
                        var localStoragedata=JSON.parse(localStorage.getItem('data'))
                        localStoragedata.data=response.data
                        localStorage.setItem('data', JSON.stringify(localStoragedata));
                        setTimeout(() => {
                            props.updateTitle('Update Profile')
                            props.history.push('/home',{state:response.data})
                            //redirectToHome();
                        }, 2000);
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
    
   
    const handleSubmitClick = (e) => {
        e.preventDefault();
        var objValidation = checkValidationFormAllControls(document.forms[0].elements, false, [])
        if (objValidation.valid !== false) {
            setObjError(objValidation);
            //setEmailError(objValidation['email']);
            //PasswordsetError(objValidation['password']);
            return;
        }


        sendDetailsToServer()  // 
    }
 
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="">
                <CssBaseline />
                <Box component="form" noValidate sx={{ mt: 1 }}>


                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
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

                        </Grid>

                        <Grid item xs={12} md={4}>

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
                        </Grid>

                        {/* <Grid item xs={12} md={4}>

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

                        </Grid> */}

                        <Grid item xs={12} md={4}>
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

                        </Grid>

                        <Grid item xs={12} md={4}>
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
                        </Grid>

                        {/* <Grid item xs={12} md={4}>
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

                        </Grid>

                        <Grid item xs={12} md={4}>

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

                        </Grid> */}

                        <Grid item xs={12} md={4}>

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
                        }}>{objError.first_address}</span>

                        </Grid>

                        <Grid item xs={12} md={4}>

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
                        }}>{objError.second_address}</span>

                        </Grid>

                        <Grid item xs={12} md={4}>
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
                        </Grid>

                        <Grid item xs={12} md={4}>
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
                        </Grid>

                       

                        <Grid item xs={12} md={4}>
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
                        </Grid>

                       

                        <Grid item xs={12} md={4}>
                        <div className="form-group text-left">
                            <TextField margin="normal"
                                required
                                fullWidth
                                id="gen"
                                label="Enter Gender"
                                name="gender"
                                autoComplete="gen"
                                autoFocus

                                value={state.gen}
                                onChange={handleChange}
                            />
                             
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>{objError.gender}</span>
                        </Grid>



                    </Grid>

                    <Button className="Update_Button"
                        // style={{ float:'right'}}
                        type="submit"

                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmitClick}
                    >
                        Update
                    </Button>

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