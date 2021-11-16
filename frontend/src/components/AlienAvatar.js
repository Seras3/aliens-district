import { Avatar } from "@mui/material";

function AlienAvatar(props) {

  return <Avatar sx={{
    bgcolor: (theme) => theme.palette.secondary.main,
    width: 100,
    height: 100,
    padding: '1rem',
  }}
    alt='Alien Head'
    src='/favicon.ico'
  />;

}

export default AlienAvatar;