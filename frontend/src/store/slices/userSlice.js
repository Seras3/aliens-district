import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection, addDoc, getDoc,
  getDocs, Timestamp, doc, setDoc,
  deleteDoc, query, orderBy, limit, where
} from "firebase/firestore";
import { db } from '../../firebase';
import { mapSnapshotToObject } from '../utils/mapper';
import {
  INVALID_OPERATION_ERROR,
  INVALID_REQUEST_ERROR
} from '../../utils/errors';



const COLLECTION_NAME = "users";

const initialState = {
  user: undefined,
  loading: false,
  error: undefined,
};

export const getUserById = createAsyncThunk(
  'post/getUserById',
  async ({ userId }, thunkAPI) => {
    if (!userId) return thunkAPI.rejectWithValue({ error: INVALID_REQUEST_ERROR });

    try {
      const userRef = doc(db, COLLECTION_NAME, userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return mapSnapshotToObject(docSnap, userId);
      } else {
        return thunkAPI.rejectWithValue({ error: INVALID_OPERATION_ERROR });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);


const userSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPageOwner(state, action) {
      state.user = undefined;
    }
  },
  extraReducers: builder => {
    builder.addCase(getUserById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

  }
});

export const { clearPageOwner } = userSlice.actions;

export default userSlice.reducer;