import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';


export const rootReducer = {
  ui: uiReducer,
  auth: authReducer,
  post: postReducer,
};