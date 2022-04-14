import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import TrasportApi from '../api/TrasportApi'
export const getMessageList = createAsyncThunk('message/getMessageList',
    async (obj, getState) => {
        try {
            console.log(obj.token)
            const response = await TrasportApi.get('/adminMessageList', {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            console.log(response.data)
            return response.data.data

        } catch (e) {
            console.log(e)
        }
    });
export const getUserMessageList = createAsyncThunk('message/getUserMessageList',
    async (obj, getState) => {
        try {
            console.log(obj.token)
            const response = await TrasportApi.get('/userMessageList', {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            console.log(response.data)
            return response.data.data

        } catch (e) {
            console.log(e)
        }
    });
const messagelistSlice = createSlice({
    name: "message",
    initialState: {
        loading: false,
        messageList: [],
        usermessageList: [],
        error: ''
    },
    reducers: {},
    extraReducers: {
        [getMessageList.fulfilled]: (state, action) => {
            state.messageList = action.payload
            state.loading = false
        },
        [getMessageList.pending]: (state, action) => {

            state.loading = true
        },
        [getMessageList.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = true
        },
        [getUserMessageList.fulfilled]: (state, action) => {
            state.usermessageList = action.payload
            state.loading = false
        },
        [getUserMessageList.pending]: (state, action) => {

            state.loading = true
        },
        [getUserMessageList.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = true
        }
    }
})
export default messagelistSlice.reducer;
