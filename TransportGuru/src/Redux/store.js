import { configureStore } from '@reduxjs/toolkit';
import sendEmailSlice from './sendEmailSlice';
import { combineReducers } from 'redux';
import verifyOtpSlice from './verifyOtpSlice';
import tokenSlice from './tokenSlice';
import userProfileSlice from './userProfileSlice';
import UserDetails from './UserDetails';
const store = configureStore({
    reducer: combineReducers({
        login: sendEmailSlice,
        otp: verifyOtpSlice,
        token: tokenSlice,
        userProfile: userProfileSlice,
        user: UserDetails
    }),
})
export default store;