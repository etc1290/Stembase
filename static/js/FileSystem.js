const {ipcMain,app,dialog} = require('electron')
const fs = require('fs')
const env = require('./env.js')
const bytes = require('./bytes.js')
	// Main: File query
    ipcMain.handle('fs-main',	(event,v) => {
		//Side: File details miner
		const dataMiner = (path,property) =>{
			const output = new Array()
			const v = new Array
			const pathList = fs.readdirSync(path)		
			pathList.forEach(e=>{
				v.push(path + '\\' + e)
			})
			console.log(pathList)
			property.forEach(i=>{
				console.log(i)
				let data = new Array()
				if (i=='file'){
					data = pathList
				}else if(i=='size'){
					v.forEach(e =>{
						const {[i]:k}=fs.statSync(e)
						data.push(bytes(k))
					})
				}else{
					v.forEach(e =>{
						const {[i]:k}=fs.statSync(e)
						data.push(k)
					})
				}
				console.log(data)
				output[i] = data
			})
			return output			
		}
		// Main function starts here
		if(typeof v == 'undefined' || v == 'default'){
			fsdata = (({file,size,birthtime})=>({file,size,birthtime}))(dataMiner(env('StartDir'),['file','size','birthtime']))
			return fsdata
		}else if(fs.lstatSync(v).isDirectory()){
			fsdata = (({file,size,birthtime})=>({file,size,birthtime}))(dataMiner(v,['file','size','birthtime']))
			return fsdata
		}else{
			console.log('this is a file')			
			const path = v.split('\\').slice(0,-1).join('\\')
			fsdata = (({file,size,birthtime})=>({file,size,birthtime}))(dataMiner(path,['file','size','birthtime']))
			return fsdata
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
	