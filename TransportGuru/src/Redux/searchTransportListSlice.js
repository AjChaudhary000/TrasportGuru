import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../api/TrasportApi'
export const getSearchTransportList = createAsyncThunk('search/getSearchTransportList',
    async (obj, getState) => {
        try {
            const data = {
                from: obj.from.name,
                destination: obj.destination.name,
                capicity: obj.capicity
            }

            const response = await TrasportApi.post('/searchRoute', data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });

            return response.data
        } catch (e) {
            console.log()
        }
    });
const searchTransportListSlice = createSlice({
    name: 'search',
    initialState: {
        loading: false,
        serachData: [],
        error: ''
    },
    reducers: {

    }, extraReducers: {
        [getSearchTransportList.fulfilled]: (state, action) => {

            state.serachData = action.payload,
                state.loading = false
        },
        [getSearchTransportList.pending]: (state, action) => {
            state.loading = true
        },
        [getSearchTransportList.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        }
    }
});
export default searchTransportListSlice.reducer;