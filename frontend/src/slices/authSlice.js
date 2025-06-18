// libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// services
import authService from "../services/authService";

// get user
const user = JSON.parse(localStorage.getItem('user'));

// state
const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false
};


// register an user and login
// "createAsyncThunk" is for async calls... 
export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) =>{
        // executing register
        const data = await authService.register(user);

        //check for errors
        if(data.errors){ 
            return thunkAPI.rejectWithValue(data.errors[0]); // rejecting the request 
        }

        return data;
    }
);


// export slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) =>{
            state.loading = false;
            state.error = false;
            state.success = false;
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(register.pending, (state) =>{
            state.loading = true;
            state.error = false;
        }).addCase(register.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        }).addCase(register.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;