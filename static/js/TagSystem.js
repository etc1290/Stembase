const {ipcMain,app,dialog} = require('electron')
const fs = require('fs')
const {JsonDB,Config} = require('node-json-db')
const env = require('./env.js')

const Stemdb = env('StemdbDir')
ipcMain.handle('tag-main',	(event,name,value) =>{
	const db = new JsonDB(new Config(Stemdb,true,true,'/'))	
	db.push('/'+name+'[]',value+'')
	console.log('apple')
})