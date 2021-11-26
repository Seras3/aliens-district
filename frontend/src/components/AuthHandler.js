import { useEffect, useCallback } from 'react';
import { getAuth, browserSessionPersistence, setPersistence, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from "react-redux";
import { isUserAuthenticatedSelector } from '../store/selectors/auth';
import { signInWithGoogle, logout } from '../store/slices/authSlice';


function AuthHandler(props) {
  const authenticated = useSelector(isUserAuthenticatedSelector);
  const dispatch = useDispatch();

  const refresh = useCallback(
    async (uid, providerId, displayName, email, photoURL) => {
      const userData = {
        uid,
        providerId,
        displayName,
        email,
        photoURL,
      };
      if (providerId === 'google.com') {
        return dispatch(signInWithGoogle(userData));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const auth = getAuth();
    const f = async () => {
      onAuthStateChanged(auth, async user => {
        if (user && !authenticated) {
          return await refresh(user.uid, user.providerData[0].providerId, user.displayName, user.email, user.photoURL);
        }
        if (!user && !authenticated) {
          dispatch(logout());
        }
      });
      await setPersistence(auth, browserSessionPersistence);
    };
    f();
  });

  return (
    <>
      {props.children}
    </>
  );
}

export default AuthHandler;
