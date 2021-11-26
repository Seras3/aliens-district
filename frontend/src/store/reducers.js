import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';


export const rootReducer = {
  ui: uiReducer,
  auth: authReducer,
};