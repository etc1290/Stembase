const {ipcMain} = require('electron')
const fs = require('fs')
const {JsonDB,Config} = require('node-json-db')
const env = require('./env.js')

const Stemdb= env('StemdbDir')
const db 	= new JsonDB(new Config(Stemdb,true,true,'/'))	
// Side: Search tags
const tagsearch = (name='',path='',isMeta = true) =>{
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
	let isNameExist = false
	let tags = ''
	try{
		tags = await tagsearch(name,path)
		isExist = tags.includes(value)				
	}catch(e){
		isExist = false
	}
	try{
		tags = await tagsearch(name,path,false)
			if(tags){
				isNameExist = true
			}
	}catch(e){
		isNameExist = false
	}
	if (!isExist && value !==''){
		const meta	= new JsonDB(new Config(path + '\\Stemmeta',true,true,'/'))		
		if(!isNameExist){
			console.log('s')
			db.push('/name/name',[name],false)
			db.push('/name/path',[path],false)
		}
		meta.push('/'+name,[value],false)
		db.push('/file/'+ path + '\\' +name,[value],false)
		db.push('/tag/' + value,[path + '\\' + name],false)	
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
	let tagset = []
	let nameset =[]
	let pathset =[]
	let dbtag	=''
	try{	
		dbtag = await db.getData('/tag')
		//const dbfile = await db.getData('/file')
		nameset = await db.getData('/name/name')
		pathset = await db.getData('/name/path')
	}catch(e){
		//return {tagset:[],fileset:[],nameset:[]}
		return{tagset:[],nameset:[],pathset:[]}
	}
	//const fileset =[]
	Object.keys(dbtag).forEach(e =>{
		tagset.push(e)
	})
	/*
	Object.keys(dbfile).forEach(e =>{
		fileset.push(e)
	})	
		return {tagset:tagset,fileset:fileset,nameset:nameset}	 */
		return {tagset:tagset,nameset:nameset,pathset:pathset}
})
//Side: Query
ipcMain.handle('tag-query', async(event,input,isTag = true) =>{
	let queryset = ''
	try{
		queryset = await db.getData('/tag/' + input)
	}catch(e){
		queryset = ['No matched result']
	}
	if(!queryset.length){
		queryset = ['No attachment']
	}
	return queryset
})