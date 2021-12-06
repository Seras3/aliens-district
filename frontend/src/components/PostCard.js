import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Link
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { DEFAULT_PROFILE_PICTURE_URL } from "../constants";
import moment from 'moment';


function PostCard({ height, width, content, index, editable, onEditClick, onAvatarClick }) {

  const { title, description, imageURL, timestamp, owner } = content;

  const userImageURL = owner?.imageURL;
  const userEmail = owner?.email;

  let action = null;

  if (editable) {
    action = (
      <IconButton aria-label="edit" onClick={onEditClick}>
        <EditIcon fontSize='medium' color='primary' />
      </IconButton>
    );
  }

  if (!timestamp) return <Box width={width} height={height} />

  return (
    <Card sx={{
      height: height, width: width,
      backgroundColor: (theme) => theme.palette.secondary.main
    }} key={index} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe" src={userImageURL}
            onClick={onAvatarClick}
          />
        }
        action={action}
        title={title}
        subheader={moment.utc(timestamp.seconds * 1000).format('LL')}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL ? imageURL : DEFAULT_PROFILE_PICTURE_URL}
        alt="Alien"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card >
  );
}

export default PostCard;