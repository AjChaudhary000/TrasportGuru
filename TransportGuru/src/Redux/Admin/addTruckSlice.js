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
            console.log(e)
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
            state.userdata = action.payload
        }
    },
    extraReducers: {
        [addTruck.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [addTruck.payload]: (state, action) => {
            state.data = action.payload,
                state.loading = true
        },
        [addTruck.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
    }
})
export const { setTruckData } = addTruckSlice.actions;
export default addTruckSlice.reducer