import { configureStore } from '@reduxjs/toolkit';
import sendEmailSlice from './sendEmailSlice';
import { combineReducers } from 'redux';
import verifyOtpSlice from './verifyOtpSlice';
import tokenSlice from './tokenSlice';
import userProfileSlice from './userProfileSlice';
const store = configureStore({
    reducer: combineReducers({
        login: sendEmailSlice,
        otp: verifyOtpSlice,
        token: tokenSlice,
        userProfile: userProfileSlice,
    }),
})
export default store;