const {ipcMain,BrowserWindow} = require('electron')
const env = require('./env.js')
const check = require('./check.js')
const {path,resolve}= require('path')
const {JsonDB,Config} = require('node-json-db')
const sqlite3 = require('sqlite3')


const WindowCodelab = async () =>{
	const wincl = new BrowserWindow ({
		width: env('Width'),
		height: env('Height'),
		
		webPreferences:{
			preload: resolve('clpreload.js'),
			contextIsolation:true
		},
	})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	if (env('Debugmode')){
		wincl.webContents.openDevTools()
	}
	wincl.loadFile(env('TemplateDir') + 'codelab.html')
	
}
	
const WindowStylelab = async () =>{
	const winsl = new BrowserWindow ({
		width: env('Width'),
		height: env('Height'),
		
		webPreferences:{
			preload: resolve('slpreload.js'),
			contextIsolation:true
		},
	})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	if (env('Debugmode')){
		winsl.webContents.openDevTools()
	}
	winsl.loadFile(env('TemplateDir') + 'stylelab.html')
	
}

ipcMain.handle('cw-codelab', () =>{
	WindowCodelab()
})
ipcMain.handle('cw-stylelab', () =>{
	WindowStylelab()
})

// File Tree Test
ipcMain.handle('fileTree',async	() =>{
			fileTree.build()
			const data = await fileTree
			// console.log(data)
			return JSON.stringify(data)
		})

//SQLite Test
var db = new sqlite3.Database('1.db',function() {
	db.run("create table test(name varchar(15))",function(){
	  db.run("insert into test values('hello,world')",function(){
		db.all("select * from test",function(err,res){
		  if(!err)
			console.log(JSON.stringify(res));
		  else
			console.log(err);
		})
	  })
	})
  })

ipcMain.handle('tag-getdata', async () => {
	return new Promise((resolve, reject) => {
		db.all("select * from test", (err, rows) => {
		  if (err) {
			reject(err);
		  } else {
			resolve(rows);
		  }
		});
	  });
})