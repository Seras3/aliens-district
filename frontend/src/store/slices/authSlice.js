import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
  collection, addDoc, getDoc,
  getDocs, Timestamp, doc, setDoc,
  deleteDoc, query, orderBy, limit, where
} from "firebase/firestore";

import { db } from '../../firebase';
import '../../firebase';
import { DEFAULT_PROFILE_PICTURE_URL } from '../../constants';


const COLLECTION_NAME = "users";

const initialState = {
  uid: undefined,
  displayName: undefined,
  email: undefined,
  authenticated: undefined,
  photoURL: undefined,
  error: undefined,
};

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();


const saveUser = async (user, thunkAPI) => {
  const userRef = doc(db, COLLECTION_NAME, user.uid);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    try {
      await setDoc(userRef, {
        ...user,
        timestamp: Timestamp.now(),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
}

export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName, photoURL } = response.user;
      return { uid, displayName, email, photoURL };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const registerWithEmailAndPassword = createAsyncThunk(
  'auth/registerWithEmailAndPassword',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      updateProfile(res.user, {
        displayName: name,
        photoURL: DEFAULT_PROFILE_PICTURE_URL
      }).then(async () => {
        const { uid } = getAuth().currentUser;
        const user = { uid, displayName: name, email, photoURL: DEFAULT_PROFILE_PICTURE_URL };
        await saveUser(user, thunkAPI);
        return { ...user };
      }).catch((error) => {
        return thunkAPI.rejectWithValue({ error: error.message });
      });

    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);


export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (req, thunkAPI) => {
    try {
      if (req.displayName === null) {
        const response = await signInWithPopup(auth, googleProvider);
        const { uid, displayName, email, photoURL } = response.user;
        const user = { uid, displayName, email, photoURL };
        await saveUser(user, thunkAPI);
        return { ...user };
      } else {
        const { uid, displayName, email, photoURL } = req;
        return { uid, displayName, email, photoURL };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const setAuthReducer = (state, action) => {
  const { uid, displayName, email, photoURL, authenticated } = action.payload;
  state.uid = uid;
  state.displayName = displayName;
  state.email = email;
  state.photoURL = photoURL;

  if (authenticated) {
    state.authenticated = authenticated;
  }
}



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: setAuthReducer
  },
  extraReducers: builder => {
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      setAuthReducer(state, action);
      state.authenticated = true;
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.error = action.payload.error;
    });

    builder.addCase(registerWithEmailAndPassword.fulfilled, (state, action) => {
      setAuthReducer(state, action);
      state.authenticated = true;
    });
    builder.addCase(registerWithEmailAndPassword.rejected, (state, action) => {
      state.error = action.payload.error;
    });

    builder.addCase(signInWithEmail.fulfilled, (state, action) => {
      setAuthReducer(state, action);
      state.authenticated = true;
    });
    builder.addCase(signInWithEmail.rejected, (state, action) => {
      state.error = action.payload.error;
    });


    builder.addCase(logout.fulfilled, state => {
      state.authenticated = false;
      setAuthReducer(state, { payload: initialState });
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload.error;
    });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;