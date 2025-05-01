import { app, BrowserWindow, Menu, dialog, ipcMain } from 'electron';
import { installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import fs, { lstat, lstatSync, readdir, readdirSync } from 'fs'
import { walkSync } from '@nodesecure/fs-walk';
import path, { sep } from "path";


app.on("ready", async () => {
    try {
        const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]
        for (const extension of extensions) {
            const name = await installExtension(extension)
            console.log(`Added Extension: ${name}`)
        }

    } catch (err) {
        console.log('An error occured while installing extensions', err)
    }

    // Check if this is Mac...
    const isMac = process.platform === 'darwin'
    // Menu's Template
    const menuTemplate = [
        // { role: 'appMenu'}
        ...(isMac
            ? [{
                label: app.name,
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    {
                        label: 'Check for Update',
                        click: () => { console.log("Updates") }
                    },
                    { role: 'services' },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideOthers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            }] : []
        ),
        // { role: 'fileMenu'}
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open...',
                    click: () => {
                        dialog.showOpenDialog(mainWindow, {
                            properties: ['openFile'],
                        }).then(result => {
                            if (!result.canceled) {
                                const filePath = result.filePaths[0];  // Get the selected folder path
                                mainWindow.webContents.send('fetch-selected-file', filePath)

                            } else {
                                console.log('Folder selection was canceled');
                            }
                        }).catch(error => {
                            console.error('Error selecting folder:', err);
                        })
                    }
                },
                {
                    label: 'Open Folder...',
                    click: () => {
                        dialog.showOpenDialog(mainWindow, {
                            properties: ['openDirectory'],
                        }).then(result => {
                            if (!result.canceled) {
                                const folderPath = result.filePaths[0];  // Get the selected folder path
                                mainWindow.webContents.send('fetch-selected-directory', folderPath)

                            } else {
                                console.log('Folder selection was canceled');
                            }
                        }).catch(error => {
                            console.error('Error selecting folder:', err);
                        })
                    }
                },
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Developer Tools',
                    click: () => {
                        mainWindow.webContents.toggleDevTools(); // Toggle DevTools
                    },
                },
                {
                    role: 'reload'
                },
                {
                    role: 'forceReload'
                }
            ]
        }
    ]



    const menu = Menu.buildFromTemplate(menuTemplate);

    const mainWindow = new BrowserWindow({
        // remove the default titlebar
        titleBarStyle: 'hidden',
        trafficLightPosition: { x: 12.5, y: 15 },
        minWidth: 600,
        minHeight: 400,
        width: 1000,
        height: 650,
        frame: false,
        transparent: true,
        webPreferences: {
            preload: path.join(app.getAppPath() + '/src/electron/preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });



    var directory = []

    // Handling directory walks...
    const walkingDirectory = (dir) => {
        const result = [

        ]

        const files = readdirSync(dir)

        files.forEach((fileName) => {
            const filePath = `${dir}${sep}${fileName}`
            if (lstatSync(filePath).isDirectory()) {
                result.push({
                    name: fileName,
                    path: filePath,
                    fileExtension: '',
                    subDirectory: walkingDirectory(filePath),
                })
            } else {
                result.push({
                    name: fileName,
                    path: filePath,
                    fileExtension: path.extname(filePath),
                    subDirectory: [],
                })
            }


        })

        
        result.sort((a,b) => b.subDirectory.length - a.subDirectory.length)
        

        return result
    }


    ipcMain.handle('dialog:openFileDialog', async () => {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openFile'],
        });
        return result.filePaths;  // Return the selected file paths
    });

    ipcMain.handle('dialog:openDirectoryDialog', async () => {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory'],
        });
        return result.filePaths;  // Return the selected file paths
    });

    ipcMain.handle('get-directory-contents', async (event, parentPath) => {
        try {
            const stat = fs.lstatSync(parentPath)
            const result = [
                {
                    name: path.basename(parentPath),
                    path: parentPath,
                    fileExtension: '',
                    subDirectory: stat.isDirectory() ? walkingDirectory(parentPath) : []
                }
            ]
            
            return result


        } catch (err) {
            console.log("Errors trying to fetch directory contents: ", err)
            return [];
        }
    });



    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));
    Menu.setApplicationMenu(menu);
    mainWindow.webContents.on("dom-ready", () => {
        mainWindow.webContents.openDevTools()
    })

})