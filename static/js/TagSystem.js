const {ipcMain,dialog} = require('electron')
const fs = require('fs')
const env = require('./env.js')
const sqlite3 = require('sqlite3').verbose()
const Stemdb= env('StemdbDir')
const db = new sqlite3.Database(Stemdb + '.db')

const metaParser = (path)=>{return new sqlite3.Database(path + '\\Stemmeta.db',()=>{})}
// Main: Add tags

ipcMain.handle('tag-main', (event,name,tag,path) =>{
	const filename = path + '\\' + name
	const sqlmeta = metaParser(path)
	let output = ''
	db.run(`insert or ignore into File(name,file) values(?,?)`,[filename,name],()=>{
		db.run(`insert or ignore into Tag(tag) values(?)`,[tag],()=>{
			const cmd = `insert or ignore into Ref(nameref,tagref) values(?,?)`
			db.run(cmd,[filename,tag],()=>{})
		})
	})
	output = new Promise((resolve)=>{
		sqlmeta.run(`create table 'Meta'(
			"id" 	integer not null unique,
			"name" 	text not null,
			"tag"	text not null,
			primary key("id" autoincrement),
			unique(name,tag))`,()=>{
				const cmd = `insert or ignore into Meta(name,tag) values(?,?)`
				sqlmeta.all(cmd,[name,tag],()=>{
					db.run(`insert into Monitor(name) values(?)`,[path],(err,res)=>{
						if(err){
							resolve(true)
						}else{
							resolve(false)
						}
					})
				})
		} )
	})
	return output
	
})
// Side: Display tags
ipcMain.handle('tag-info', async(event,name,path) =>{
	const sqlmeta = metaParser(path)
	const cmd =`select tag from Meta where name = ?`
	const output = new Promise((resolve)=>{
		sqlmeta.all(cmd,[name],(err,res)=>{
			if(err || res.length==0){
				resolve(false)
			}else{
				const data = res.map(i=>Object.values(i)[0])
				resolve(data)
			}
		})
	})
	return output
})

// Side: Display Monitor
ipcMain.handle('tag-monitor',async(event,v)=>{
	const cmd = `select name from Monitor where name = ?`
	const output = new Promise((resolve)=>{
		db.all(cmd,[v],(err,res)=>{
			if(err){
				resolve(false)
			}else{
				const rawdata = res.map(i=>Object.values(i)[0])
				const data = [...new Set(rawdata)]
				resolve(data)
			}
		})
	})
	return output
})
// Side: Remove tags
ipcMain.handle('tag-remove', async(event,file,tag,path) =>{
	const sqlmeta = metaParser(path)
	const filename = path + '\\' + file
	const output = new Promise((resolve)=>{
		const cmd = `delete from Meta where name = ? and tag = ?`
			sqlmeta.run(cmd,[file,tag],(err)=>{
				resolve(true)
			})
	})
	
	const cmd = `delete from Ref where nameref = ? and tagref = ?`
	db.run(cmd,[filename,tag],(err)=>{})
	return output
})
//Side:	partial match
ipcMain.handle('tag-match',async(event,v)=>{
	
	const input = '%' + v + '%'
	const cmda = `select tag from Tag where tag like ? collate nocase union all `
	const cmdb = `select name from File where file like ? collate nocase`
	const cmd = cmda + cmdb
	const output = new Promise((resolve)=>{
		db.all(cmd,[input,input],(err,res)=>{
			if(err){
				console.log(err)
				resolve(err)
			}else{
				
				const rawdata = res.map(i=>Object.values(i)[0])
				const data = [...new Set(rawdata)]
				resolve(data)
			}
		})
	})
	return output
})

//Side: Query
ipcMain.handle('tag-query', (event,input,target,position,isTag=true)=>{
	const output = new Promise((resolve)=>{
		let cmd = `select ` + target + ` from Ref where ` + position +` = ?`
		if(!isTag){
			cmd = `select ` + target + ` from Ref where ` + position +` like ?`
			input = '%' + input
		}
		db.all(cmd,[input],(err,res)=>{
			if(err){
				resolve(err)
			}else{
				const data = res.map(i=>Object.values(i)[0])
				resolve(data)
				
			}
		})
	})
	return output
})
//Side: Exception Handler
ipcMain.handle('tag-error', (event,error)=>{
	const warn = []
	warn['taginput'] = 'Tag cannot be null!!'
	warn['tagdelete']= 'Tag is not selected!'
	dialog.showErrorBox('ERROR',warn[error])
})