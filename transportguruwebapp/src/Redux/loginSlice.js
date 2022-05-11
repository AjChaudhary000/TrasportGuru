import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TransportGuruApi from '../Api/TransportGuruApi';
export const sendemail = createAsyncThunk('login/sendemail',
    async (email, getState) => {
        try {
            const response = await TransportGuruApi.post('/sendemail', { email: email });
            console.log(response.data);
            return response.data;
        } catch (e) {
            return getState.rejectWithValue(e.response.data);
        }
    }
);

export const LoginSlice = createSlice({
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
        [sendemail.fulfilled]: (state, action) => {
            state.otpdata = action.payload;
            state.loading = false;
        },
        [sendemail.pending]: (state, action) => {
            state.loading = true;
            state.error = action.payload;
        },
        [sendemail.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.data;
        }

    }
});
export const { setotpData } = LoginSlice.actions;
export default LoginSlice.reducer;