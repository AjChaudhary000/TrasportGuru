import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import TrasportApi from '../api/TrasportApi';

export const userProfile = createAsyncThunk(
    'user/userProfile',
    async (obj, getState) => {
        try {
            var data = new FormData();
            const { uri, type, fileName } = obj.imagepath;
            //console.log(obj.imagepath);
            data.append('username', obj.username);
            data.append('image', obj.imagepath);
            console.log(data._parts)
            const response = await TrasportApi.post('/user/me', data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                    //  "Content-Type": "multipart/form-data;",
                    //  "Content-Length": data.length
                }

            });

            console.log("swfhebnw8fhb8e7w", responseJson)
        }
        catch (e) {
            console.log(e)
        }
    })
export const userProfileSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: '',
        data: {}
    },
    reducers: {

    },
    extraReducers: {
        [userProfile.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [userProfile.payload]: (state, action) => {
            state.data = action.payload,
                state.loading = true
        },
        [userProfile.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
    }
})
export default userProfileSlice.reducer