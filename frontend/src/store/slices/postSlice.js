import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection, addDoc, getDoc,
  getDocs, Timestamp, doc, setDoc,
  deleteDoc
} from "firebase/firestore/lite";
import { db } from '../../firebase';
import { mapSnapshotToArray } from '../utils/mapper';
import { PERMISSION_DENIED_ERROR, INVALID_OPERATION_ERROR } from '../../utils/errors';
import { cleanObject } from '../utils/mapper';

import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware';


const COLLECTION_NAME = "posts";
const postsRef = collection(db, COLLECTION_NAME);

const initialState = {
  posts: [],
  error: undefined,
};

export const addPost = createAsyncThunk(
  'post/addPost',
  async ({ title, description, imageURL }, thunkAPI) => {
    return isAuthenticatedMiddleware(
      async (user) => {
        try {
          await addDoc(postsRef, {
            title,
            description,
            imageURL,
            timestamp: Timestamp.now(),
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

export const editPost = createAsyncThunk(
  'post/editPost',
  async ({ postId, title, description, imageURL }, thunkAPI) => {
    return await isAuthenticatedMiddleware(
      async (user) => {
        const postRef = doc(db, COLLECTION_NAME, postId);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
          if (docSnap.data().userId === user.uid) {
            try {
              const cleanObj = cleanObject({ title, description, imageURL });
              await setDoc(postRef, cleanObj, { merge: true });

            } catch (error) {
              return thunkAPI.rejectWithValue({ error: error.message });
            }

          } else {
            return thunkAPI.rejectWithValue({ error: PERMISSION_DENIED_ERROR });
          }

        } else {
          return thunkAPI.rejectWithValue({ error: INVALID_OPERATION_ERROR });
        }
      },
      (message) => {
        return thunkAPI.rejectWithValue({ error: message });
      }
    );
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async ({ postId }, thunkAPI) => {
    return await isAuthenticatedMiddleware(
      async (user) => {
        const postRef = doc(db, COLLECTION_NAME, postId);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
          if (docSnap.data().userId === user.uid) {
            try {
              await deleteDoc(postRef);

            } catch (error) {
              return thunkAPI.rejectWithValue({ error: error.message });
            }

          } else {
            return thunkAPI.rejectWithValue({ error: PERMISSION_DENIED_ERROR });
          }

        } else {
          return thunkAPI.rejectWithValue({ error: INVALID_OPERATION_ERROR });
        }
      },
      (message) => {
        return thunkAPI.rejectWithValue({ error: message });
      }
    );
  }
);


const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: builder => {
    builder.addCase(addPost.rejected, (state, action) => {
      state.error = action.payload.error;
    });


    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.error = action.payload.error;
    });


    builder.addCase(editPost.rejected, (state, action) => {
      state.error = action.payload.error;
    });


    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.payload.error;
    });
  }
});

export default postSlice.reducer;