import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice';


export const rootReducer = {
  ui: uiReducer,
  auth: authReducer,
  post: postReducer,
  user: userReducer,
};