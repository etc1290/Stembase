const {ipcMain,BrowserWindow} = require('electron')
//const env = require('./env.js')
const {env,check} = require('./addon.js')
//const check = require('./check.js')
const {path,resolve}= require('path')
const {JsonDB,Config} = require('node-json-db')


const WindowCodelab = async () =>{
	const wincl = new BrowserWindow ({
		width: env('Width'),
		height: env('Height'),
		
		webPreferences:{
			preload: resolve('clpreload.js'),
			contextIsolation:true
		},
	})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	if (env('Debugmode')){
		wincl.webContents.openDevTools()
	}
	wincl.loadFile(env('TemplateDir') + 'codelab.html')
	
}
	
const WindowStylelab = async () =>{
	const winsl = new BrowserWindow ({
		width: env('Width'),
		height: env('Height'),
		
		webPreferences:{
			preload: resolve('slpreload.js'),
			contextIsolation:true
		},
	})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	if (env('Debugmode')){
		winsl.webContents.openDevTools()
	}
	winsl.loadFile(env('TemplateDir') + 'stylelab.html')
	
}

ipcMain.handle('cw-codelab', () =>{
	WindowCodelab()
})
ipcMain.handle('cw-stylelab', () =>{
	WindowStylelab()
})