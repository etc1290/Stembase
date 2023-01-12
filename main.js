const { app, BrowserWindow, ipcMain, nativeTheme, dialog } = require('electron')
const path = require('path')
const fs = require('fs')
const {JsonDB,Config} = require('node-json-db');

//--- Import System Variable here
	// Stemconfig import
const env = (v) =>{
	const envdata = fs.readFileSync('Stemconfig.json')
	var envarray = JSON.parse(envdata)
	return envarray[v]
}
const staticjs = env('StaticDir') + 'js/'

	// General Declaration
const FileTree = require(staticjs + 'FileTree.js')
var fileTree = new FileTree(__dirname)
console.log(fileTree)
//test

// WindowsCreator
//--- Window create function
	// Setting Child window
const WindowSetting = async () =>{
	const wins = new BrowserWindow ({
		width: env('Width'),
		height: env('Height'),
		webPreference:{
			preload: 'stpreload.js',
			contextisolation: true
		},
	}) 
	if (env('Debugmode')){
		wins.webContents.openDevTools()
	}
	wins.loadFile(env('TemplateDir') + 'setting.html')
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
	
//--- FileSystem	
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
//--- DarkMode
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
//--- Test function 
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

    WindowMain()
	// Prevent from multiple windows create
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			WindowMain()
		}
	})
})
// Release all resources of the app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
