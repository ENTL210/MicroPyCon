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

            const payload = {...action.payload, active: false}

            const isAlreadyExist = state.activedFilesArr.some((items) => {
                const existingFiles = {...items, active: false}
                return JSON.stringify(existingFiles) === JSON.stringify(payload)
            })

            if (!isAlreadyExist) {
                state.activedFilesArr = [...state.activedFilesArr, payload]
            }
        },
        resetActivedFilesArr: (state) => {
            state.activedFilesArr = []
        },
        updateActiveStatusOfActivedFiles: (state, action) => {
            const selectedItem = action.payload
            state.activedFilesArr = state.activedFilesArr.map((item) => 
                item.path === selectedItem.path ? {...item, active: true} : {...item, active: false} 
            )
        }
    }
})

export const {updateDirectoryPath, updateDirectoriesArr, addActivedFilesArr, resetActivedFilesArr, updateActiveStatusOfActivedFiles} = directorySlice.actions

export default directorySlice.reducer