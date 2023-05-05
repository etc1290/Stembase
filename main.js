const { app, BrowserWindow, ipcMain, dialog, session } = require('electron')
const path = require('path')
const fs = require('fs')
//const glob = require('glob')
const env = require('./static/js/env.js')
const Stemdb= env('StemdbDir')
const sqlite3 = require('sqlite3').verbose()

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
app.allowRendererProcessReuse = false

// Create a new db
const dbBuild = ()=>{
	const db = new sqlite3.Database(Stemdb + '.db')
	db.get('PRAGMA foreign_keys = ON')
	db.run(`create table "File" (
		"id"	integer not null unique,
		"name"	text not null unique,
		"file"	text not null,
		primary key("id" autoincrement)
	)`,()=>{})
	db.run(`create table "Tag" (
		"id"	integer not null unique,
		"tag"	text not null unique,
		primary key("id" autoincrement)
	)`,()=>{})
	db.run(`create table "Ref" (
		"id"		integer not null unique,
		"nameref"	text, 
		"tagref"	text,
		primary key("id" autoincrement)
		foreign key('nameref') references File(name) on delete cascade on update cascade,
		foreign key('tagref') references Tag(tag) on delete cascade on update cascade,
		unique(nameref,tagref)
	)`,()=>{})
	db.run(`create table "Monitor" (
		"id"	integer not null unique,
		"name"	text not null unique,
		primary key("id" autoincrement)
	)`,()=>{})

}
// Check essential folders
const firstBuild = ()=>{
	
	const dbStorage = env('StemdbStorage')
	const mdbStorage = env('StemMGDir')
 
	if (!fs.existsSync(dbStorage)){
		fs.mkdir(dbStorage,{recursive:true},()=>{
			if (!fs.existsSync(mdbStorage)){
				fs.mkdir(mdbStorage,{recursive:true},()=>{})
			}
		})
		
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

const init = () =>{  
	firstBuild()
	dbBuild()
	const Taskmanager = () =>{
		/*
		const funcScript = glob.sync(env('StaticDir') + '/js/*.js')
		funcScript.forEach((i) =>{require(i)})*/
		const scriptDir = env('StaticDir') + 'js/'
		const filelist = fs.readdirSync(scriptDir)
		for(var i=0;i<filelist.length;i++){
			require(scriptDir + filelist[i])
		}
	}
	Taskmanager() 
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

init()

// Release all resources of the app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})