const { app, BrowserWindow, ipcMain, nativeTheme, dialog } = require('electron')
const path = require('path')
const fs = require('fs')
//const {JsonDB,Config} = require('node-json-db')
const glob = require('glob')
const env = require('./static/js/env.js')
const Stemdb= env('StemdbDir')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(Stemdb + '.db')

	// General Declaration
const FileTree = require(env('StaticDir') + 'js/FileTree.js')
var fileTree = new FileTree(__dirname)


// Create a new db
db.get('PRAGMA foreign_keys = ON')
db.run(`create table "File" (
	"id"	integer not null unique,
	"name"	text not null unique,
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
/*
const a = 'banana'
const b = 'yellow'
db.run(`insert or ignore into File (name) values (?)`,[a],()=>{
	db.run(`insert or ignore into Tag (tag) values (?)`,[b],()=>{
		db.run(`insert or ignore into Ref (nameref,tagref) values (?,?)`,[a,b],()=>{
			db.close()
		})
	})
})
*/


//db.run(`update File set name = ? `,['apple'],(e)=>{console.log(e)})
//db.run(`update Tag set tag = ? `,['round'],(e)=>{console.log(e)})
//db.run(`update Ref set tagref = ? where nameref = ?`,['round','apple'],(e)=>{console.log(e)})
/*
db.run('INSERT INTO Main VALUES(?, ?)', [a, b])
db.all('select Main.name as name,Main.tag as tag from Main order by name',[],(err,row)=>{
	if(err){
		throw err
	}
	row.forEach((row)=>{
		console.log(row.name)
		console.log(row.tag)
	})
})
db.close()
*/
/*
var db = new sqlite3.Database('data/Stemdb.db',function() {
  db.run("create table test(name varchar(15))",function(){
    db.run("insert into test values('hello,world')",function(){
      db.all("select * from test",function(err,res){
        if(!err)
          console.log(JSON.stringify(res))
        else
          console.log(err)
      })
    })
  })
})*/


// WindowsCreator
	// Main Window
const WindowMain = async () => {
    const win = new BrowserWindow({
        width: env('Width'),
        height: env('Height'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
			contextIsolation:true
        },
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
	const Taskmanager = () =>{
		const funcScript = glob.sync(env('StaticDir') + '/js/*.js')
		funcScript.forEach((i) =>{require(i)})
	}
	Taskmanager()  
	app.whenReady().then(() => {
		//Test function
		ipcMain.handle('fileTree',async	() =>{
			fileTree.build()
			const data = await fileTree
			console.log(data)
			return JSON.stringify(data)
			
		})
		
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