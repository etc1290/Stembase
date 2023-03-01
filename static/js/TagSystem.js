const {ipcMain} = require('electron')
const fs = require('fs')
const {JsonDB,Config} = require('node-json-db')
const env = require('./env.js')
const sqlite3 = require('sqlite3').verbose()
const Stemdb= env('StemdbDir')
const sqldb = new sqlite3.Database(Stemdb + '.db')

const db 	= new JsonDB(new Config(Stemdb,true,true,'/'))	
const metaParser = (path)=>{return new sqlite3.Database(path + '\\Stemmeta.db')}
// Side: Search tags
const tagsearch = (name='',path='',isMeta = true) =>{
	if(isMeta){
		const meta	= new JsonDB(new Config(path + '\\Stemmeta',true,true,'/'))
		return meta.getData('/' + name)
	}else{
		return db.getData('/file/' + path +'\\'+ name)
	}
}
// Main: Add tags

ipcMain.handle('tag-main', (event,name,tag,path) =>{
	const filename = path + '\\' + name
	const sqlmeta = metaParser(path)
	let output = ''
	sqldb.run(`insert or ignore into File(name) values(?)`,[filename],()=>{
		sqldb.run(`insert or ignore into Tag(tag) values(?)`,[tag],()=>{
			const cmd = `insert or ignore into Ref(nameref,tagref) values(?,?)`
			sqldb.run(cmd,[filename,tag],()=>{})
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
					resolve(true)
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
				resolve('None')
			}else{
				const data = res.map(i=>Object.values(i)[0])
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
				if(err){
				console.log(err)
				}
				resolve(true)
			})
	})
	
	const cmd = `delete from Ref where nameref = ? and tagref = ?`
	sqldb.run(cmd,[filename,tag],(err)=>{})
	return output
})
//Side:	match
ipcMain.handle('tag-match',async(event,v)=>{
	
	const input = '%' + v + '%'
	console.log(input)
	const cmd = `select tagref from Ref where tagref like ? collate nocase`
	const output = new Promise((resolve)=>{
		sqldb.all(cmd,[input],(err,res)=>{
			if(err){
				resolve(err)
			}else{
				const data = res.map(i=>Object.values(i)[0])
				resolve(data)
				console.log(data)
			}
		})
	})
	return output
})
/*
//Side: Get all db
ipcMain.handle('tag-getdb', async(event) =>{
	let tagset = []
	let nameset =[]
	let pathset =[]
	let dbtag	=''
	try{	
		dbtag = await db.getData('/tag')
		//const dbfile = await db.getData('/file')
		nameset = await db.getData('/name/name')
		pathset = await db.getData('/name/path')
	}catch(e){
		//return {tagset:[],fileset:[],nameset:[]}
		return{tagset:[],nameset:[],pathset:[]}
	}
	//const fileset =[]
	Object.keys(dbtag).forEach(e =>{
		tagset.push(e)
	})
	/*
	Object.keys(dbfile).forEach(e =>{
		fileset.push(e)
	})	
		return {tagset:tagset,fileset:fileset,nameset:nameset}	 
		return {tagset:tagset,nameset:nameset,pathset:pathset}
})*/
//Side: Query
ipcMain.handle('tag-query', async(event,input,isTag = true) =>{
	let queryset = ''
	try{
		queryset = await db.getData('/tag/' + input)
	}catch(e){
		queryset = ['No matched result']
	}
	if(!queryset.length){
		queryset = ['No attachment']
	}
	return queryset
})