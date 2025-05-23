import { configureStore } from "@reduxjs/toolkit";
import directoryReducer from "../state/directory/directorySlice.js"
import deviceReducer from "../state/directory/deviceSlice.js"

const store = configureStore({
    reducer: {
        directories: directoryReducer,
        device: deviceReducer,
        
    },
    devTools: true
})

export default store; 