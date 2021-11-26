import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogle, signInWithEmail } from '../store/slices/authSlice';

import { Paper, Grid, FormControl, InputLabel, Input, Button, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { isUserAuthenticatedSelector } from "../store/selectors/auth";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = useSelector(isUserAuthenticatedSelector);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInWithEmail({ email, password }));
  };

  const handleGoogleLogin = () => {
    dispatch(signInWithGoogle({ displayName: null }));
  }

  useEffect(() => {
    if (isAuthenticated) history.replace("/");
  }, [isAuthenticated, history]);

  return (
    <Paper>
      <Grid as='form' container
        padding={(theme) => theme.spacing(2)} rowSpacing={3} flexDirection='column'
        onSubmit={handleSubmit}>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input id="email" type="email" aria-describedby="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" aria-describedby="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid container item rowSpacing={1} columnSpacing={1}>
          <Grid item xs={12} sm={6} lg={12}>
            <Button type="submit" variant="contained" fullWidth style={{ height: '100%' }}>Login</Button>
          </Grid>
          <Grid item xs={12} sm={6} lg={12}>
            <Button variant="contained"
              startIcon={<GoogleIcon style={{ fontSize: 30 }} />}
              fullWidth
              onClick={handleGoogleLogin}>
              Login with Google
            </Button>
          </Grid>
        </Grid>

        <Grid container item justifyContent="center">
          Don't have an account?&nbsp;<Link href="/register">SignUp.</Link>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default LoginForm;