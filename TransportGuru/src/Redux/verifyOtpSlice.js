import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../api/TrasportApi';
import { saveJWTToken } from './helper';
import { getToken } from './tokenSlice';
export const verifyOtp = createAsyncThunk('otp/verifyOtp',
    async (obj, getState) => {
        try {
            const response = await TrasportApi.post('/verifyuser', obj);
            await saveJWTToken(response.data.token);
            await getState.dispatch(getToken(response.data.token))
            // console.log("Response token", responseToken);
            return response.data;
        } catch (e) {
            return getState.rejectWithValue(e.response.data);

        }
    }
);
export const verifySms = createAsyncThunk('otp/verifySms',
    async (obj, getState) => {
        console.log("my obj", obj)
        try {
            const response = await TrasportApi.post('/verifySmsUser', obj);
            await saveJWTToken(response.data.token);
            await getState.dispatch(getToken(response.data.token))
            console.log(response.data)
            return response.data;
        } catch (e) {
            return getState.rejectWithValue(e.response.data);

        }
    }
);
export const verifyGoogle = createAsyncThunk('otp/verifyGoogle',
    async (obj, getState) => {

        try {
            const response = await TrasportApi.post('/googleSignIn', obj);
            await saveJWTToken(response.data.token);
            await getState.dispatch(getToken(response.data.token))

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
    reducers: {
        setotpData: (state, action) => {
            state.otpdata = action.payload
        }
    },
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
            state.loading = false;
            state.error = action.payload.data;
        },
        [verifySms.fulfilled]: (state, action) => {
            state.otpdata = action.payload;
            state.loading = false;
        },
        [verifySms.pending]: (state, action) => {
            state.loading = true;
            state.error = action.payload;
        },
        [verifySms.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.data;
        },
        [verifyGoogle.fulfilled]: (state, action) => {
            state.otpdata = action.payload;
            state.loading = false;
        },
        [verifyGoogle.pending]: (state, action) => {
            state.loading = true;
            state.error = action.payload;
        },
        [verifyGoogle.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.data;
        }
    }
});
export const { setotpData } = verifyOtpSlice.actions;
export default verifyOtpSlice.reducer;