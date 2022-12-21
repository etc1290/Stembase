const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    win.webContents.openDevTools()
    const files = fs.readdirSync('./');
    ipcMain.handle('main', () => files)
    win.loadFile('index.html')
}


app.whenReady().then(() => {
    createWindow()
})
