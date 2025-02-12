import {app, BrowserWindow} from 'electron';
import path from "path";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        // remove the default titlebar
        titleBarStyle: 'hidden',
        trafficLightPosition: {x:12.5, y:15},
        transparent: true,
        width: 975,
        height: 650,
    });
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));
})