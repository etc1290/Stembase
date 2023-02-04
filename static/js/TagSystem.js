const {ipcMain} = require('electron')
const fs = require('fs')
const {JsonDB,Config} = require('node-json-db')
const env = require('./env.js')

const Stemdb= env('StemdbDir')
const db 	= new JsonDB(new Config(Stemdb,true,true,'/'))	
// Side: Search tags
const tagsearch = (name,path,isMeta = true) =>{
	if(isMeta){
		const meta	= new JsonDB(new Config(path + '\\Stemmeta',true,true,'/'))
		return meta.getData('/' + name)
	}else{
		return db.getData('/' + path + name)
	}
}
// Main: Add tags
ipcMain.handle('tag-main',	(event,name,value,path) =>{
	const meta	= new JsonDB(new Config(path + '\\Stemmeta',true,true,'/'))
	meta.push('/'+name,[value],false)
	db.push('/'+ path + '\\' +name,[value],false)
	db.push('/tag\\' + value,[name],false )
})
// Side: Display tags
ipcMain.handle('tag-info', async (event,name,path) =>{
	/*
	const meta	= new JsonDB(new Config(path + '\\Stemmeta',true,true,'/'))
	let tags = ''	
	const fakePromise = (name) =>{
		return tags = meta.getData('/' + name)
	}
	try{
		await fakePromise(name)
	}catch(e){
		tags = 'None'
	}
	*/
	let tags = ''
	try{
		tags = await tagsearch(name,path)
	}catch(e){
		tags = 'None'
	}
	console.log(tags)
	return tags
})