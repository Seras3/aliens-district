import { useState } from 'react';
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Page from '../components/Page';

import { Paper, Grid, Box, Typography } from '@mui/material';
import MenuAppBar from "../components/MenuAppBar";
import UserAvatar from "../components/UserAvatar";
import { addAlphaToHex } from "../utils/colors";
import InfiniteScroll from "react-infinite-scroll-component";


function UserPage() {
  const [user, loading, error] = useAuthState(getAuth());
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);

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



            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              height={600}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {items.map((i, index) => (
                <Box height="100px" margin='2px' bgcolor='white' key={index}>
                  div - #{index}
                </Box>
              ))}
            </InfiniteScroll>


          </Grid >
        </Grid>
        <Grid item xs />
      </Grid>


    </Page >
  );
}

export default UserPage;