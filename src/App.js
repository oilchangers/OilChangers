import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import UpdateProfileForm from './components/UpdateProfileForm/UpdateProfileForm';
import Home from './components/Home/Home';
import PrivateRoute from './utils/PrivateRoute';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent';
function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App">
        <Header title={title} />
        <div className="container d-flex align-items-center flex-column">
          <Routes>
            <Route path="/" exact={true} element={<RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />} />
            <Route path="/register" element={<RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />} />
            <Route path="/login" element={<LoginForm showError={updateErrorMessage} updateTitle={updateTitle} />} />
            <Route path="/UpdateProfileForm" element={<UpdateProfileForm showError={updateErrorMessage} updateTitle={updateTitle} />} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          </Routes>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
