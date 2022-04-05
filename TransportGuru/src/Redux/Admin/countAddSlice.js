import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../../api/TrasportApi'
export const getCountTruck = createAsyncThunk('count/getCountTruck',
    async (token, getState) => {
        try {
            const response = await TrasportApi.get('/truck', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data.data
        } catch (e) {
            return getState.rejectWithValue(e.response.data);
        }
    });
export const getCountDriver = createAsyncThunk('count/getCountDriver',
    async (token, getState) => {
        try {
            const response = await TrasportApi.get('/driver', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data.data
        } catch (e) {
            return getState.rejectWithValue(e.response.data);
        }
    });
const countAddSlice = createSlice({
    name: 'count',
    initialState: {
        loading: false,
        countTruck: 0,
        countDriver: 0,
        error: ''
    },
    reducers: {

    }, extraReducers: {
        [getCountTruck.fulfilled]: (state, action) => {

            state.countTruck = action.payload?.length,
                state.loading = false
        },
        [getCountTruck.pending]: (state, action) => {
            state.loading = true
        },
        [getCountTruck.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [getCountDriver.fulfilled]: (state, action) => {

            state.countDriver = action.payload?.length,
                state.loading = false
        },
        [getCountDriver.pending]: (state, action) => {
            state.loading = true
        },
        [getCountDriver.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        }
    }
});
export default countAddSlice.reducer;