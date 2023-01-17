const {ipcMain,BrowserWindow} = require('electron')
const env = require('./env.js')
const {path,resolve}= require('path')
const WindowSetting = async () =>{
	
	const wins = new BrowserWindow ({
		width: env('Width'),
		height: env('Height'),
		
		webPreferences:{
			preload: resolve('stpreload.js'),
			contextIsolation:true
		},
	}) 
	if (env('Debugmode')){
		wins.webContents.openDevTools()
	}
	wins.loadFile(env('TemplateDir') + 'setting.html')
	/*ipcMain.handle('st-test',	(event,v) => {
		console.log(v) */
	}
	

ipcMain.handle('st-test',	() =>{
	console.log('apple')
}),
ipcMain.handle('cw-setting', () =>{
	WindowSetting()
})
