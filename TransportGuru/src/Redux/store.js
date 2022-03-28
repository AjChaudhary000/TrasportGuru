import { configureStore } from '@reduxjs/toolkit';
import sendEmailSlice from './sendEmailSlice';
import { combineReducers } from 'redux';
const store = configureStore({
    reducer: combineReducers({
        login: sendEmailSlice
    }),
})
export default store;