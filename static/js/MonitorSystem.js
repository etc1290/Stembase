const {ipcMain} = require('electron')
const fs = require('fs')
const env = require('./env.js')
const sqlite3 = require('sqlite3').verbose()
const Stemdb = env('StemdbDir')
const db = new sqlite3.Database(Stemdb + '.db')
const mdbStorage = env('StemMGDir')


const mdbLoader = (folder) =>{
	return new sqlite3.Database(mdbStorage + '//' + folder + '.db')
}	
// Load all data
ipcMain.handle('mnt-main', (event) =>{
	const output = new Promise((resolve)=>{
		const cmd = `select name from Monitor`
		db.all(cmd,(err,res)=>{
			if(err){
				resolve(0)
			}else{
				const data = res.map(i=>Object.values(i)[0])
				resolve(data)
			}		
		})
	})
	return output
})
// Load monitored group data
ipcMain.handle('mnt-load',(event,folder)=>{
	const output = new Promise((resolve)=>{
		const mdb = mdbLoader(folder)
		const cmd = `select name from Members`
		mdb.all(cmd,(err,res)=>{
			if(err){
				resolve(false)
			}else{
				const data = res.map(i=>Object.values(i)[0])
				resolve(data)
			}
		})
	})
	return output
})
// Update monitored group members
ipcMain.handle('mnt-update',(event,folder,name)=>{
	const output = new Promise((resolve)=>{
		/*
		const mdbStorage = env('StemMGDir')
		const mdb = new sqlite3.Database(mdbStorage + '//' + folder + '.db')
		*/
		const mdb = mdbLoader(folder)
		mdb.run(`create table 'Members'(
			"id" 	integer not null unique,
			"name" 	text not null,
			primary key("id" autoincrement),
			unique(name))`,()=>{
				const cmd = `insert or ignore into Members(name) values(?)`
				mdb.all(cmd,[name],()=>{resolve(true)})
		} )
		
		/*
		if (!fs.existsSync(dbStorage)){
			fs.mkdir(dbStorage,{recursive:true},()=>{
				if (!fs.existsSync(mdbStorage)){
					fs.mkdir(mdbStorage,{recursive:true},()=>{})
				}
			})	
		}*/
	})
	return output
})
