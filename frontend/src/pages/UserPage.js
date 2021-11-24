import { useState } from 'react';
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Page from '../components/Page';

import { Grid, Box, Typography } from '@mui/material';
import MenuAppBar from "../components/MenuAppBar";
import UserAvatar from "../components/UserAvatar";
import { addAlphaToHex } from "../utils/colors";
import InfiniteScrollResponsive from '../components/InfiniteScrollResponsive';
import PostCard from '../components/PostCard';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CARD_HEIGHT = 360;
const CARD_WIDTH = 400;

function UserPage() {
  const [user, loading, error] = useAuthState(getAuth());
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.up('xs'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));


  let perRow;

  if (xs) {
    perRow = 1;
  }

  if (lg) {
    perRow = 2;
  }


  const fetchMoreData = () => {
    if (items.length >= 100) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setItems((prevItems) => [...prevItems, ...Array.from({ length: 20 })]);
    }, 500);
  };

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error}</div>


  const renderCard = (height, width, content, index) => {
    return <PostCard height={height} width={width} content={content} index={index} />
  }
  return (
    <Page>
      <MenuAppBar />
      <Box sx={{ display: 'flex', minHeight: { xs: "30vw", md: "20vw" } }} justifyContent='center' alignItems='center' flexGrow={1}>
        <Box sx={{ display: 'flex' }} flexDirection="column" alignItems='center' marginTop="1rem">
          <UserAvatar size='calc(100px + 5vw)' src={null} />
          <Box bgcolor={(theme) => addAlphaToHex(theme.palette.secondary.main, 0.7)}
            borderRadius='50px'
            marginTop='1rem'
            paddingX='0.5rem'
          >
            <Typography variant="h5" color={(theme) => theme.palette.primary.contrastText}>User Name</Typography>
          </Box>
        </Box>
      </Box>

      <Grid container marginTop="1rem">
        <Grid item xs />
        <Grid container item xs={10} md={10} minHeight='600px' padding="2rem"
          bgcolor={(theme) => addAlphaToHex(theme.palette.primary.main, 0.7)}
          sx={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
          <Grid item xs={12} >
            <Typography variant='h4' color={(theme) => theme.palette.primary.contrastText} marginBottom="1rem">
              Owned Aliens
            </Typography>



            <InfiniteScrollResponsive
              data={items}
              next={fetchMoreData}
              hasMore={hasMore}
              containerHeight={600}
              cardHeight={CARD_HEIGHT}
              cardWidth={CARD_WIDTH}
              renderCard={renderCard}
              perRow={perRow}
            />



          </Grid >
        </Grid>
        <Grid item xs />
      </Grid>


    </Page >
  );
}

export default UserPage;