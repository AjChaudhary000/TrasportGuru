import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../api/TrasportApi'
export const getTransportCompanyList = createAsyncThunk('transportComapnyList/getTransportCompanyList',
    async (token, getState) => {
        try {

            const response = await TrasportApi.get('/transportCompanyList', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data.data
        } catch (e) {
            console.log()
        }
    });
const TransportComapnyList = createSlice({
    name: 'transportComapnyList',
    initialState: {
        loading: false,
        data: [],
        error: ''
    },
    reducers: {

    }, extraReducers: {
        [getTransportCompanyList.fulfilled]: (state, action) => {

            state.data = action.payload,
                state.loading = false
        },
        [getTransportCompanyList.pending]: (state, action) => {
            state.loading = true
        },
        [getTransportCompanyList.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        }
    }
});
export default TransportComapnyList.reducer;