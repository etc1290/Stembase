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
				console.log(v)
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
			return dynamicList
		}
		// Main function starts here
		if(typeof v == 'undefined' || v == 'default'){
			const fileList = fs.readdirSync(env('StartDir'))
			const fileSize = dataMiner(fileList,'size')
			const fileBirth= dataMiner(fileList,'birthtime')
			return {file:fileList,size:fileSize,birthtime:fileBirth}
		}else if(fs.lstatSync(v).isDirectory()){
			const pathList = fs.readdirSync(v)
			const fileList = new Array
			pathList.forEach(e=>{
				fileList.push(v+'\\'+e)
			})
			console.log('apple' + fileList)
			const fileSize = dataMiner(fileList,'size')
			const fileBirth= dataMiner(fileList,'birthtime')
			return {file:pathList,size:fileSize,birthtime:fileBirth}
		}else{
			console.log('this is a file')
			const path = v.split('\\').slice(0,-1).join('\\')
			const pathList = fs.readdirSync(path)
			const fileList = new Array
			pathList.forEach(e=>{
				fileList.push(path+'\\'+e)
			})
			const fileSize = dataMiner(fileList,'size')
			const fileBirth= dataMiner(fileList,'birthtime')
			return {file:pathList,size:fileSize,birthtime:fileBirth}
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
	