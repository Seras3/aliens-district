import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  addDoc, collection, query, where, getDoc,
  connectFirestoreEmulator,
} from "@firebase/firestore";
import {
  signInWithRedirect,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signOut
} from 'firebase/auth';
import { DEFAULT_PROFILE_PICTURE_URL } from "./constants";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
connectFirestoreEmulator(db, 'localhost', 3000);

const googleProvider = new GoogleAuthProvider();


const signInWithGoogle = async () => {
  try {
    const res = await signInWithRedirect(auth, googleProvider);
    const user = res.user;
    const queryData = await getDoc(query(collection(db, "users"), where("uid", "==", user.uid)));
    if (!queryData.data()) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWitEmail = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    updateProfile(res.user, {
      displayName: name,
      photoURL: DEFAULT_PROFILE_PICTURE_URL
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((err) => {
      console.error(err);
      alert(err.message);
    });

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((err) => {
    alert(err.message);
  });
}


export {
  logout,
  signInWithGoogle,
  signInWitEmail,
  registerWithEmailAndPassword,
};

