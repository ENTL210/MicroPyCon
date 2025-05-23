import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deviceArr: [],
    selectedDevice: {}
}

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setDeviceList: (state, action) => {
            state.deviceList = action.payload
        },
        setCurrentDevice: (state, action) => {
            state.selectedDevice = action.payload
        }
    }
})

export const {setDeviceList, setCurrentDevice} = deviceSlice.actions

export default deviceSlice.reducer