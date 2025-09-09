import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
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
import ContactUs from './pages/ContactUs';

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
              <Route path="/locations/:stateCode" element={<CitiesByState />} />
              <Route path="/locations/:stateCode/:city" element={<StoresByCity />} />
              <Route path="/locations/:stateCode/:city/:idOrAddress" element={<StoreDetails />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </ErrorBoundary>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
