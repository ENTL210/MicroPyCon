import { configureStore } from "@reduxjs/toolkit";
import directoryReducer from "../state/directory/directorySlice.js"

const store = configureStore({
    reducer: {
        directories: directoryReducer
        
    },
    devTools: true
})

export default store; 