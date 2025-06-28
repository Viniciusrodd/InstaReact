
// libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// service
import photoService from "../services/PhotoService";

// state
const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
};


//////// functions


// publish an user photo
export const publishPhoto = createAsyncThunk('photo/publish', async (photo, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user?.token; // auth came from 'authSlice'

    const data = await photoService.publishPhoto(photo, token);
    
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors); // rejecting the request
    }

    return data;
});


// slice
export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        resetMessage: (state) =>{
            state.message = null;
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(publishPhoto.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(publishPhoto.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
            state.photos.unshift(state.photo); // unshift(array method) it's like "push", but adds data in beginning position
            state.message = 'Foto publicada com sucesso!'
        })
        .addCase(publishPhoto.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
            state.photo = null;
        })
    }
});


export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;