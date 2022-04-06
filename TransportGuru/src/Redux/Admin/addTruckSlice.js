import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import TrasportApi from '../../api/TrasportApi';

export const addTruck = createAsyncThunk(
    'addTruck/addTruck',
    async (obj, getState) => {
        try {
            const data = {
                truckName: obj.truckName,
                truckModelName: obj.truckModelName,
                truckRegistartionNo: obj.truckRegistartionNo,
                truckCapicity: obj.truckCapicity,
                truckTypeId: obj.truckTypeId

            }

            const response = await TrasportApi.post('/truck/create', data, {
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
export const updateTruck = createAsyncThunk(
    'addTruck/updateTruck',
    async (obj, getState) => {
        try {
            const data = {
                truckName: obj.truckName,
                truckModelName: obj.truckModelName,
                truckRegistartionNo: obj.truckRegistartionNo,
                truckCapicity: obj.truckCapicity,
                truckTypeId: obj.truckTypeId

            }
            const response = await TrasportApi.patch(`/updatetruck/${obj.id}`, data, {
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
export const deleteTruck = createAsyncThunk(
    'addDriver/deleteTruck',
    async (obj, getState) => {
        try {

            const response = await TrasportApi.delete(`/truck/delete/${obj.id}`, {
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
export const addTruckSlice = createSlice({
    name: 'addTruck',
    initialState: {
        loading: false,
        error: '',
        data: {}
    },
    reducers: {
        setTruckData: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: {
        [addTruck.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [addTruck.pending]: (state, action) => {
            state.loading = true
        },
        [addTruck.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [updateTruck.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [updateTruck.pending]: (state, action) => {
            state.loading = true
        },
        [updateTruck.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [deleteTruck.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [deleteTruck.pending]: (state, action) => {
            state.loading = true
        },
        [deleteTruck.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
    }
})
export const { setTruckData } = addTruckSlice.actions;
export default addTruckSlice.reducer