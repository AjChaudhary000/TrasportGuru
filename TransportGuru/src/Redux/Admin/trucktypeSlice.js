import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../../api/TrasportApi'
export const getTruckType = createAsyncThunk('truck/getUserDetails',
    async (token, getState) => {
        try {
            const response = await TrasportApi.get('/trucktype', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data.data;
        } catch (e) {
             console.log(e)
        }
    });
const truckTypeSlice = createSlice({
    name: 'truck',
    initialState: {
        loading: false,
        truckData: [],
        error: ''
    },
    reducers: {

    }, extraReducers: {
        [getTruckType.fulfilled]: (state, action) => {
           
            state.truckData = action.payload,
                state.loading = false
        },
        [getTruckType.pending]: (state, action) => {
            state.loading = true
        },
        [getTruckType.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        }
    }
});
export default truckTypeSlice.reducer;