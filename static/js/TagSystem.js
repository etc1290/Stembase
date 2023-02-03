const {ipcMain,app,dialog} = require('electron')
const fs = require('fs')
const {JsonDB,Config} = require('node-json-db')
const env = require('./env.js')

const Stemdb = env('StemdbDir')
ipcMain.handle('tag-main',	(event,name,value,path) =>{
	const db 	= new JsonDB(new Config(Stemdb,true,true,'/'))	
	const meta	= new JsonDB(new Config(path + '\\Stemmeta',true,true,'/'))
	i = escape(name)
	//meta.push('/'+name,[value+''])
	db.push('/中文[]',value,true)
	console.log(path)
})