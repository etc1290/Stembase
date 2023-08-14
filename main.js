const { app, BrowserWindow, ipcMain, dialog, session } = require('electron')
const path = require('path')
const fs = require('fs')
const {sysBuild} = require('./build.js')

const {env} = require('./static/js/addon.js')
//const sqlite3 = require('sqlite3').verbose()
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
app.allowRendererProcessReuse = false

// Scripts import
const scriptImporter = () =>{
	const scriptDir = env('StaticDir') + 'js/'
	const filelist = fs.readdirSync(scriptDir)
	for(var i=0;i<filelist.length;i++){
		require(scriptDir + filelist[i])
	}
}


// WindowsCreator
	// Main Window
const WindowMain = async () => {
    const win = new BrowserWindow({
        width: env('Width'),
        height: env('Height'),
        webPreferences: {
			disableBlinkFeatures: 'DisallowInsecureUsage,AllowLists',
			allowlist:['style-src','self'],
            preload: path.join(__dirname, 'preload.js'),
			contextIsolation:true,
			nodeIntegration: false
        }
    })
	
	if (env('Debugmode')){
		win.webContents.openDevTools()
	}
    win.loadFile(env('TemplateDir') + 'index.html')	
	// Communication Test
	ipcMain.handle('tele-test',(event,v) =>{
//		console.log('child' + v)
		win.webContents.send('tele-test552',v)
	})
	ipcMain.handle('tele-test2',(event,v) =>{
		console.log('father' + v)
		})
	}

//--- Test	
/*
var exec = require('child_process').exec;
exec('NET SESSION', function(err,so,se) {
      console.log(se.length === 0 ? "admin" : "not admin")
    })	*/

const init = async() =>{  

	const isBuild = await sysBuild()
	scriptImporter() 
	if(isBuild){
		app.whenReady().then(() => {
			WindowMain()
			// Prevent from multiple windows create
			app.on('activate', () => {
				if (BrowserWindow.getAllWindows().length === 0) {
					WindowMain()
				}
			})	
		})
	}
	
	
}

init()

// Release all resources of the app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})