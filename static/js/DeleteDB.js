const {ipcMain,app,dialog} = require('electron')
const sqlite3 = require('sqlite3').verbose()
//const env = require('./env.js')
const {env} = require('./addon.js')
const Stemdb= env('StemdbDir')
const db = new sqlite3.Database(Stemdb + '.db')
const { exec } = require('node:child_process');

function exe(input) {
    input = 'chcp 65001\n' + input
    exec(input, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
}

ipcMain.handle('ts-delDB', () => {
    console.log('Deleting!!')
    exe('dir')
})

ipcMain.handle('fs-openfile', (evt, v) => {
    console.log(v)
    exe('chcp 65001')
    exe(v)
})