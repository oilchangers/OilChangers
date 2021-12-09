import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import {checkValidationFormAllControls} from '../../constants/validation';
import { withRouter } from "react-router-dom";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function LoginForm(props) {
    const [responseState,setResponceS] = useState([]); 
   
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })
    const [objError, setObjError] = useState('')
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        
        var objValidation =checkValidationFormAllControls(document.forms[0].elements,false,[])
        if(objValidation.valid!==false){
            
            setObjError(objValidation);
            return ;
        }
        const payload = {
            "email": state.email,
            "password": state.password,
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token token=--WEBRmfcyzgRpxrWEB--'
          }
        
        axios.post(API_BASE_URL + '/members/auth', payload,{
            headers: headers
          })
            .then(function (response) {
                
                if (response.status === 200) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Login successful. Redirecting to home page..'
                    }))
                    setResponceS(response);
                     
                    localStorage.setItem('data', JSON.stringify(response));
                    localStorage.setItem(ACCESS_TOKEN_NAME, response.data.apikey);
                    
                    setTimeout(() => {
                        props.history.push('/home',{state:response.data})
                        //redirectToHome();
                    }, 2000);
                    
                    props.showError(null)
                }
                else if (response.code === 204) {
                    props.showError("Username and password do not match");
                }
                else {
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                props.showError("Username and password do not match");
                console.log("Username and password do not match");
            });
            console.log(props);
    }
    const redirectToHome = () => {
        console.log("updated");
        props.updateTitle('Home')
       
        props.history.push("/home");
    }
    const redirectToRegister = () => {
        props.history.push('/register');
        props.updateTitle('Register');
    }
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box component="form" id="login" name="login" noValidate sx={{ mt: 1 }}>
                    
                        <div className="form-group text-left">

                            <TextField margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                value={state.email}
                                onChange={handleChange}
                            />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>{objError.email}</span>
                        <div className="form-group text-left">

                            <TextField margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={state.password}
                                onChange={handleChange}
                            />
                        </div>

                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>{objError.password}</span>
                        <div className="form-check">
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmitClick}
                        >Submit</Button>
                    
                    <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                        {state.successMessage}
                    </div>
                    <div className="registerMessage">
                        <span>Dont have an account? </span>
                        <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
                    </div>

                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default withRouter(LoginForm);