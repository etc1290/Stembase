const {ipcMain,app,dialog} = require('electron')
const fs = require('fs')
const env = require('./env.js')
const bytes = require('./bytes.js')
const time = require('./time.js')

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
			
			property.forEach(i=>{
				
				let data = new Array()
				if (i=='file'){
					data = pathList
				}else if(i=='size'){
					v.forEach(e =>{
						try{
							const {[i]:k}=fs.statSync(e)
							data.push(bytes(k))
						}catch(e){
							data.push(false)
						}
					})
					
				}else if(i=='mtime'){
					
					v.forEach(e =>{
						try{
							const {[i]:k}=fs.statSync(e)
							data.push(time(k))
						}catch(e){
							data.push(false)
						}
					})			
				}else{
					
					v.forEach(e =>{
						try{
							const {[i]:k}=fs.statSync(e)
							data.push(k)
						}catch(e){
							data.push(false)
						}	
					})
					
				}
				if(data){
					output[i] = data
				} 
				
			})
			
			const outputset = output.filter(n=>n)
			
			return output			
		}
		// Main function starts here
		if(typeof v == 'undefined' || v == 'default'){
			fsdata = (({file,size,mtime})=>({file,size,mtime}))(dataMiner(env('StartDir'),['file','size','mtime']))
			return fsdata
		}else if(fs.lstatSync(v).isDirectory()){
			fsdata = (({file,size,mtime})=>({file,size,mtime}))(dataMiner(v,['file','size','mtime']))
			return fsdata
		}else{			
			const path = v.split('\\').slice(0,-1).join('\\')
			fsdata = (({file,size,mtime})=>({file,size,mtime}))(dataMiner(path,['file','size','mtime']))
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
	//Side: Exception Handler
	