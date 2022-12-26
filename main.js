const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

// Import System Variable here
var env=require('./Setting.js')

console.log(env.TemplateDir)
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
    win.loadFile(env.TemplateDir + 'index.html')
}


app.whenReady().then(() => {
    createWindow()
})
