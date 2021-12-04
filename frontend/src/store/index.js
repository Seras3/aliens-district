import { configureStore } from '@reduxjs/toolkit';
import {
  getFirebase,
  actionTypes as rrfActionTypes,
} from 'react-redux-firebase';
import { constants as rfConstants } from 'redux-firestore';
import { rootReducer } from './reducers';

const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            // just ignore every redux-firebase and react-redux-firebase action type
            ...Object.keys(rfConstants.actionTypes).map(
              (type) => `${rfConstants.actionsPrefix}/${type}`
            ),
            ...Object.keys(rrfActionTypes).map(
              (type) => `@@reactReduxFirebase/${type}`
            ),
          ],
          ignoredPaths: ['firebase', 'firestore',],
        },
        thunk: {
          extraArgument: {
            getFirebase,
          },
        },
      }),
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store;
}

export default configureAppStore;