const {env} = require('./static/js/addon.js')
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
// Creat Stemconfig
const envCreation = ()=>{	
	const config = 'Stemconfig.json'
	const content = {
		"TemplateDir": "./template/",
		"StaticDir": "./static/",
		"StemdbStorage":"./data",
		"StemdbDir":"./data/Stemdb",
		"StemMGDir":"./data/MonitoredGroups",
		"StartDir": "./",
		"Debugmode": 1,
		"Width": 1280,
		"Height": 960,
		"MatchDisplayNum": 5,
		"FirstLaunch": 1
	}
	const json = JSON.stringify(content)
	const output = new Promise((resolve)=>{
		const isExist = fs.existsSync('../../' + config)
		if(isExist){
			resolve(true)
		}else{
			fs.writeFile(config,json,'utf8',()=>{
				resolve(true)
			})
		}		
	})
	return output
}

// Creat system folders
const pathCreation = async()=>{
	const dbStorage = env('StemdbStorage')
	const mdbStorage = env('StemMGDir')
	const hasStemdb = fs.existsSync(dbStorage)
	const hasMonitor = fs.existsSync(mdbStorage)
	const promiseChain = []
	promiseChain[0] = new Promise((resolve)=>{
		if(hasStemdb){
			resolve(true)
		}else{
			fs.mkdir(dbStorage,{recursive:true},(err)=>{
				console.log(err)
				resolve(true)
			})
		}
	})
	promiseChain[1] = new Promise((resolve)=>{
		if(hasMonitor){
			resolve(true)
		}else{
			fs.mkdir(mdbStorage,{recursive:true},(err)=>{
				console.log(err)
				resolve(true)
			})
		}
	})
	const output = Promise.all(promiseChain)
	return output
	/*
	if (!fs.existsSync(dbStorage)){
		fs.mkdir(dbStorage,{recursive:true},()=>{
			if (!fs.existsSync(mdbStorage)){
				fs.mkdir(mdbStorage,{recursive:true},()=>{})
			}
		})	
	}*/		
}

// Creat Database
const dbBuild = ()=>{
	const Stemdb = env('StemdbDir')
	const db = new sqlite3.Database(Stemdb + '.db')
	db.get('PRAGMA foreign_keys = ON')
	const cmdFile	= `create table "File" (
		"id"		integer not null unique,
		"name"		text not null unique,
		"file"		text not null,
		primary key("id" autoincrement)
	)`
	const cmdTag	= `create table "Tag" (
		"id"		integer not null unique,
		"tag"		text not null unique,
		primary key("id" autoincrement)
	)`
	const cmdRef	= `create table "Ref" (
		"id"		integer not null unique,
		"nameref"	text, 
		"tagref"	text,
		primary key("id" autoincrement)
		foreign key('nameref') references File(name) on delete cascade on update cascade,
		foreign key('tagref') references Tag(tag) on delete cascade on update cascade,
		unique(nameref,tagref)
	)`
	const cmdMnt	= `create table "Monitor" (
		"id"		integer not null unique,
		"parent"	text,
		"name"		text not null unique,
		primary key("id" autoincrement)
	)`
	const output = new Promise((resolve)=>{
		db.run(cmdFile,(err)=>{
			db.run(cmdTag,(err)=>{
				db.run(cmdRef,(err)=>{
					db.run(cmdMnt,(err)=>{
						resolve(true)
					})
				})
			})
		})
	})
	return output
}


const sysBuild = ()=>{
	const output = new Promise(async(resolve)=>{
		const hasConfig = await envCreation()
		if(hasConfig){
			const hasFolders = await pathCreation()
			if(hasFolders){
				const hasDB = await dbBuild()
				if(hasDB){
					resolve(true)
				}
			}
		}
	})
	return output
}

module.exports = {
	sysBuild
}