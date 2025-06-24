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
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) =>{
        // executing register
        const data = await authService.register(user);

        //check for errors
        if(data.errors){ 
            return thunkAPI.rejectWithValue(data.errors); // rejecting the request 
        }

        return data;
    }
);


// logout user
export const logout = createAsyncThunk('auth/logout', async () =>{
    await authService.logout();
});


// login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) =>{
        // executing register
        const data = await authService.login(user);

        //check for errors
        if(data.errors){ 
            return thunkAPI.rejectWithValue(data.errors); // rejecting the request 
        }

        return data;
    }
);


// slice
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
        }).addCase(logout.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = false;
            state.error = null;
            state.user = null;
        }).addCase(login.pending, (state) =>{
            state.loading = true;
            state.error = false;
        }).addCase(login.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        }).addCase(login.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;