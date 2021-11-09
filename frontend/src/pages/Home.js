import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { logout } from "../firebase";
import { Link } from "react-router-dom";

import { Button, Box, Grid } from '@mui/material';

function Home() {
  const [user, loading, error] = useAuthState(getAuth());

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error}</div>


  return (
    <Box sx={{ display: 'flex' }} flexDirection="column" alignItems="center" >
      <p>{user ? JSON.stringify(user) : "No user logged in."}</p>
      {user ?
        <Button variant="contained" onClick={logout}>Log out</Button>
        :
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" component={Link} to="/login" >Sign In</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" component={Link} to="/register">Sign Up</Button>
          </Grid>
        </Grid>}
    </Box >
  );
}

export default Home;