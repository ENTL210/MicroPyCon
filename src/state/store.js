import { configureStore } from "@reduxjs/toolkit";
import { deviceSlice } from "../state/slicers/deviceSlice.js"
import { popupSlice } from "./slicers/popupSlice.js";
import { directorySlice } from "./slicers/directorySlice.js";


const store = configureStore({
    reducer: {
        directories: directorySlice.reducer,
        device: deviceSlice.reducer,
        popup: popupSlice.reducer,
    },

    devTools: true
})

export default store; 