import { Avatar } from "@mui/material";

function AlienAvatar(props) {
  const size = props.size;
  const padding = props.padding;

  return <Avatar sx={{
    bgcolor: (theme) => theme.palette.secondary.main,
    width: size ?? 100,
    height: size ?? 100,
    padding: padding ?? '1rem',
  }}
    alt='Alien Head'
    src='/favicon.ico'
  />;

}

export default AlienAvatar;