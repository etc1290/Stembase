const {ipcMain} = require('electron')
const fs = require('fs')
const {JsonDB,Config} = require('node-json-db')
const env = require('./env.js')

const Stemdb= env('StemdbDir')
const db 	= new JsonDB(new Config(Stemdb,true,true,'/'))	
ipcMain.handle('tag-main',	(event,name,value,path) =>{
	const meta	= new JsonDB(new Config(path + '\\Stemmeta',true,true,'/'))
	meta.push('/'+name,[value],false)
	db.push('/'+ path + '\\' +name,[value],false)
	db.push('/tag\\' + value,[name],false )
})
ipcMain.handle('tag-info', async (event,name,path) =>{
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
	/*
	tags = meta.getData('/' + name)
	console.log(e)
	*/
	return tags
})