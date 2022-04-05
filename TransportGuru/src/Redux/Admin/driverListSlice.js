import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../../api/TrasportApi'
export const getDriverList = createAsyncThunk('driverList/getDriverList',
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

const driverListSlice = createSlice({
    name: 'driverList',
    initialState: {
        loading: false,
        driverList: [],
        error: ''
    },
    reducers: {

    }, extraReducers: {
        [getDriverList.fulfilled]: (state, action) => {

            state.driverList = action.payload,
                state.loading = false
        },
        [getDriverList.pending]: (state, action) => {
            state.loading = true
        },
        [getDriverList.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        }

    }
});
export default driverListSlice.reducer;