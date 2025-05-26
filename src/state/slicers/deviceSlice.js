import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deviceArr: [],
    selectedDevice: {},
    selectedFirmware: ""
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
        },
        setSelectedFirmware: (state, action) => {
            state.selectedFirmware = action.payload
        }
        
    }
})

export const {setDeviceList, setCurrentDevice, setSelectedFirmware} = deviceSlice.actions
