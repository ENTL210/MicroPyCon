import { configureStore } from "@reduxjs/toolkit";
import { deviceSlice } from "../state/slicers/deviceSlice.js"
import { popupSlice } from "./slicers/popupSlice.js";
import { directorySlice } from "./slicers/directorySlice.js";
import { consoleSlice } from "./slicers/consoleSlice.js";


const store = configureStore({
    reducer: {
        directories: directorySlice.reducer,
        device: deviceSlice.reducer,
        popup: popupSlice.reducer,
        console: consoleSlice.reducer
    },

    devTools: true
})

export default store; 