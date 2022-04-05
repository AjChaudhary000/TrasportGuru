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
export const addDriverSlice = createSlice({
    name: 'addDriver',
    initialState: {
        loading: false,
        error: '',
        data: {}
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
        [addDriver.payload]: (state, action) => {
            state.data = action.payload,
                state.loading = true
        },
        [addDriver.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
    }
})
export const { setDriverData } = addDriverSlice.actions;
export default addDriverSlice.reducer