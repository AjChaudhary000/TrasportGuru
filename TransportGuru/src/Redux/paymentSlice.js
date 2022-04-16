import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../api/TrasportApi'
export const payment = createAsyncThunk('payment/payment',
    async (obj, getState) => {
        try {


            const response = await TrasportApi.post(`/payment`, obj.data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });

            return response.data
        } catch (e) {
            console.log()
        }
    });
const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        loading: false,
        paymentdata: [],
        error: ''
    },
    reducers: {
        setPaymentData: (state, action) => {
            state.paymentdata = action.payload
        }
    }, extraReducers: {
        [payment.fulfilled]: (state, action) => {
            state.paymentdata = action.payload,
                state.loading = false
        },
        [payment.pending]: (state, action) => {
            state.loading = true
        },
        [payment.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        }
    }
});
export const { setPaymentData } = paymentSlice.actions
export default paymentSlice.reducer;