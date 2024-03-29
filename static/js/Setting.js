const {ipcMain,BrowserWindow} = require('electron')
//const env = require('./env.js')
const {env,check} = require('./addon.js')
//const check = require('./check.js')
const path = require('path')
const {JsonDB,Config} = require('node-json-db')
const WindowSetting = async () =>{
	
	const wins = new BrowserWindow ({
		width: env('Width'),
		height: env('Height'),
		
		webPreferences:{
			preload: path.resolve('stpreload.js'),
			contextIsolation:true
		},
	})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	if (env('Debugmode')){
		wins.webContents.openDevTools()
	}
	wins.loadFile(env('TemplateDir') + 'setting.html')
	
	ipcMain.handle('st-test',	(event,v) => {
		console.log(v) 
	})
	ipcMain.handle('st-write',(event,i,v) =>{
		const db = new JsonDB(new Config("StemConfig", true, true, '/'))	
		const newv = check(v)
		db.push('/'+i,newv)
		
	})
	ipcMain.handle('st-read', (event,v) =>{
		return env(v)
	})
}
	


ipcMain.handle('cw-setting', () =>{
	WindowSetting()
})

