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
// Remove monitored members
ipcMain.handle('mnt-remove',(event,folder,dataset)=>{
	const output = new Promise((resolve)=>{
		const cmd = `delete from Members where name = ?`
		const mdb = mdbLoader(folder)
		for(let i=0;i<dataset.length;i++){
			mdb.run(cmd,dataset[i],(err)=>{
				if(err){
					resolve(false)
				}else{
					resolve(true)
				}
			})
			
		}
	})
	return output
})
// Create new monitored group
ipcMain.handle('mnt-create',(event)=>{
	const output = new Promise((resolve)=>{
		const filelist = fs.readdirSync(mdbStorage)	
		const grouplist = filelist.filter((e)=>{return e.startsWith('New Group #')})
		const idlist =[]
		let newid = false
		// Duplicate group check
		for(let i=0;i<grouplist.length;i++){
			const s = grouplist[i]
			const groupid = s.substring(s.indexOf('#')+1,s.lastIndexOf('.'))
			const number = Number(groupid)
			if(!Number.isNaN(number)){
				idlist[i] = number
			}
		}
		for(var i=0;i<idlist.length;i++){
			if(idlist.indexOf(i+1)==-1){
				newid=i+1
			}
		}
		if(!newid){
			newid = idlist.length + 1
		}
		const newname = 'New Group #' + newid
		const mdb = mdbLoader(newname)
		resolve(true)
	})
	return output
})
// Load monitored groups
ipcMain.handle('mnt-group',(event)=>{
	const output = new Promise((resolve)=>{
		const filelist = fs.readdirSync(mdbStorage)
		const grouplist = filelist.filter((e)=>{return e.endsWith('.db')})
		const idlist = []
		
		for(let i=0;i<grouplist.length;i++){
			const s = grouplist[i]
			const groupid = s.substring(0,s.lastIndexOf('.'))
			if(groupid!=='All' && groupid!=='Shortcut'){
				idlist[idlist.length] = groupid
			}			
		}
		resolve(idlist)
	})
	return output
})
// Rename monitored group
ipcMain.handle('mnt-rename', (event,data,name)=>{
	const output = new Promise((resolve)=>{
		fs.rename(mdbStorage + '//' + data + '.db',mdbStorage + '//' + name + '.db',(err)=>{
			console.log(err)
			resolve(true)
		})
	})
	return output
})
// Update monitored group members
ipcMain.handle('mnt-update',(event,folder,name)=>{
	const output = new Promise((resolve)=>{
		const mdb = mdbLoader(folder)
		mdb.run(`create table 'Members'(
			"id" 	integer not null unique,
			"name" 	text not null,
			primary key("id" autoincrement),
			unique(name))`,()=>{
				const cmd = `insert into Members(name) values(?)`
				mdb.all(cmd,[name],(err,res)=>{
					if(err){
						resolve(true)
					}else{
						resolve(false)
					}
				})
			}
		)
	})
	return output
})

