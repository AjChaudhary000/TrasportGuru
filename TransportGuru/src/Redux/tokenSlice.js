
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getJWTToken, saveJWTToken, removeJWTToken, getTheme } from './helper';
export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        loading: false,
        error: '',
        token: null,
        theme: false,
        internet: false,
    },
    reducers: {
        logoutToken: (state, action) => {

            state.token = null;
        },
        getToken: (state, action) => {
            state.token = action.payload
        },
        getThemeMode: (state, action) => {
            state.theme = action.payload
        },
        getNetwork: (state, action) => {
            state.internet = action.payload
        }

    },
    extraReducers: {
    }
});
export const { logoutToken, getToken, getThemeMode, getNetwork } = tokenSlice.actions;
export default tokenSlice.reducer;