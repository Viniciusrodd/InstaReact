
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


// get user photos
export const getUserPhotos = createAsyncThunk('photo/userPhotos', async (id, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user?.token;

    const data = await photoService.getUserPhotos(id, token);
    return data;
});


// delete a photo
export const deletePhoto = createAsyncThunk('photo/delete', async (id, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user?.token;

    const data = await photoService.deletePhoto(id, token);
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors);
    }

    return data;
});


// update a photo
export const updatePhoto = createAsyncThunk('/photo/update', async (photoData, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user?.token;

    const data = photoService.updatePhoto({ title: photoData.title }, photoData.id, token);
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors);
    }

    return data;
});


// get photo by id
export const getPhoto = createAsyncThunk('photo/getphoto', async (id, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user?.token;

    const data = await photoService.getPhoto(id, token);
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors);
    }

    return data;
});


// like a photo
export const like = createAsyncThunk('photo/like', async (id, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user?.token;

    const data = await photoService.like(id, token);
    if(data.erros){
        return thunkAPI.rejectWithValue(data.errors);
    }

    return data
});


// add comment to a photo
export const comment = createAsyncThunk('photo/comment', async (commentData, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user?.token;

    const data = await photoService.comment({comment: commentData.comment}, commentData.id, token);
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors);
    }

    return data;
});


// get all photos
export const getPhotos = createAsyncThunk('photos/getall', async (_, thunkAPI) =>{ // '_' faz o redux entender que o 1' argumento é dispensável...
    const token = thunkAPI.getState().auth.user?.token;

    const data = await photoService.getPhotos(token);
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors);
    }

    return data;
});


// search photo by title
export const searchPhotos = createAsyncThunk('photos/search', async (query, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user?.token;

    const data = await photoService.searchPhotos(query, token);
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors);
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
        .addCase(getUserPhotos.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserPhotos.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        })
        .addCase(deletePhoto.pending, (state) =>{
            state.loading = true;
            state.error = false;
        })
        .addCase(deletePhoto.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.error = null;
            
            state.photos = state.photos.filter((photo) =>{
                return photo._id !== action.payload.id
            });
            
            state.message = action.payload.message;
        })
        .addCase(deletePhoto.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
            state.photo = null;
        })
        .addCase(updatePhoto.pending, (state) =>{
            state.loading = true;
            state.error = false;
        })
        .addCase(updatePhoto.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.error = null;

            state.photos.map((photo) =>{
                if(photo._id === action.payload.photo._id){
                    return (photo.title = action.payload.photo.title);
                }
                return photo;
            });

            state.message = action.payload.message;
        })
        .addCase(updatePhoto.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
            state.photo = null;
        })
        .addCase(getPhoto.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getPhoto.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
        })
        .addCase(like.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.error = null;

            // individual photo
            if(state.photo.likes){
                state.photo.likes.push(action.payload.userId);
            }

            // for homepage exibition photo
            state.photos.map((photo) =>{
                if(photo._id === action.payload.photoId){
                    return photo.likes.push(action.payload.userId);
                }
                return photo;
            });

            state.message = action.payload.message;
        })
        .addCase(like.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(comment.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.error = null;

            state.photo.comments.push(action.payload.comment);
            
            state.message = action.payload.message;
        })
        .addCase(comment.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getPhotos.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getPhotos.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        })
        .addCase(searchPhotos.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(searchPhotos.fulfilled, (state, action) =>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        })    
    }    
});


export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;