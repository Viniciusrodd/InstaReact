
// libs
import { configureStore } from '@reduxjs/toolkit';

// slice
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import photoReducer from './slices/photoSlice';

// store
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        photo: photoReducer
    }
});