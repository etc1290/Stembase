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
ipcMain.handle('mnt-load',(event,name)=>{
	const output = new Promise((resolve)=>{
		let groupArr= []
		let dataArr = []
		const mdb = mdbLoader('Groups')
		const cmda = `select child from Members where name = ?`
		mdb.all(cmda,name,(err,res)=>{
			if(res[0]){
				groupArr = res.map(i=>Object.values(i)[0])
			}
			const mdbs = mdbLoader(name)
			const cmdb = `select name from Members`
			mdbs.all(cmdb,(err,res)=>{
				if(res[0]){
					dataArr = res.map(i=>Object.values(i)[0])
				}	
				resolve([groupArr,dataArr])
			})
		})
	})
	return output
})
// Remove monitored members
ipcMain.handle('mnt-remove',(event,folderset,dataset)=>{
	const output = new Promise((resolve)=>{
		const cmd = `delete from Members where name = ?`
		
		for(let i=0;i<dataset.length;i++){
			const mdb = mdbLoader(folderset[i])
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
// Delete monitored groups
ipcMain.handle('mnt-delete',(event,folderset,dataset)=>{
	const output = new Promise((resolve)=>{
		const mdb = mdbLoader('Groups')
		const mdbs= mdbLoader('Shortcut') 
		const cmd = `delete from Members where name =?`
		const idlist = []
		for(let i=0;i<dataset.length;i++){
			//console.log(1)
			mdbs.all(cmd,[dataset[i]],(err,res)=>{
			//	console.log(2)
				if(res){
					idlist[0] = 'mnt-shortcut'
				}
				mdb.all(cmd,[dataset[i]],()=>{
				//	console.log(3)
					resolve(idlist)
				})
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
		newdb.close()
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
				"parent"text,
				"child"	text,
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
			mdb.all(cmda,[parent],(err,data)=>{
				if(err){
					resolve(false)
				}else{
					const grouplist = data.split(',')
					grouplist.push(child)
					const cmdb = `update subgroups from Members where name=?`
					mdb.all(cmdb,[grouplist+''],(err,res)=>{
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
		const isDuplicate = filelist.indexOf(newname+'.db')
		console.log(isDuplicate)
		if(isDuplicate+1){
			console.log(grouplist)
			const id = idPicker(grouplist)
			newname = newname + '#' + id
		}
		const mdb = mdbLoader('Groups')
		const cmd = `update Members set name = ? where name =?`
		mdb.all(cmd,[newname,oldname],(err)=>{
			console.log(newname)
			console.log(err)
			mdb.close()
			resolve(true)
		})
		//console.log(newname)
		fs.rename(mdbStorage + '//' + oldname + '.db',mdbStorage + '//' + newname + '.db',(err)=>{
			//console.log(err)
			
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
				mdb.all(cmd,[name],(err,res)=>{resolve(true)})
			}
		)
	})
	return output
})
// Initialize

