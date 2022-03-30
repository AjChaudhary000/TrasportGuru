import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import TrasportApi from '../api/TrasportApi';
import { setToken } from './tokenSlice';
export const verifyOtp = createAsyncThunk('otp/verifyOtp',
    async (obj, getState) => {
        try {
            const response = await TrasportApi.post('/verifyuser', obj);

            await getState.dispatch(setToken(response.data.token))
            // console.log("Response token", responseToken);

            return response.data;
        } catch (e) {
            return getState.rejectWithValue(e.response.data);

        }
    }
);
export const verifyOtpSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        error: '',
        otpdata: {}
    },
    reducers: {},
    extraReducers: {
        [verifyOtp.fulfilled]: (state, action) => {
            state.otpdata = action.payload;
            state.loading = false;
        },
        [verifyOtp.pending]: (state, action) => {
            state.loading = true;
            state.error = action.payload;
        },
        [verifyOtp.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.payload.data;
        }
    }
});
export default verifyOtpSlice.reducer;