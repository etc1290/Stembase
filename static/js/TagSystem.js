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
		return db.getData('/' + path +'\\'+ name)
	}
}
// Side: Search files
const tagfsearch = (tag) =>{
	return db.getData('/tag\\' + tag)
}
// Main: Add tags
ipcMain.handle('tag-main',	async(event,name,value,path) =>{
	let isExist = false
	let tags = ''
	try{
		tags = await tagsearch(name,path)
		isExist = tags.includes(value)
	}catch(e){
		isExist = false
	}
	if (!isExist && value !==''){
		const meta	= new JsonDB(new Config(path + '\\Stemmeta',true,true,'/'))
		meta.push('/'+name,[value],false)
		db.push('/'+ path + '\\' +name,[value],false)
		db.push('/tag\\' + value,[name],false )
	}
	
})
// Side: Display tags
ipcMain.handle('tag-info', async (event,name,path) =>{

	let tags = ''
	try{
		tags = await tagsearch(name,path)
	}catch(e){
		tags = 'None'
	}
	
	return tags
})
// Side: Remove tags
ipcMain.handle('tag-remove', async(event,name,value,id,path) =>{
	let tagfilelist = await db.getData('/tag\\' + value)
	const fileid = tagfilelist.indexOf(name)
	tagfilelist.splice(fileid,1)
	let filetaglist = await tagsearch(name,path,false)
	filetaglist.splice(id,1)
	db.push('/' + path + '\\' + name,filetaglist,true)
	db.push('/tag\\' + value, tagfilelist,true)
	const meta	= new JsonDB(new Config(path + '\\Stemmeta',true,true,'/'))
	meta.delete('/'+name+'[' + id +']')
})