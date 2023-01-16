const {ipcMain,app,dialog} = require('electron')
const fs = require('fs')
const env = require('./env.js')
	// Main: File query
    ipcMain.handle('fs-main',	(event,v) => {
		
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