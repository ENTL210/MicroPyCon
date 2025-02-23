const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    // listen for the selected directory... (retrieving a filepath)
    onFetchSelectedDirectory: (callback) => ipcRenderer.on('fetch-selected-directory', callback),
    selectedDirectory: (value) => ipcRenderer.send('selectedDirectory', value),
})