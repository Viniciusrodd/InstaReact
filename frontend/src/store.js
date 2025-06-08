
// libs
import { configureStore } from '@reduxjs/toolkit';

// slice
import authReducer from './slices/authSlice';

// store
export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});