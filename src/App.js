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
import LocationFinder from './pages/LocationFinder';
import CitiesByState from './components/CitiesByState/CitiesByState';
import StoresByCity from './components/StoresByCity/StoresByCity';
import StoreDetails from './pages/StoreDetails';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import GenericErrorPage from './pages/Error/GenericErrorPage';

function App() {
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container d-flex align-items-center flex-column">
          <ErrorBoundary fallback={<GenericErrorPage />}>
            <Routes>
              <Route path="/" exact={true} element={<LocationFinder />} />
              <Route path="/:stateCode" element={<CitiesByState />} />
              <Route path="/:stateCode/:city" element={<StoresByCity />} />
              <Route path="/:stateCode/:city/:idOrAddress" element={<StoreDetails />} />
            </Routes>
          </ErrorBoundary>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
