import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
    next(user);
  } else {
    reject("You should authenticate in order to do that.");
  }
}

export default isAuthenticatedMiddleware;