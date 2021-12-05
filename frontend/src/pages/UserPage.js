import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import Page from '../components/Page';

import { Grid, Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuAppBar from "../components/MenuAppBar";
import UserAvatar from "../components/UserAvatar";
import { addAlphaToHex } from "../utils/colors";
import InfiniteScrollResponsive from '../components/InfiniteScrollResponsive';
import PostCard from '../components/PostCard';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import _ from 'lodash';

import { uiSelector } from '../store/selectors/ui';
import { authSelector } from '../store/selectors/auth';
import { postSelector } from '../store/selectors/post';

import { getUserPosts } from '../store/slices/postSlice';



function UserPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userPageId = props.match.params.id;

  const ui = useSelector(uiSelector);
  const postState = useSelector(postSelector);
  const user = useSelector(authSelector);

  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(false); // TOTO: set to true when enable pagination
  const [requestLimit, setRequestLimit] = useState(4);


  const isMyPage = user.uid === userPageId;

  const loadNextPosts = _.debounce(() => {
    // TODO: use NextPage
    setTimeout(() => {
      dispatch(getUserPosts({ userId: userPageId, reqLimit: requestLimit }));
    }, 250); // TODO: remove delay when sure 
    setNextPage(nextPage + 1);
  }, 350);

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.up('xs'));
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
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
  }, [])

  useEffect(() => {
    setRequestLimit(user.authenticated ? 6 : 4);
  }, [user.authenticated]);


  useEffect(() => {
    if (items.length >= 100) { // TODO: update hasMore logic
      setHasMore(false);
      return;
    }

    setItems((prevItems) => {
      return nextPage === 1 ? [] : [...prevItems, ...(postState.posts)]
    });

  }, [postState.posts]);


  const renderCard = (height, width, content, index) => {
    return <PostCard
      height={height} width={width}
      content={content} index={index}
      editable={isMyPage}
      onEditClick={() => { history.push('/post/' + content.id) }}
    />
  }

  return (
    <Page>
      <MenuAppBar />
      <Box sx={{ display: 'flex', minHeight: { xs: "30vw", md: "20vw" } }} justifyContent='center' alignItems='center' flexGrow={1}>
        <Box sx={{ display: 'flex' }} flexDirection="column" alignItems='center' marginTop="1rem">
          <UserAvatar size='calc(100px + 5vw)' src={user.photoURL} />
          <Box bgcolor={(theme) => addAlphaToHex(theme.palette.secondary.main, 0.7)}
            borderRadius='50px'
            marginTop='1rem'
            paddingX='0.5rem'
          >
            <Typography variant="h5" color={(theme) => theme.palette.primary.contrastText}>
              {user.displayName}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container marginTop="1rem">
        <Grid item xs />
        <Grid container item xs={10} md={10} minHeight='600px' padding="2rem"
          bgcolor={(theme) => addAlphaToHex(theme.palette.primary.main, 0.7)}
          sx={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
          <Grid item xs={12} >
            <Box sx={{ display: 'flex', flexDirection: (sm ? 'row' : 'column-reverse') }}
              justifyContent="space-between" paddingLeft="1rem" paddingRight='1rem'
              marginBottom="2rem">

              <Typography variant='h4' color={(theme) => theme.palette.primary.contrastText} marginBottom="1rem">
                {user.authenticated ? 'Owned Aliens' : 'Last 4 Aliens'}
              </Typography>

              <Button variant="contained"
                sx={{ marginBottom: (sm ? '' : '2rem') }}
                startIcon={<AddIcon style={{ fontSize: 30 }} />}
                onClick={() => history.push('/new-post')}>
                Add New Alien
              </Button>
            </Box>


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

export default UserPage;