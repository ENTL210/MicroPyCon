const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    // listen for the selected directory... (retrieving a filepath)
    onFetchSelectedDirectory: (callback) => ipcRenderer.on('fetch-selected-directory', callback),
    onFetchSelectedFile: (callback) => ipcRenderer.on('fetch-selected-file', callback),
    openDirectoryDialog: (callback) => ipcRenderer.invoke('dialog:openDirectoryDialog'),
    openFileDialog: (callback) => ipcRenderer.invoke('dialog:openFileDialog'),
    getDirectoryContents: (path) => ipcRenderer.invoke('get-directory-contents', path),
})