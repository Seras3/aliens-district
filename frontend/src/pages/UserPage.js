import { useState } from 'react';
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Page from '../components/Page';

import { Grid, Box, Typography } from '@mui/material';
import MenuAppBar from "../components/MenuAppBar";
import UserAvatar from "../components/UserAvatar";
import { addAlphaToHex } from "../utils/colors";
import InfiniteScroll from "react-infinite-scroll-component";


const CARD_HEIGHT = 250;
const CARD_WIDTH = 400;

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


  const renderCard = (height, width, content, index) => {
    return <Box sx={{ height: height + 'px', width: width + 'px' }} bgcolor='red' key={index}>
      {content}
    </Box>
  }

  const renderRow = (height, margin, perRow, arr, index) => {
    return (
      <Box sx={{ height: height + 2 * margin + 'px' }} bgcolor='blue' key={index}>
        <Box sx={{ display: 'flex', height: '100%' }} flexGrow={1} justifyContent='space-around' alignItems='center'>
          {
            Array.from({ length: perRow }).map((i, idx) => {
              return renderCard(CARD_HEIGHT, CARD_WIDTH, index + idx, index + idx)
            })
          }
        </Box>
      </Box >
    );
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
              {items.map((i, index) => {
                let perRow = 2;
                if (index % perRow === 0) {
                  return renderRow(CARD_HEIGHT, 25, perRow, items, index);
                }
                return;
              })}
            </InfiniteScroll>


          </Grid >
        </Grid>
        <Grid item xs />
      </Grid>


    </Page >
  );
}

export default UserPage;