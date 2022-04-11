
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getJWTToken, saveJWTToken, removeJWTToken ,getTheme} from './helper';
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
        token: null,
        theme :false

    },
    reducers: {
        logoutToken: (state, action) => {
        
            state.token = null;
        },
        getToken: (state, action) => {
            setTimeout(async () => {
                state.token = await getJWTToken();
            }, 1000)
        },
        getThemeMode: (state, action) => {
                
                state.theme = action.payload
             }
           
       
    },
    extraReducers: {
        [setToken.fulfilled]: (state, action) => {

            //console.log("my action ", action)
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
export const { logoutToken, getToken,getThemeMode } = tokenSlice.actions;
export default tokenSlice.reducer;