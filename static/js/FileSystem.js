const {ipcMain,app,dialog} = require('electron')
const fs = require('fs')
const env = require('./env.js')
const bytes = require('./bytes.js')
	// Main: File query
    ipcMain.handle('fs-main',	(event,v) => {
		//Side: File details miner
		const dataMiner = (v,i) =>{
			const dynamicList = new Array()
			if(i=='size'){
				v.forEach(e =>{
					const {[i]:k}=fs.statSync(e)
					dynamicList.push(bytes(k))
				})
			}else{
				v.forEach(e => {
					const {[i]:k}=fs.statSync(e)			
					dynamicList.push(k)
				})
			}			
			return {i:dynamicList}
		}
		// Main function starts here
		if(typeof v == 'undefined' || v == 'default'){
			const fileList = fs.readdirSync(env('StartDir'))
			console.log(dataMiner(fileList,'size'))
			console.log(dataMiner(fileList,'birthtime'))
			return fileList
		}else if(fs.lstatSync(v).isDirectory()){
			
			const {size} = fs.statSync(v)
			console.log(bytes(size))
			return fs.readdirSync(v)
		}else{
			console.log('this is a file')
			const {size} = fs.statSync(v)
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
		
		const fsobject =dialog.showOpenDialogSync({
			properties: ['openDirectory']
		})
		return fsobject

	})
	