import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    directoryPath: "",
    directoriesArr: [],
    activedFilesArr: [],
    currentFile: {},
}


export const directorySlice = createSlice({
    name: 'directory',
    initialState,
    reducers: {
        updateDirectoryPath: (state, action) => {
            state.directoryPath = action.payload
        },
        updateDirectoriesArr: (state, action) => {
            state.directoriesArr = action.payload
        },
        addActivedFilesArr: (state, action) => {

            const payload = { ...action.payload, active: false }

            const isAlreadyExist = state.activedFilesArr.some((items) => {
                const existingFiles = { ...items, active: false }
                return JSON.stringify(existingFiles) === JSON.stringify(payload)
            })

            if (!isAlreadyExist) {
                state.activedFilesArr = [...state.activedFilesArr, payload]
            }
        },
        resetActivedFilesArr: (state) => {
            state.activedFilesArr = initialState.activedFilesArr;
        },
        updateActiveStatusOfActivedFiles: (state, action) => {
            const selectedItem = action.payload
            state.activedFilesArr = state.activedFilesArr.map((item) =>
                item.path === selectedItem.path ? {...selectedItem, active: true} : {...item, active: false}
            )
            state.currentFile = selectedItem

        },
        deleteActiveFileArr: (state, action) => {
            const onDeleteItem = action.payload
            state.activedFilesArr = state.activedFilesArr.filter((item) => JSON.stringify(item) !== JSON.stringify(onDeleteItem))
        },
        resetCurrentFile: (state) =>  {
            state.currentFile = {}
        }
    }
})

export const { updateDirectoryPath, updateDirectoriesArr, addActivedFilesArr, resetActivedFilesArr, updateActiveStatusOfActivedFiles, deleteActiveFileArr, resetCurrentFile } = directorySlice.actions

export default directorySlice.reducer