const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')
const fs = require('fs')

//--- Import System Variable here
var env=require('./Setting.js')


// WindowsCreator
//--- Window create function
console.log(env.TemplateDir)

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 960,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
			contextIsolation:true
        },
    })
    win.webContents.openDevTools()

    win.loadFile(env.TemplateDir + 'index.html')	

// FileSystem	
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

    
	
//--- Main function
//--- FileSystem 
	const files = fs.readdirSync('./');
    ipcMain.handle('fs-main', () => files)
	win.loadFile(env.TemplateDir + 'index.html')
}


app.whenReady().then(() => {
    createWindow()
	// Prevent from multiple windows create
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})
// Release all resources of the app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
