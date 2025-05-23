import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deviceArr: []
}

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setDeviceList: (state, action) => {
            state.deviceList = action.payload
        }
    }
})

export const {setDeviceList} = deviceSlice.actions

export default deviceSlice.reducer