import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import TrasportApi from '../api/TrasportApi';

export const userProfile = createAsyncThunk(
    'user/userProfile',
    async (obj, getState) => {
        try {
            const { uri, type, fileName } = obj.imagepath;
            const data = {
                username: obj.username,
                image: fileName || ''
            }
            const response = await TrasportApi.post('/user/me', data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            console.log("swfhebnw8fhb8e7w", response)
            return response.data
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