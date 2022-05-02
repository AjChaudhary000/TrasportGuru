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
import routeSlice from './Admin/routeSlice';
import transportSlice from './Admin/transportSlice';
import searchTransportListSlice from './searchTransportListSlice';
import transportCompanyListSlice from './transportCompanyListSlice';
import messageListSlice from './messageListSlice';
import fetchByIDSlice from './fetchByIDSlice';
import paymentSlice from './paymentSlice';
import trackingSlice from './trackingSlice';
import chatSlice from './chatSlice';
import badgeSlice from './badgeSlice';
badgeSlice
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
        driverList: driverListSlice,
        route: routeSlice,
        transport: transportSlice,
        search: searchTransportListSlice,
        transportCompanyList: transportCompanyListSlice,
        message: messageListSlice,
        fetchById: fetchByIDSlice,
        payment: paymentSlice,
        tracking: trackingSlice,
        chat: chatSlice,
        badge: badgeSlice
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { ignoredPaths: ['some.nested.path'] },
        serializableCheck: { ignoredPaths: ['some.nested.path'] },

    })
})
export default store;