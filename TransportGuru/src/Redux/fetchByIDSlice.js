import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../api/TrasportApi'
export const transportListById = createAsyncThunk('fetchByID/transportListById',
    async (obj, getState) => {
        try {


            const response = await TrasportApi.get(`/transportById/${obj.id}`, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });

            return response.data.data
        } catch (e) {
            console.log()
        }
    });
export const trackingDetailsById = createAsyncThunk('fetchByID/trackingDetailsById',
    async (obj, getState) => {
        try {

            console.log(obj)
            const response = await TrasportApi.get(`/tracking/${obj.id}`, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
           
            return response.data.data
        } catch (e) {
            console.log()
        }
    });
const fetchByIDSlice = createSlice({
    name: 'fetchByID',
    initialState: {
        loading: false,
        transportList: [],
        trackingDetails: [],
        error: ''
    },
    reducers: {

    }, extraReducers: {
        [transportListById.fulfilled]: (state, action) => {

            state.transportList = action.payload,
                state.loading = false
        },
        [transportListById.pending]: (state, action) => {
            state.loading = true
        },
        [transportListById.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [trackingDetailsById.fulfilled]: (state, action) => {

            state.trackingDetails = action.payload,
                state.loading = false
        },
        [trackingDetailsById.pending]: (state, action) => {
            state.loading = true
        },
        [trackingDetailsById.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        }
    }
});
export default fetchByIDSlice.reducer;