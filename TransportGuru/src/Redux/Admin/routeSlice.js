import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import TrasportApi from '../../api/TrasportApi';

export const addRoute = createAsyncThunk(
    'route/addRoute',
    async (obj, getState) => {
        try {
            const data = {
                from: obj.from,
                destination: obj.destination,
                routeStop: obj.routeStop,
            }
            console.log("data", data)
            const response = await TrasportApi.post('/route/create', data, {
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
export const updateRoute = createAsyncThunk(
    'route/updateRoute',
    async (obj, getState) => {
        try {
            const data = {
                from: obj.from,
                destination: obj.destination,
                routeStop: obj.routeStop,
            }
            console.log(obj)
            const response = await TrasportApi.patch(`/route/update/${obj.id}`, data, {
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
export const getRouteList = createAsyncThunk('route/getRouteList',
    async (token, getState) => {
        try {
            const response = await TrasportApi.get('/route', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data.data
        } catch (e) {
            return getState.rejectWithValue(e.response.data);
        }
    });
export const deleteRoute = createAsyncThunk(
    'route/deleteRoute',
    async (obj, getState) => {
        try {

            const response = await TrasportApi.delete(`/route/delete/${obj.id}`, {
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
export const routeSlice = createSlice({
    name: 'route',
    initialState: {
        loading: false,
        error: '',
        data: {},
        routeList: []
    },
    reducers: {
        setRouteData: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: {
        [addRoute.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [addRoute.pending]: (state, action) => {
            state.loading = true
        },
        [addRoute.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [updateRoute.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [updateRoute.pending]: (state, action) => {
            state.loading = true
        },
        [updateRoute.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [deleteRoute.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.loading = false
        },
        [deleteRoute.pending]: (state, action) => {
            state.loading = true
        },
        [deleteRoute.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },
        [getRouteList.fulfilled]: (state, action) => {
            state.routeList = action.payload,
                state.loading = false
        },
        [getRouteList.pending]: (state, action) => {
            state.loading = true
        },
        [getRouteList.rejected]: (state, action) => {
            state.error = action.payload,
                state.loading = true
        },

    }
})
export const { setRouteData } = routeSlice.actions;
export default routeSlice.reducer