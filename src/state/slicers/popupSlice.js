import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
    messeage: "",
    type: "",
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        showPopup: (state, action) => {
            const {messeage, type} = action.payload
            state.messeage = messeage
            state.type = type
            state.isVisible = true 
        },
        hidePopup: (state) => {
            state.messeage = initialState.messeage
            state.type = initialState.type
            state.isVisible = initialState.isVisible
        },
    }
})

export const {showPopup, hidePopup} = popupSlice.actions
