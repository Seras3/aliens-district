
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Link,
  Button,
  Box,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AlienAvatar from './AlienAvatar';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { authSelector } from '../store/selectors/auth';
import { logout } from '../store/slices/authSlice';


export default function MenuAppBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(authSelector);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: .5 }}
        >
          <Link href="/" underline='none'>
            <AlienAvatar size={40} padding={'.1rem'} />
          </Link>
        </IconButton>


        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Aliens District
        </Typography>

        {user.authenticated ?
          <Box sx={{ display: 'flex' }}>
            <p> {user.displayName} </p>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => { history.push('/user/' + user.uid) }}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <IconButton
              size="large"
              aria-label="logout"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => dispatch(logout())}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          </Box>
          :
          <div>
            <Button variant="contained" onClick={() => history.push('/login')}>Sign In</Button>
          </div>
        }
      </Toolbar>
    </AppBar>
  );
}