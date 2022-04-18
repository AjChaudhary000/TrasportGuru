import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../api/TrasportApi'
export const tracking = createAsyncThunk('tracking/tracking',
    async (obj, getState) => {
        try {
            const response = await TrasportApi.post(`/tracking`, obj.data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            
            return response.data
        } catch (e) {
            console.log()
        }
    });
export const getTracking = createAsyncThunk('tracking/tracking',
    async (token, getState) => {
        try {
           
            const response = await TrasportApi.get(`/tracking`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
          
            return response.data.data
        } catch (e) {
            console.log(e)
        }
    });
const trackingSlice = createSlice({
    name: 'tracking',
    initialState: {
        loading: false,
        trackingdata: [],
        error: ''
    },
    reducers: {
        setTrackingData: (state, action) => {
            state.trackingdata = action.payload
        }
    }, extraReducers: {
        [tracking.fulfilled]: (state, action) => {
            state.trackingdata = action.payload,
                state.loading = false
        },
        [tracking.pending]: (state, action) => {
            state.loading = true
        },
        [tracking.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [getTracking.fulfilled]: (state, action) => {
            state.trackingdata = action.payload,
                state.loading = false
        },
        [getTracking.pending]: (state, action) => {
            state.loading = true
        },
        [getTracking.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        }
    }
});
export const { setTrackingData } = trackingSlice.actions
export default trackingSlice.reducer;