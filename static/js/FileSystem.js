global.share.ipcMain.handle('fs-main',	(event,v) => {
	console.log(v)
	if(typeof v == 'undefined' || v == 'default'){
			
		return global.share.fs.readdirSync(env('StartDir'))
	}else if(fs.lstatSync(v).isDirectory()){
			
		return global.share.fs.readdirSync(v)
	}else{
		console.log('this is a file')
		const pathList = v.split('\\').slice(0,-1).join('\\')
			
		return global.share.fs.readdirSync(pathList)
	}
		
})
	//Side: Store file path
global.share.ipcMain.handle('fs-path',	(event,v) =>{
	if(v == 'default'){
		return app.getAppPath()
	}
})
	//Side: File type checker
global.share.ipcMain.handle('fs-type', (event,v) =>{
	return(global.share.fs.lstatSync(v).isDirectory())
})
	//Side: File browser
global.share.ipcMain.handle('fs-getDir', () => {
		
	const fsobject =dialog.showOpenDialogSync(win, {
		properties: ['openDirectory']
	})
	return fsobject

})