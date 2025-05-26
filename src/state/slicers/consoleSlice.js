import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    consoleOutput: [],
    isFlashing: false,
    flashError: null,
}

export const consoleSlice = createSlice({
    name: 'console',
    initialState,
    reducers: {
        addConsoleOutput: (state, action) => {
            const isAlreadyExisted = state.consoleOutput.some((lines) => {
                return lines === action.payload
            })

            if (!isAlreadyExisted) {
                state.consoleOutput.push(action.payload)
            }
        },
        clearConsoleOutput: (state) => {
            state.consoleOutput = [];
        },
        setIsFlashing: (state, action) => {
            state.isFlashing = action.payload;
        },
        setFlashError: (state, action) => {
            state.flashError = action.payload;
        },
        startFlashing: (state) => {
            state.isFlashing = true;
            state.flashError = null;
            state.consoleOutput = [];
        },
        flashComplete: (state) => {
            state.isFlashing = false;
        },
    }
})

export const {addConsoleOutput, clearConsoleOutput, setIsFlashing, setFlashError, flashComplete} = consoleSlice.actions