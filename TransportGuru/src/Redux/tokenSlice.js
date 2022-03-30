import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getJWTToken, saveJWTToken } from './helper';
export const setToken = createAsyncThunk(
    'token/setToken', async (tokenData, getState) => {

        await saveJWTToken(tokenData);
        const token = await getJWTToken().then((res) => res);
        console.log("tokan slice", token);

        return token
    }
);
export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        loading: false,
        error: '',
        token: ''
    },
    reducers: {
        logoutToken: async (state, action) => {
            state.token = await AsyncStorage.removeItem('@usertoken');
        }
    },
    extraReducers: {
        [setToken.fulfilled]: (state, action) => {

            console.log("my action ", action)
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