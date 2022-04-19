import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrasportApi from '../api/TrasportApi'
export const getRoom = createAsyncThunk('chat/getRoom',
    async (obj, getState) => {

        try {
            const response = await TrasportApi.post(`/roomData`, obj.data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });

            return response.data
        } catch (e) {
            console.log(e)
        }
    });
export const sendMessage = createAsyncThunk('chat/sendMessage',
    async (obj, getState) => {
        try {
            const response = await TrasportApi.post(`/chat`, obj.data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            return response.data
        } catch (e) {
            console.log(e)
        }
    });
export const getmessage = createAsyncThunk('chat/getmessage',
    async (obj, getState) => {
        try {
            console.log(obj)
            const response = await TrasportApi.post(`/chatroom`, obj.data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            return response.data
        } catch (e) {
            console.log(e)
        }
    });
const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        loading: false,
        chatList: {},
        chat: {},
        roomdata: { data: [] },
        error: ''
    },
    reducers: {
        setRoomData: (state, action) => {
            state.roomdata = action.payload
        },
        setChatList: (state, action) => {
            state.chatList = action.payload,
                state.chat = action.payload
        },
    }, extraReducers: {
        [getRoom.fulfilled]: (state, action) => {
            state.roomdata = action.payload,
                state.loading = false
        },
        [getRoom.pending]: (state, action) => {
            state.loading = false
        },
        [getRoom.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = false
        },
        [sendMessage.fulfilled]: (state, action) => {
            state.chat = action.payload,
                state.loading = false
        },
        [sendMessage.pending]: (state, action) => {
            state.loading = false
        },
        [sendMessage.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = false
        },
        [getmessage.fulfilled]: (state, action) => {
            state.chatList = action.payload,
                state.loading = false
        },
        [getmessage.pending]: (state, action) => {
            state.loading = true
        },
        [getmessage.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        }
    }
});
export const { setChatList, setRoomData } = chatSlice.actions
export default chatSlice.reducer;