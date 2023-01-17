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
	// Communication Test
	ipcMain.handle('tele-test',(event,v) =>{
//		console.log('child' + v)
		win.webContents.send('tele-test552',v)
	})
	ipcMain.handle('tele-test2',(event,v) =>{
		console.log('father' + v)
		})
	}

//--- Test	
	

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