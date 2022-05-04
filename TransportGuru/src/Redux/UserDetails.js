import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { act } from 'react-test-renderer';
import TrasportApi from '../api/TrasportApi'
export const getUserDetails = createAsyncThunk('user/getUserDetails',
    async (token, getState) => {
        try {
            const response = await TrasportApi.get('/user/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data.data
        } catch (e) {
            console.log()
        }
    });
export const userEmailCheck = createAsyncThunk('user/userEmailCheck',
    async (obj, getState) => {
        try {
            const response = await TrasportApi.get(`/userEmailCheck/${obj.email}`, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            return response.data
        } catch (e) {
            console.log()
        }
    });
export const userMobileNoCheck = createAsyncThunk('user/userMobileNoCheck',
    async (obj, getState) => {
        try {

            const response = await TrasportApi.get(`/userMobileNoCheck/${obj.mobileno}`, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });

            return response.data
        } catch (e) {
            console.log()
        }
    });
export const userEmailVerify = createAsyncThunk('user/userEmailVerify',
    async (obj, getState) => {
        try {
            const response = await TrasportApi.post(`/userEmailVerify`, obj.data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            return response.data
        } catch (e) {
            return getState.rejectWithValue(e.response.data);
        }
    });

export const userMobileNoVerify = createAsyncThunk('user/userMobileNoVerify',
    async (obj, getState) => {
        try {
           
            const response = await TrasportApi.post(`/userMobileNoVerify`, obj.data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            return response.data
        } catch (e) {
            return getState.rejectWithValue(e.response.data);
        }
    });
const UserDetails = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        userData: {},
        emailCheck: {},
        mobileNoCheck: {},
        otpdata: {},
        error: ''
    },
    reducers: {
        setEmailCheck: (state, action) => {
            state.emailCheck = action.payload
        },
        setMobileNoCheck: (state, action) => {
            state.mobileNoCheck = action.payload
        },
        setOtpData: (state, action) => {
            state.otpdata = action.payload
        }
    }, extraReducers: {
        [getUserDetails.fulfilled]: (state, action) => {

            state.userData = action.payload,
                state.loading = false
        },
        [getUserDetails.pending]: (state, action) => {
            state.loading = true
        },
        [getUserDetails.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [userEmailCheck.fulfilled]: (state, action) => {

            state.emailCheck = action.payload,
                state.loading = false
        },
        [userEmailCheck.pending]: (state, action) => {
            state.loading = true
        },
        [userEmailCheck.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [userMobileNoCheck.fulfilled]: (state, action) => {
            state.mobileNoCheck = action.payload,
                state.loading = false
        },
        [userMobileNoCheck.pending]: (state, action) => {
            state.loading = true
        },
        [userMobileNoCheck.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [userEmailVerify.fulfilled]: (state, action) => {
            state.otpdata = action.payload,
                state.loading = false
        },
        [userEmailVerify.pending]: (state, action) => {
            state.loading = true
        },
        [userEmailVerify.rejected]: (state, action) => {
            state.error = action.payload.data;
            state.loading = true
        },
        [userMobileNoVerify.fulfilled]: (state, action) => {
           
            state.otpdata = action.payload,
                state.loading = false
        },
        [userMobileNoVerify.pending]: (state, action) => {
            state.loading = true
        },
        [userMobileNoVerify.rejected]: (state, action) => {
            state.error = action.payload.data;
            state.loading = true
        },


    }
});
export const { setEmailCheck, setMobileNoCheck, setOtpData } = UserDetails.actions
export default UserDetails.reducer;