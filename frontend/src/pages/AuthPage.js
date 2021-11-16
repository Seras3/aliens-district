import Page from '../components/Page';
import AlienAvatar from '../components/AlienAvatar';
import { Grid } from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function AuthPage(props) {
  const isLogin = props.isLogin ? true : false;

  return (
    <Page paddingTop='10vh'>
      <Grid container item>
        <Grid item xs />
        <Grid container item xs={3} justifyContent="center">
          <AlienAvatar />
        </Grid>
        <Grid item xs />
      </Grid>

      <Grid container item>
        <Grid item xs />
        <Grid item xs={10} md={5} lg={3} >
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </Grid>
        <Grid item xs />
      </Grid>
    </Page >
  );
}

export default AuthPage;