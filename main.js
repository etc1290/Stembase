const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

// Import System Variable here
var env=require('./Setting.js')
console.log(env.TemplateDir)

// WindowsCreator
//--- Window create function

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
    ipcMain.handle('fs-main',	() => files)
	
// DarkMode
	// Main: toggle
	ipcMain.handle('dm-main',	() =>{
		console.log(nativeTheme.shouldUseDarkColors)
		if (nativeTheme.shouldUseDarkColors){
			nativeTheme.themeSource = 'light'
			
		}else{
			nativeTheme.themeSource = 'dark'
			
		}
		return nativeTheme.shouldUseDarkColors
	})
	// Side: Reset to system
	ipcMain.handle('dm-reset',	() =>{
		nativeTheme.themeSource = 'system'
	})
}
    
app.whenReady().then(() => {
    createWindow()
})
