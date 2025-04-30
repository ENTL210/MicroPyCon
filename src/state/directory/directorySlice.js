import { createSlice } from "@reduxjs/toolkit";

export const directorySlice = createSlice({
    name: 'directory',
    initialState: {
        directoryPath: "",
        directoriesArr: [],
        activedFilesArr: []
    },
    reducers: {
        updateDirectoryPath: (state, action) => {
            state.directoryPath = action.payload
        },
        updateDirectoriesArr: (state, action) => {
            state.directoriesArr = action.payload
        },
        addActivedFilesArr: (state, action) => {
            const isAlreadyExist = state.activedFilesArr.some((items) => {
                JSON.stringify(items) === JSON.stringify(action.payload)
            })

            if (!isAlreadyExist) {
                state.activedFilesArr = [...state.activedFilesArr, action.payload]
            }
        }
    }
})

export const {updateDirectoryPath, updateDirectoriesArr, addActivedFilesArr} = directorySlice.actions

export default directorySlice.reducer