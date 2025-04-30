import { createSlice } from "@reduxjs/toolkit";

export const directorySlice = createSlice({
    name: 'directory',
    initialState: {
        directoryPath: "",
        directoriesArr: []
    },
    reducers: {
        updateDirectoryPath: (state, action) => {
            state.directoryPath = action.payload
        },
        updateDirectoriesArr: (state, action) => {
            state.directoriesArr = action.payload
        }
    }
})

export const {updateDirectoryPath, updateDirectoriesArr} = directorySlice.actions

export default directorySlice.reducer