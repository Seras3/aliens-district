import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import _ from 'lodash';

import { Grid } from '@mui/material';

import AlienAvatar from '../components/AlienAvatar';
import Page from '../components/Page';
import PostForm from '../components/PostForm';

import { getPostById } from '../store/slices/postSlice';

import { editPostSelector } from '../store/selectors/post';
import { authSelector } from '../store/selectors/auth';


function ModifyPostPage(props) {
  const postId = props.match?.params?.id;

  const history = props.history;
  const dispatch = useDispatch();
  const user = useSelector(authSelector);

  let post = useSelector(editPostSelector);

  if (!postId) { post = {}; }

  useEffect(() => {
    if (postId) {
      dispatch(getPostById({ postId }));
    }
  }, [postId]);

  useEffect(() => {
    if (!(_.isEmpty(post))) {
      if (post?.owner?.id !== user.uid) {
        history.replace('/access-denied');
      }
    }
  }, [post]);


  return (
    <Page paddingTop='10vh'>
      <Grid container item>
        <Grid item xs />
        <Grid container item xs={3} justifyContent="center">
          <AlienAvatar />
        </Grid>
        <Grid item xs />
      </Grid>

      <Grid container item>
        <Grid item xs />
        <Grid item xs={10} md={5} lg={3} >
          <PostForm post={post} redirect={() => { history.replace('/user/' + user.uid) }} />
        </Grid>
        <Grid item xs />
      </Grid>
    </Page >
  );
}

export default ModifyPostPage;