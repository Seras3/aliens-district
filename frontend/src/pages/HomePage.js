import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../store/slices/authSlice";
import { Link } from "react-router-dom";

import Page from '../components/Page';

import { Button, Grid, Paper } from '@mui/material';
import MenuAppBar from "../components/MenuAppBar";
import { authSelector, isUserAuthenticatedSelector } from "../store/selectors/auth";

function Home() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(isUserAuthenticatedSelector);
  const authData = useSelector(authSelector);


  const handleLogout = () => { dispatch(logout()) };


  return (
    <Page>
      <MenuAppBar />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <p style={{ wordWrap: 'break-word' }}>{authData ? JSON.stringify(authData) : "No user logged in."}</p>
          </Paper>
        </Grid>
      </Grid>
      {
        isAuthenticated ?
          <Button variant="contained" onClick={handleLogout}>Log out</Button>
          :
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" component={Link} to="/login" >Sign In</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" component={Link} to="/register">Sign Up</Button>
            </Grid>
          </Grid>
      }
    </Page >
  );
}

export default Home;