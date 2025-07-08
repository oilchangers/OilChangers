import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';
import { ADMIN_API_BASE_URL } from '../../constants/apiConstants';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Box = styled(Paper)(({ theme }) => ({ width: '100%', marginTop: '2%', marginBottom: '2%' }));

function Home() {

  // at the top of your component
  const location = useLocation();
  const navigate = useNavigate();
  const [dataObj] = useState(location.state);
  var [offerData, setStateOfferData] = useState([])
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token token=--WEBRmfcyzgRpxrWEB--' + ':p5fMGgX4FEVPK_kI4rOwtQ'
  }

  useEffect(() => {
    axios.get(ADMIN_API_BASE_URL + 'vendors/HevIEFBhjwkv0Te8zFw8GQ/locations/oNgZPKXU0hoH64aMI5T-qQ/promotions', {
      headers: headers
    }).then(async function (response) {
      if (response.status === 200) {
        setStateOfferData(response.data)

      }
    })
      .catch(function (error) {
        //redirectToLogin()
      });
  }, [])
  function redirectToLogin() {
    navigate('/login');
  }
  function redirectToUpdateProfile() {
    // props.updateTitle('Upadte')//
    navigate('/UpdateProfileForm', { state: location.state });
  }
  return (

    <Box >
      <Grid container spacing={2}>
        <Grid className="grid-row">
          <div className="grid-col"><label>Name :</label><span>{dataObj.first_name} {dataObj.last_name}</span></div>
          <div className="grid-col"><label>Mailing address :</label><span>{dataObj.address1 + ' ' + dataObj.address2}</span></div>
          <div className="grid-col"><label>Birthday :</label><span>{dataObj.birthday}</span></div>

        </Grid>

        <Grid className="grid-row">

          <div className="grid-col"><label>City, State :</label><span>{dataObj.city + ' ' + dataObj.state}</span></div>
          <div className="grid-col"><label>Gender :</label><span>{dataObj.gender}</span></div>

        </Grid>
        <Grid className="grid-row">
          <div className="grid-col"><label>Email :</label><span>{dataObj.email}</span></div>
          <div className="grid-col"><label>Zip :</label><span>{dataObj.postal_code}</span></div>
          <div className="grid-col"><label>Phone :</label><span>{dataObj.phone}</span></div>
        </Grid>
        <Grid className="grid-row">
          <button type="submit" className="btn btn-primary btn-submit" onClick={redirectToUpdateProfile}>Update info</button>
        </Grid>


        <Grid className="grid-row">
          <div className={'col col-total'}><span>Total Points:</span> <span>110</span></div>
          <hr />
        </Grid>



        <Grid className="grid-row">
          <div className={'col col-total'}> <strong>Available offer</strong></div>
          <hr />
        </Grid>
        <Grid className={"row offers grid-row"}>
          {offerData.map((res, i) => {

            // Return the element. Also pass key  

            return (<div className={'col-4 border col-offer'}><h5 className={'align-h'}>{res.name}</h5><span>{res.description}</span></div>)
          })}

        </Grid>



      </Grid>


    </Box>

  )
}

export default Home;