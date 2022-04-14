import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import TrasportApi from '../../api/TrasportApi';

export const addTransport = createAsyncThunk(
    'transport/addTransport',
    async (obj, getState) => {
        try {
            const data = {
                capicity: obj.capicity,
                Truckdate: obj.Truckdate,
                routeId: obj.routeId,
                truckId: obj.truckId,
                driverId: obj.driverId,
                truckPrice: obj.truckPrice
            }
            console.log("data", obj)
            const response = await TrasportApi.post('/transport/create', data, {
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
export const updateTransport = createAsyncThunk(
    'transport/updateTransport',
    async (obj, getState) => {
        try {
            const data = {
                capicity: obj.capicity,
                Truckdate: obj.Truckdate,
                routeId: obj.routeId,
                truckId: obj.truckId,
                driverId: obj.driverId,
                truckPrice: obj.truckPrice
            }
            console.log(obj)
            const response = await TrasportApi.patch(`/transport/update/${obj.id}`, data, {
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
export const getTransportList = createAsyncThunk('transport/getTransportList',
    async (token, getState) => {
        try {
            const response = await TrasportApi.get('/transport', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data.data
        } catch (e) {
            return getState.rejectWithValue(e.response.data);
        }
    });
export const deleteTransport = createAsyncThunk(
    'transport/deleteTransport',
    async (obj, getState) => {
        try {

            const response = await TrasportApi.delete(`/transport/delete/${obj.id}`, {
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
export const transportSlice = createSlice({
    name: 'transport',
    initialState: {
        loading: false,
        error: '',
        data: {},
        transportList: []
    },
    reducers: {
        setTransportData: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: {
        [addTransport.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [addTransport.pending]: (state, action) => {
            state.loading = true
        },
        [addTransport.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [updateTransport.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [updateTransport.pending]: (state, action) => {
            state.loading = true
        },
        [updateTransport.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [deleteTransport.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [deleteTransport.pending]: (state, action) => {
            state.loading = true
        },
        [deleteTransport.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [getTransportList.fulfilled]: (state, action) => {
            state.transportList = action.payload,
                state.loading = false
        },
        [getTransportList.pending]: (state, action) => {
            state.loading = true
        },
        [getTransportList.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },

    }
})
export const { setTransportData } = transportSlice.actions;
export default transportSlice.reducer