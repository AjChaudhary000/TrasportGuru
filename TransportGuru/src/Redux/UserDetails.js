import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../api/TrasportApi'
export const getUserDetails = createAsyncThunk('user/getUserDetails',
    async (token, getState) => {
        try {
            const response = await TrasportApi.get('/user/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data.data
        } catch (e) {
            console.log()
        }
    });
const UserDetails = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        userData: {},
        error: ''
    },
    reducers: {

    }, extraReducers: {
        [getUserDetails.fulfilled]: (state, action) => {
            
            state.userData = action.payload,
                state.loading = false
        },
        [getUserDetails.pending]: (state, action) => {
            state.loading = true
        },
        [getUserDetails.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        }
    }
});
export default UserDetails.reducer;