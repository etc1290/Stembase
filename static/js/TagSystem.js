const {ipcMain,app,dialog} = require('electron')
const fs = require('fs')
const {JsonDB,Config} = require('node-json-db')
const env = require('./env.js')

const Stemdb = env('StemdbDir')
ipcMain.handle('tag-main',	(event,name,value,path) =>{
	const db 	= new JsonDB(new Config(Stemdb,true,true,'/'))	
	const meta	= new JsonDB(new Config(path + '\\Stemmeta',true,true,'/'))
	meta.push('/'+name,[value],false)
	db.push('/'+name,[value],false)
})