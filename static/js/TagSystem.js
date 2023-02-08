const {ipcMain} = require('electron')
const fs = require('fs')
const {JsonDB,Config} = require('node-json-db')
const env = require('./env.js')

const Stemdb= env('StemdbDir')
const db 	= new JsonDB(new Config(Stemdb,true,true,'/'))	
// Side: Search tags
const tagsearch = (name='',path='',isMeta = true,) =>{
	if(isMeta){
		const meta	= new JsonDB(new Config(path + '\\Stemmeta',true,true,'/'))
		return meta.getData('/' + name)
	}else{
		return db.getData('/file/' + path +'\\'+ name)
	}
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
		db.push('/file/'+ path + '\\' +name,[value],false)
		db.push('/tag/' + value,[path + '\\' + name],false )
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
ipcMain.handle('tag-remove', async(event,file,tag,id,path) =>{
	let tagOfTag = await db.getData('/tag/' + tag)
	const tagid = tagOfTag.indexOf(file)
	tagOfTag.splice(tagid,1)
	let tagOfFile = await tagsearch(file,path,false)
	tagOfFile.splice(id,1)
	db.push('/file/' + path + '\\' + file,tagOfFile,true)
	db.push('/tag/' + tag,tagOfTag,true)
	const meta	= new JsonDB(new Config(path + '\\Stemmeta',true,true,'/'))
	meta.delete('/'+file+'[' + id +']')
})
//Side: Get all db
ipcMain.handle('tag-getdb', async(event) =>{
	const dbtag = await db.getData('/tag')
	const dbfile = await db.getData('/file')
	const tagset = []
	const fileset =[]
	Object.keys(dbtag).forEach(e =>{
		tagset.push(e)
	})
	Object.keys(dbfile).forEach(e =>{
		fileset.push(e)
	})
	return {tagset:tagset,fileset:fileset}	
})
//Side: Query tags
ipcMain.handle('tag-query', async(event,input) =>{
	const queryset = await db.getData('/tag/' + input)
	return queryset
})