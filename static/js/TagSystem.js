const {ipcMain,app,dialog} = require('electron')
const fs = require('fs')
const {JsonDB,Config} = require('node-json-db')
const env = require('./env.js')

ipcMain.handle('tag-main',	(event,v) =>{
	const db = new JsonDB(new Config('Stemdb',true,true,'/'))
	db.push('/'+v,'apple')
	console.log('apple')
})