import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from "firebase/firestore/lite";
import { db } from '../../firebase';
import { mapSnapshotToArray } from '../utils/mapper';

import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware';


const postsRef = collection(db, "posts");

const initialState = {
  posts: [],
  error: undefined,
};

export const addPost = createAsyncThunk(
  'post/addPost',
  async ({ title, description, imageURL }, thunkAPI) => {
    isAuthenticatedMiddleware(
      async (user) => {
        try {
          await addDoc(postsRef, {
            title,
            description,
            imageURL,
            timestamp: Date.now(),
            userId: user.uid
          });
        } catch (error) {
          return thunkAPI.rejectWithValue({ error: error.message });
        }
      },
      (message) => {
        return thunkAPI.rejectWithValue({ error: message });
      }
    )
  }
);

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(postsRef);
      const posts = mapSnapshotToArray(querySnapshot);
      return posts;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);


const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: builder => {
    builder.addCase(addPost.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.error = action.error;
    });

  }
});

export default postSlice.reducer;