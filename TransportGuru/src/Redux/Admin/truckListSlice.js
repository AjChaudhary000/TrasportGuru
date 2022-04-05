import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../../api/TrasportApi'
export const getTruckList = createAsyncThunk('truckList/getTruckList',
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

const truckListSlice = createSlice({
    name: 'truckList',
    initialState: {
        loading: false,
        truckList: [],
        error: ''
    },
    reducers: {

    }, extraReducers: {
        [getTruckList.fulfilled]: (state, action) => {

            state.truckList = action.payload,
                state.loading = false
        },
        [getTruckList.pending]: (state, action) => {
            state.loading = true
        },
        [getTruckList.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        }

    }
});
export default truckListSlice.reducer;