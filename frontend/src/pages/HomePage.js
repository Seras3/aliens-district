import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { logout } from "../firebase";
import { Link } from "react-router-dom";

import Page from '../components/Page';

import { Button, Grid, Paper, Typography } from '@mui/material';
import MenuAppBar from "../components/MenuAppBar";

function Home() {
  const [user, loading, error] = useAuthState(getAuth());

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error}</div>


  return (
    <Page>
      <MenuAppBar />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <p style={{ wordWrap: 'break-word' }}>{user ? JSON.stringify(user) : "No user logged in."}</p>
          </Paper>
        </Grid>
      </Grid>
      {
        user ?
          <Button variant="contained" onClick={logout}>Log out</Button>
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