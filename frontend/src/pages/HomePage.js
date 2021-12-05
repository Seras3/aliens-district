import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

import { Button, Grid, Paper, useMediaQuery, Typography, Box } from '@mui/material';
import { Link } from "react-router-dom";

import Page from '../components/Page';
import MenuAppBar from "../components/MenuAppBar";
import InfiniteScrollResponsive from '../components/InfiniteScrollResponsive';
import PostCard from '../components/PostCard';

import { addAlphaToHex } from '../utils/colors';

import { authSelector, isUserAuthenticatedSelector } from "../store/selectors/auth";
import { postSelector } from '../store/selectors/post';
import { uiSelector } from '../store/selectors/ui';
import { getAllPosts } from '../store/slices/postSlice';

function Home() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(isUserAuthenticatedSelector);
  const postState = useSelector(postSelector);
  const user = useSelector(authSelector);
  const ui = useSelector(uiSelector);

  const loadNextPosts = () => {
    setTimeout(() => {
      dispatch(getAllPosts());
    }, 250); // TODO: remove delay when sure 
  };

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false); // TOTO: set to true when enable pagination

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

  useEffect(() => {
    loadNextPosts();
  }, []);

  useEffect(() => {
    if (items.length >= 100) { // TODO: update hasMore logic
      setHasMore(false);
      return;
    }

    setItems((prevItems) => [...prevItems, ...(postState.posts)]);
  }, [postState.posts]);


  const renderCard = (height, width, content, index) => {
    return <PostCard height={height} width={width} content={content} index={index} />
  }


  return (
    <Page>
      <MenuAppBar />
      <Box width='100%'>
        <Typography
          variant={lg ? 'h3' : 'h4'}
          color={(theme) => theme.palette.primary.contrastText}
          marginBottom="1rem"
          marginTop="2rem"
          align="center">
          {isAuthenticated ? 'Fresh Aliens' : 'Last 6 Aliens'}
        </Typography>
      </Box>

      <Grid container marginTop="1rem">
        <Grid item xs />
        <Grid container item xs={10} md={10} minHeight='600px' padding="2rem"
          bgcolor={(theme) => addAlphaToHex(theme.palette.primary.main, 0.7)}
          sx={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
          <Grid item xs={12} >

            <InfiniteScrollResponsive
              data={items}
              next={loadNextPosts}
              hasMore={hasMore}
              containerHeight={600}
              cardHeight={ui.postCard.height}
              cardWidth={ui.postCard.width}
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

export default Home;