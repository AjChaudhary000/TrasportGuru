import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import sendEmailSlice from './sendEmailSlice';
import { combineReducers } from 'redux';
import verifyOtpSlice from './verifyOtpSlice';
import tokenSlice from './tokenSlice';
import userProfileSlice from './userProfileSlice';
import UserDetails from './UserDetails';
import transportAccountSlice from './transportAccountSlice';
import trucktypeSlice from './Admin/trucktypeSlice';
import addTruckSlice from './Admin/addTruckSlice';
import countAddSlice from './Admin/countAddSlice';
import addDriverSlice from './Admin/addDriverSlice';
import truckListSlice from './Admin/truckListSlice';
import driverListSlice from './Admin/driverListSlice';
const store = configureStore({
    reducer: combineReducers({
        login: sendEmailSlice,
        otp: verifyOtpSlice,
        token: tokenSlice,
        userProfile: userProfileSlice,
        user: UserDetails,
        admin: transportAccountSlice,
        truck: trucktypeSlice,
        addTruck: addTruckSlice,
        count: countAddSlice,
        addDriver: addDriverSlice,
        truckList: truckListSlice,
        driverList: driverListSlice
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { ignoredPaths: ['some.nested.path'] },
        serializableCheck: { ignoredPaths: ['some.nested.path'] },

    })
})
export default store;