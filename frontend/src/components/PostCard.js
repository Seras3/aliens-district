import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DEFAULT_PROFILE_PICTURE_URL } from "../constants";


function PostCard({ height, width, content, index }) {
  return (
    <Card sx={{
      height: height, width: width,
      backgroundColor: (theme) => theme.palette.secondary.main
    }} key={index} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <DeleteForeverIcon fontSize='medium' color='primary' />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={DEFAULT_PROFILE_PICTURE_URL}
        alt="Alien"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostCard;