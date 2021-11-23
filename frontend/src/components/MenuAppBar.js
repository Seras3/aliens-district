
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Link,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlienAvatar from './AlienAvatar';
import { useHistory } from 'react-router';

export default function MenuAppBar() {
  const history = useHistory();


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


        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => { history.push('/user') }}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}