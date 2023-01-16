const { app, BrowserWindow, ipcMain, nativeTheme, dialog } = require('electron')
const path = require('path')
const fs = require('fs')
const {JsonDB,Config} = require('node-json-db')
const glob = require('glob')
const env = require('./static/js/env.js')
	// General Declaration
const FileTree = require(env('StaticDir') + 'js/FileTree.js')
var fileTree = new FileTree(__dirname)
console.log(fileTree)

// WindowsCreator
	// Child Window: Setting
const WindowSetting = async () =>{
	
	const wins = new BrowserWindow ({
		width: env('Width'),
		height: env('Height'),
		
		webPreference:{
			preload: path.join(__dirname, 'stpreload4.js'),
			contextisolation: true
		},
	}) 
	if (env('Debugmode')){
		wins.webContents.openDevTools()
	}
	wins.loadFile(env('TemplateDir') + 'setting.html')
	ipcMain.handle('st-test',	(event,v) => {
		console.log(v)
	})
	return wins
}
	// Main Window
const WindowMain = async () => {
    const win = new BrowserWindow({
        width: env('Width'),
        height: env('Height'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
			contextIsolation:true
        },
    })
	if (env('Debugmode')){
		win.webContents.openDevTools()
	}
    win.loadFile(env('TemplateDir') + 'index.html')	
	

//--- Setting
	// Main: create child window
	ipcMain.handle('st-main', () =>{
		WindowSetting()
/*		const WindowSetting = new BrowserWindow()
		WindowSetting.webContents.setWindowOpenHandler(({url}) => {
			if(url === 'about:blank'){
				return {
					action:'allow',
					overrideBrowserOptions:{
						frame: false,
						fullscreenable: true,
						webPreferences:{
							preload:'stpreload.js'
						}
					}
				}
			} 
		return { action:'deny'}
		})*/
	})

//--- Test	
	return win
}
const init = () =>{  
	const Taskmanager = () =>{
		const funcScript = glob.sync(env('StaticDir') + '/js/*.js')
		console.log(funcScript)
		funcScript.forEach((i) =>{require(i)})
	}
	Taskmanager()  
	app.whenReady().then(() => {
		//Test function
		ipcMain.handle('fileTree',async	() =>{
			fileTree.build()
			const data = await fileTree
			console.log(data)
			return JSON.stringify(data)
			
		})

		WindowMain()
		// Prevent from multiple windows create
		app.on('activate', () => {
			if (BrowserWindow.getAllWindows().length === 0) {
				WindowMain()
			}
		})
	})
}
init()
// Release all resources of the app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})