import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import TrasportApi from '../api/TrasportApi';

export const transportAccount = createAsyncThunk(
    'admin/transportAccount',
    async (obj, getState) => {
        try {
            const data = {
                trasportName: obj.trasportName,
                trasportAddress: obj.trasportAddress,
                trasportImage: obj.trasportImage,
                trasportmobile: obj.trasportmobile
            }
            const response = await TrasportApi.post('/user/trasportaccount', data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            return response.data
        }
        catch (e) {
            console.log(e)
        }
    })
export const transportAccountSlice = createSlice({
    name: 'admin',
    initialState: {
        loading: false,
        error: '',
        data: {}
    },
    reducers: {

    },
    extraReducers: {
        [transportAccount.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [transportAccount.payload]: (state, action) => {
            state.data = action.payload,
                state.loading = true
        },
        [transportAccount.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
    }
})
export default transportAccountSlice.reducer