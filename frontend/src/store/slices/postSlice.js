import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection, addDoc, getDoc,
  getDocs, Timestamp, doc, setDoc,
  deleteDoc, query, orderBy, limit, where
} from "firebase/firestore";
import { db } from '../../firebase';
import { mapSnapshotToArray, mapSnapshotToObject } from '../utils/mapper';
import {
  PERMISSION_DENIED_ERROR,
  INVALID_OPERATION_ERROR,
  INVALID_REQUEST_ERROR
} from '../../utils/errors';
import { cleanObject } from '../utils/mapper';

import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware';


const COLLECTION_NAME = "posts";
const postsRef = collection(db, COLLECTION_NAME);

const initialState = {
  posts: [],
  loading: false,
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
      const q = query(postsRef, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const posts = mapSnapshotToArray(querySnapshot);
      return posts;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getUserPosts = createAsyncThunk(
  'post/getUserPosts',
  async ({ userId, reqLimit }, thunkAPI) => {
    if (!userId) return thunkAPI.rejectWithValue({ error: INVALID_REQUEST_ERROR });
    try {
      const q = query(postsRef, where('userId', '==', userId), limit(reqLimit));
      const querySnapshot = await getDocs(q);
      const posts = mapSnapshotToArray(querySnapshot);
      return posts;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getPostById = createAsyncThunk(
  'post/getPostById',
  async ({ postId }, thunkAPI) => {
    if (!postId) return thunkAPI.rejectWithValue({ error: INVALID_REQUEST_ERROR });

    try {
      const postRef = doc(db, COLLECTION_NAME, postId);
      const docSnap = await getDoc(postRef);
      if (docSnap.exists()) {
        return mapSnapshotToObject(docSnap, postId);
      } else {
        return thunkAPI.rejectWithValue({ error: INVALID_OPERATION_ERROR });
      }
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
    builder.addCase(addPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addPost.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    builder.addCase(getAllPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    builder.addCase(getUserPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    builder.addCase(getPostById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.editPost = action.payload;
      state.loading = false;
    });
    builder.addCase(getPostById.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });


    builder.addCase(editPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });


    builder.addCase(deletePost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
  }
});

export default postSlice.reducer;