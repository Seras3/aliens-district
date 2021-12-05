import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';

import {
  Paper, Grid, FormControl,
  Button, TextField
} from '@mui/material';
import { addPost, deletePost, editPost } from '../store/slices/postSlice';

function PostForm({ post, redirect }) {
  // TODO: same form for edit
  const isEdit = !(_.isEmpty(post));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    setTitle(post?.title ? post.title : '');
    setDescription(post?.description ? post.description : '')
    setImageURL(post?.imageURL ? post.imageURL : '')
  }, [post]);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit) {
      try {
        await dispatch(addPost({ title, description, imageURL })).unwrap();
        redirect();
      } catch (e) {
        alert('Oops, an error occured');
      }
    } else {
      try {
        await dispatch(editPost({ postId: post.id, title, description, imageURL })).unwrap();
        redirect();
      } catch (e) {
        alert('Oops, an error occured');
      }
    }
  };

  const deletePostHandler = async () => {
    try {
      await dispatch(deletePost({ postId: post.id })).unwrap();
      redirect();
    } catch (e) {
      alert('Oops, an error occured');
    }
  }

  return (
    <Paper>
      <Grid as='form' container
        padding={(theme) => theme.spacing(2)} rowSpacing={3} flexDirection='column'
        onSubmit={handleSubmit}>
        <Grid item>
          <FormControl fullWidth>
            <TextField
              id='title'
              label='Title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <TextField
              id='description'
              label='Description'
              type='text'
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl fullWidth>
            <TextField
              id='imageURL'
              label='ImageURL'
              type='url'
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid container item rowSpacing={1} columnSpacing={1}>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth style={{ height: '100%' }}>
              {isEdit ? 'Save Post' : 'Create Post'}
            </Button>
          </Grid>
          {isEdit &&
            <Grid item xs={12}>
              <Button variant="contained" fullWidth
                style={{ height: '100%' }}
                color="error"
                onClick={deletePostHandler}
              >
                Delete Post
              </Button>
            </Grid>
          }
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PostForm;