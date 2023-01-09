const { app, BrowserWindow, ipcMain, nativeTheme, dialog } = require('electron')
const path = require('path')
const fs = require('fs')
const FileTree = require('./static/js/FileTree.js')
const {JsonDB,Config} = require('node-json-db');

//--- Import System Variable here
	// Stemconfig import

const env = (v) =>{
	const envdata = fs.readFileSync('Stemconfig.json')
	var envarray = JSON.parse(envdata)
	return envarray[v]
}


	// General Declaration
var fileTree = new FileTree(__dirname)
console.log(fileTree)
//test

// WindowsCreator
//--- Window create function
const createWindow = async () => {
    const win = new BrowserWindow({
        width: env('Width'),
        height: env('Height'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
			contextIsolation:true
        },
    })
    win.webContents.openDevTools()
    win.loadFile(env('TemplateDir') + 'index.html')	
	
// FileSystem	
	//Main: Show filenames
	
    ipcMain.handle('fs-main',	(event,v) => {
		console.log(v)
		if(typeof v == 'undefined' || v == 'default'){
			
			return fs.readdirSync(env('StartDir'))
		}else if(fs.lstatSync(v).isDirectory()){
			
			return fs.readdirSync(v)
		}else{
			console.log('this is a file')
			const pathList = v.split('\\').slice(0,-1).join('\\')
			
			return fs.readdirSync(pathList)
		}
		
	})
	//Side: Store file path
	ipcMain.handle('fs-path',	(event,v) =>{
		if(v == 'default'){
			return app.getAppPath()
		}
	})
	//Side: File type checker
	ipcMain.handle('fs-type', (event,v) =>{
		return(fs.lstatSync(v).isDirectory())
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
// Test function 
	// Main: Experimental Exam
	var db = new JsonDB(new Config('Stemconfig',true,true,'/'))
	var ap = await db.getData('/apple')
	console.log(ap)
}
    
app.whenReady().then(() => {
	//Test function
	ipcMain.handle('fileTree',async	() =>{
		fileTree.build()
		const data = await fileTree
		console.log(data)
		return JSON.stringify(data)
		
	})

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
