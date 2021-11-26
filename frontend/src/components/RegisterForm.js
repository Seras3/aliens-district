import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { registerWithEmailAndPassword } from '../store/slices/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { isUserAuthenticatedSelector } from "../store/selectors/auth";

import { Paper, Grid, FormControl, InputLabel, Input, Button, Link } from '@mui/material';

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isAuthenticated = useSelector(isUserAuthenticatedSelector);

  const history = useHistory();
  const dispatch = useDispatch();


  const register = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter name");
      return;
    }

    dispatch(registerWithEmailAndPassword({ name, email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) history.replace("/");
  }, [isAuthenticated, history]);


  return (
    <Paper>
      <Grid as='form' container
        padding={(theme) => theme.spacing(2)} rowSpacing={3} flexDirection='column'
        onSubmit={register}>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" type="name" aria-describedby="name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </Grid>

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


        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth style={{ height: '100%' }}>
            Register
          </Button>
        </Grid>


        <Grid container item justifyContent="center">
          Already have an account?&nbsp;<Link href="/login">SignIn.</Link>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default RegisterForm;