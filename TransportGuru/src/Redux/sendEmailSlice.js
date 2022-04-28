import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../api/TrasportApi';
export const sendemail = createAsyncThunk('login/sendemail',
    async (email, { getState }) => {
        try {

            const response = await TrasportApi.post('/sendemail', { email: email });
            console.log("Response data of send email", response.data)

            return response.data;
        } catch (e) {
            console.log("message ", e)
        }
    }
);
export const sendSms = createAsyncThunk('login/sendSms',
    async (mobileno, { getState }) => {
        console.log(mobileno)
        try {

            const response = await TrasportApi.post('/sendsms', { mobileno });
            console.log("Response data of send sms", response.data)
            return response.data;
        } catch (e) {
            console.log("message ", e.toString())
        }
    }
);
export const sendEmailSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        error: '',
        userdata: {}
    },
    reducers: {
        setUserData: (state, action) => {
            state.userdata = action.payload
        }
    },
    extraReducers: {
        [sendemail.fulfilled]: (state, action) => {

            state.userdata = action.payload;
            state.loading = false;
        },
        [sendemail.pending]: (state, action) => {

            state.loading = true;
            state.error = action.payload;
        },
        [sendemail.rejected]: (state, action) => {
            state.loading = true;
        },
        [sendSms.fulfilled]: (state, action) => {

            state.userdata = action.payload;
            state.loading = false;
        },
        [sendSms.pending]: (state, action) => {

            state.loading = true;
            state.error = action.payload;
        },
        [sendSms.rejected]: (state, action) => {
            state.loading = true;
        }
    }
});
export const { setUserData } = sendEmailSlice.actions;
export default sendEmailSlice.reducer;