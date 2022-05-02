import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import TrasportApi from '../api/TrasportApi'
export const getBadgeMessage = createAsyncThunk('badge/getBadgeMessage',
    async (obj, getState) => {
        try {
            const data = {
                convessationId: obj.convessationId,
            }
            const response = await TrasportApi.post('/messageBadge', data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            return response.data.data.length

        } catch (e) {
            console.log(e)
        }
    });
    export const ClearBadgeMessage = createAsyncThunk('badge/ClearBadgeMessage',
    async (obj, getState) => {
        try {
            const data = {
                convessationId: obj.convessationId,
            }
            const response = await TrasportApi.post('/clearMessageBadge', data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            return response.data.data.length

        } catch (e) {
            console.log(e)
        }
    });
const badgeSlice = createSlice({
    name: "badge",
    initialState: {
        loading: false,
        messageBadge: 0,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [getBadgeMessage.fulfilled]: (state, action) => {
            state.messageBadge = action.payload
            state.loading = false
        },
        // [getBadgeMessage.pending]: (state, action) => {

        //     state.loading = true
        // },
        [getBadgeMessage.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = true
        },
        [ClearBadgeMessage.fulfilled]: (state, action) => {
            state.messageBadge = action.payload
            state.loading = false
        },
        // [ClearBadgeMessage.pending]: (state, action) => {

        //     state.loading = true
        // },
        [ClearBadgeMessage.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = true
        }
    }
})
export default badgeSlice.reducer;
