const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

// Import System Variable here
var env=require('./Setting.js')


// WindowsCreator
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 960,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    win.webContents.openDevTools()
    win.loadFile(env.TemplateDir + 'index.html')	

// FileSystem	
    const files = fs.readdirSync('./');
    ipcMain.handle('fs-main', () => files)

}


app.whenReady().then(() => {
    createWindow()
})
