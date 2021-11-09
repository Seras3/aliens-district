import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  addDoc, collection, query, where, getDoc,
  connectFirestoreEmulator,
} from "@firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signOut
} from 'firebase/auth';
import { DEFAULT_PROFILE_PICTURE_URL } from "./constants";

const firebaseConfig = {
  apiKey: "AIzaSyCkVk7wm5GZQLsDRc8L2vZ_ZwDZLcxBX1k",
  authDomain: "aliens-district.firebaseapp.com",
  projectId: "aliens-district",
  storageBucket: "aliens-district.appspot.com",
  messagingSenderId: "94770152266",
  appId: "1:94770152266:web:949e8cad864e86052437b3",
  measurementId: "G-ZMKE3CNL8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
connectFirestoreEmulator(db, 'localhost', 3000);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(googleProvider);
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
  registerWithEmailAndPassword,
};
