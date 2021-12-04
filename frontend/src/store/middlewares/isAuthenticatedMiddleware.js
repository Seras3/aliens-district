import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UNAUTHENTICATED_ERROR_MESSAGE } from '../../utils/errors';

const auth = getAuth();

let user;

onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    user = currentUser;
  } else {
    user = null;
  }
});


const isAuthenticatedMiddleware = async (next, reject) => {
  if (user) {
    return await next(user);
  } else {
    return reject(UNAUTHENTICATED_ERROR_MESSAGE);
  }
}

export default isAuthenticatedMiddleware;