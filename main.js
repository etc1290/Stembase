const { app, BrowserWindow, ipcMain, nativeTheme, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

//--- Import System Variable here
var env=require('./Setting.js')


// WindowsCreator
//--- Window create function
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
	//Main: Show filenames
    
    ipcMain.handle('fs-main',	(event,v) => {
		console.log(v)
		if(typeof v == 'undefined'){
			console.log(env.StartDir)
			return fs.readdirSync(env.StartDir)
		}else if(fs.lstatSync(v).isDirectory()){
			console.log('ssdsd')
			console.log(fs.readdirSync(v))
			return fs.readdirSync(v)
		}else{
			console.log('this is a file')
			return fs.readdirSync('./')
		}
		
	})
	//Side: File type checker
	ipcMain.handle('fs-type', (event,v) =>{
		console.log(fs.lstatSync(v).isDirectory())
	})
	//Side: File browser
	ipcMain.handle('fs-getDir', () => {
		
		const fsobject =dialog.showOpenDialogSync(win, {
			properties: ['openDirectory']
		})
		return fsobject

})
	
// DarkMode
	// Main: toggle
	ipcMain.handle('dm-main',	() =>{
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
