const {ipcMain,app,dialog} = require('electron')
const sqlite3 = require('sqlite3').verbose()
const env = require('./env.js')
const Stemdb= env('StemdbDir')
const db = new sqlite3.Database(Stemdb + '.db')

ipcMain.handle('ts-delDB', () => {
    console.log('Deleting!!')
})

ipcMain.handle('fs-openfile', async (v) => {
    console.log(resolve(v))
})