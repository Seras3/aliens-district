import { useEffect } from 'react';
import { getAuth, browserSessionPersistence, setPersistence, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { setAuth, logout } from '../store/slices/authSlice';

function AuthHandler(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const f = async () => {
      onAuthStateChanged(auth, async user => {
        if (user) {
          const payload = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            authenticated: true,
          };
          dispatch(setAuth(payload));
        } else {
          dispatch(logout());
        }
      });
      await setPersistence(auth, browserSessionPersistence);
    };
    f();
  }, [dispatch]);

  return (
    <>
      {props.children}
    </>
  );
}

export default AuthHandler;
