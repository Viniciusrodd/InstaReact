
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


// slice
export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        resetMessage: (state) =>{
            state.message = null;
        }
    }
});


export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;