import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getJWTToken, saveJWTToken } from './helper';
export const setToken = createAsyncThunk(
    'token/setToken', async (token, getState) => {
        await saveJWTToken(token);
        return await getJWTToken().then((res) => res);
    }
);
export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        loading: false,
        error: '',
        token: getJWTToken().then((res) => res)
    },
    reducers: {
        logoutToken: async (state, action) => {
            state.token = await AsyncStorage.removeItem('@usertoken');
        }
    },
    extraReducers: {
        [setToken.fulfilled]: (state, action) => {

            state.token = action.payload
            state.loading = false;
        },
        [setToken.pending]: (state, action) => {

            state.error = action.payload
            state.loading = true;
        },
        [setToken.rejected]: (state, action) => {
            state.loading = true;
        }
    }
});
export const { logoutToken } = tokenSlice.actions;
export default tokenSlice.reducer;