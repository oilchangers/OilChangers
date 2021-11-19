import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';



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

const Box = styled(Paper)(({ theme }) => ({ width: '100%', marginTop: '2%', marginBottom: '2%' }));

function Home(props) {
  // useEffect(() => {
  //     axios.get(API_BASE_URL+'/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
  //     .then(function (response) {
  //         if(response.status !== 200){
  //           redirectToLogin()
  //         }
  //     })
  //     .catch(function (error) {
  //       redirectToLogin()
  //     });
  //   })
  function redirectToLogin() {
    props.history.push('/login');
  }
  function redirectToUpdateProfile() {
    // props.updateTitle('Upadte')//
    props.history.push('/UpdateProfileForm');
  }
  return (

    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Item>First Name </Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>Mailing address</Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>Birthday</Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>Last Name</Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>City, State</Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>Gender</Item>
        </Grid>

        <Grid item xs={6} md={4}>
          <Item>Email </Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>Zip</Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <button type="submit" className="btn btn-primary" onClick={redirectToUpdateProfile}>Update info</button>
        </Grid>

        <Grid item xs={6} md={4}>
          <Item>Phone </Item>
        </Grid>
        <Grid item xs={6} md={4}>

        </Grid>
        <Grid item xs={6} md={4}>

        </Grid>

        <Grid item xs={12} md={12}>
          {/* <Item style={{textAlign:'left'}}><span>Total Points:</span> <span>110</span> </Item> */}
          <Item>
          <Grid item xs={6} md={4}>
           
          <span>Total Points:</span> <span>110</span>
          </Grid>
          <Grid item xs={6} md={4}>

          </Grid>
          <Grid item xs={6} md={4}>

          </Grid>
          </Item>
        </Grid>


        <Grid item xs={12} md={12}>
          {/* <Item style={{textAlign:'left'}}><span>Total Points:</span> <span>110</span> </Item> */}
          
          <Grid item xs={6} md={4}>
           
          Available offer
          </Grid>
          <Grid item xs={6} md={4}>

          </Grid>
          <Grid item xs={6} md={4}>

          </Grid>
         
        </Grid>


        <Grid item xs={6} md={3}>
          <div style={{ border: '1px solid', height: '167px', display: 'flex', alignItems: 'center',  justifyContent: 'center', }}>
            Offer 1
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div style={{ border: '1px solid', height: '167px', display: 'flex', alignItems: 'center',  justifyContent: 'center', }}>
            Offer 2
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div style={{ border: '1px solid', height: '167px', display: 'flex', alignItems: 'center',  justifyContent: 'center', }}>
            Offer 3
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div style={{ border: '1px solid', height: '167px', display: 'flex', alignItems: 'center',  justifyContent: 'center', }}>
            Offer 4
          </div>
        </Grid>

        
      </Grid>


    </Box>

  )
}

export default withRouter(Home);