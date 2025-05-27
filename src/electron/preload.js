const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    // listen for the selected directory... (retrieving a filepath)
    onFetchSelectedDirectory: (callback) => ipcRenderer.on('fetch-selected-directory', callback),
    onFetchSelectedFile: (callback) => ipcRenderer.on('fetch-selected-file', callback),
    openDirectoryDialog: (callback) => ipcRenderer.invoke('dialog:openDirectoryDialog'),
    openFileDialog: (callback) => ipcRenderer.invoke('dialog:openFileDialog'),
    getDirectoryContents: (path) => ipcRenderer.invoke('get-directory-contents', path),
    readCurrentFile: (path) => ipcRenderer.invoke('read-current-file', path),
    getSerialPort: () => ipcRenderer.invoke('get-serial-port'),
    triggerFlash: (serialPort, flashFirmwarePath) => ipcRenderer.send('trigger-flash', serialPort, flashFirmwarePath),
    clearConsoleOutput: (callback) => ipcRenderer.on('clear-console', callback),
    getConsoleOutput: (callback) => ipcRenderer.on('console-output', callback),
    getFlashingStatus: (callback) => ipcRenderer.on('flash-complete', callback),
    uploadCode: (serialPort, codePath) => ipcRenderer.send('upload-code', serialPort, codePath)
})