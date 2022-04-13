import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import TrasportApi from '../api/TrasportApi';

export const userProfile = createAsyncThunk(
    'user/userProfile',
    async (obj, getState) => {
        try {
            const data = {
                username: obj.username,
                image: obj.image || ''

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
export const usereditAccount = createAsyncThunk(
    'user/usereditAccount',
    async (obj, getState) => {
        try {

            console.log(obj.data)
            const response = await TrasportApi.patch(`/updateUser/${obj.id}`, obj.data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            console.log("swfhebnw8fhb8e7w", response.data)
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
        setUserData: (state, action) => {
            state.data = action.payload
        }
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
        [usereditAccount.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [usereditAccount.payload]: (state, action) => {
            state.data = action.payload,
                state.loading = true
        },
        [usereditAccount.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
    }
})
export const { setUserData } = userProfileSlice.actions
export default userProfileSlice.reducer