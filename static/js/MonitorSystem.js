const {ipcMain} = require('electron')
const fs = require('fs')
const env = require('./env.js')
const sqlite3 = require('sqlite3').verbose()
const Stemdb = env('StemdbDir')
const db = new sqlite3.Database(Stemdb + '.db')
const mdbStorage = env('StemMGDir')

// Monitored database loader
const mdbLoader = (folder) =>{
	return new sqlite3.Database(mdbStorage + '//' + folder + '.db')
}	

const idPicker = (arr) =>{
	let counter = id = 0
	if(!arr[0]){
		return 1
	}
	while(counter == id){
		const s = arr[counter]
		counter = counter + 1
		try{
			id = s.substring(s.indexOf('#')+1,s.lastIndexOf('.'))
		}catch(err){
			id = err
		}
		
	}
	return counter
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
		const id = idPicker(grouplist)
		const newname = 'New Group #' + id
		const newdb = mdbLoader(newname)
		resolve(newname)
	})
	return output
})
// Load monitored groups

ipcMain.handle('mnt-group',(event,parent,child)=>{
	/*
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
	*/
	const isGroups = parent == 'Groups'
	const output = new Promise((resolve)=>{
		const mdb = mdbLoader('Groups')
		if(isGroups){
			const mdb = mdbLoader('Groups')
			const cmda = `create table "Members" (
				"id"	integer not null unique,
				"name"	text not null unique,
				"subgroups"	text,
				primary key("id" autoincrement)
				)`
			const cmdb = `insert into Members(name) values(?)`
			mdb.run(cmda,()=>{
				mdb.all(cmdb,[child],()=>{
					resolve(true)
				})
			})
		}else{
			const cmda = `select subgroups from Members where name = ?`
			db.all(cmda,[parent],(err,data)=>{
				if(err){
					resolve(false)
				}else{
					const grouplist = data.split(',')
					grouplist.push(child)
					const cmdb = `update subgroups from Members where name=?`
					db.all(cmdb,[grouplist+''],(err,res)=>{
						if(err){
							resolve(false)
						}else{
							resolve(true)
						}
					})
				}
			})
		}
	})
	return output
})

// Rename monitored group
ipcMain.handle('mnt-rename', (event,oldname,newname)=>{
	const output = new Promise((resolve)=>{
		const filelist = fs.readdirSync(mdbStorage)
		const grouplist= filelist.filter((e)=>{return e.startsWith(newname)})
		if(grouplist[0]){
			const id = idPicker(grouplist)
			newname = newname + '#' + id
		}
		fs.rename(mdbStorage + '//' + oldname + '.db',mdbStorage + '//' + newname + '.db',(err)=>{
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
// Initialize

