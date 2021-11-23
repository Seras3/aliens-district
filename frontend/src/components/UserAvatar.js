import { Avatar } from "@mui/material";
import { DEFAULT_PROFILE_PICTURE_URL } from "../constants";

function UserAvatar(props) {
  const size = props.size;
  const padding = props.padding;
  const src = props.src;

  return <Avatar sx={{
    bgcolor: (theme) => theme.palette.secondary.main,
    width: size ?? 50,
    height: size ?? 50,
    padding: padding ?? 0,
    border: (theme) => '3px solid ' + theme.palette.secondary.main
  }}
    alt='Profile Picture'
    src={src ?? DEFAULT_PROFILE_PICTURE_URL}
  />;

}

export default UserAvatar;