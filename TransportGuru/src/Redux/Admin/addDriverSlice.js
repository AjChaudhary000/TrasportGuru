import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import TrasportApi from '../../api/TrasportApi';

export const addDriver = createAsyncThunk(
    'addDriver/addDriver',
    async (obj, getState) => {
        try {
            const data = {
                driverName: obj.driverName,
                driverEmail: obj.driverEmail,
                driverMobileNo: obj.driverMobileNo,
                driverOtp: obj.driverOtp,
            }
            console.log(data)
            const response = await TrasportApi.post('/verifyDriver', data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            console.log("res ", response.data)
            return response.data
        }
        catch (e) {
            return getState.rejectWithValue(e.response.data);
        }
    })
export const updateDriver = createAsyncThunk(
    'addDriver/editDriver',
    async (obj, getState) => {
        try {
            const data = {
                driverName: obj.driverName,
                driverEmail: obj.driverEmail,
                driverMobileNo: obj.driverMobileNo,
                driverOtp: obj.driverOtp,
            }
            console.log(obj)
            const response = await TrasportApi.patch(`/updateDriver/${obj.id}`, data, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            console.log("res ", response.data)
            return response.data
        }
        catch (e) {
            return getState.rejectWithValue(e.response.data);
        }
    })
export const deleteDriver = createAsyncThunk(
    'addDriver/deleteDriver',
    async (obj, getState) => {
        try {

            const response = await TrasportApi.delete(`/driver/delete/${obj.id}`, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                }
            });
            return response.data
        }
        catch (e) {
            return getState.rejectWithValue(e.response.data);
        }
    })
export const addDriverSlice = createSlice({
    name: 'addDriver',
    initialState: {
        loading: false,
        error: '',
        data: {},
        deletedata: {}
    },
    reducers: {
        setDriverData: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: {
        [addDriver.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [addDriver.pending]: (state, action) => {

            state.loading = true
        },
        [addDriver.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [updateDriver.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [updateDriver.pending]: (state, action) => {

            state.loading = true
        },
        [updateDriver.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [deleteDriver.fulfilled]: (state, action) => {
            state.deletedata = action.payload,
                state.loading = false
        },
        [deleteDriver.pending]: (state, action) => {

            state.loading = true
        },
        [deleteDriver.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        }
    }
})
export const { setDriverData } = addDriverSlice.actions;
export default addDriverSlice.reducer