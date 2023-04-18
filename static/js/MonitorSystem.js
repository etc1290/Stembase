const {ipcMain} = require('electron')
const fs = require('fs')
const env = require('./env.js')
const sqlite3 = require('sqlite3').verbose()
const Stemdb = env('StemdbDir')
const db = new sqlite3.Database(Stemdb + '.db')

ipcMain.handle('mnt-main', (event) =>{
	const output = new Promise((resolve)=>{
		const cmd = `select name from Monitor`
		db.all(cmd,(err,res)=>{
			const data = res.map(i=>Object.values(i)[0])
			resolve(data)
		})
	})
	return output
})