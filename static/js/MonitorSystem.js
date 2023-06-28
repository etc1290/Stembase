const {ipcMain,dialog} = require('electron')
const fs = require('fs')
//const env = require('./env.js')
const {env,arrUniq} = require('./addon.js')
const sqlite3 = require('sqlite3').verbose()
const Stemdb = env('StemdbDir')
const db = new sqlite3.Database(Stemdb + '.db')
const mdbStorage = env('StemMGDir')

// Monitored database loader
const mdbLoader = (folder,isMeta=false) =>{
	if(isMeta){
		return new sqlite3.Database(folder + 'Stemmeta.db')
	}else{
		return new sqlite3.Database(mdbStorage + '//' + folder + '.db')
	}
	
}	
// Unpack db result
const unpack = (res,isArr=false)=>{
	let keyLen = 0 
	if(res[0]){
		keyLen = Object.keys(res[0]).length
	}
	let gift = []
	if(keyLen-1){
		for(var a=0;a<keyLen;a++){
			gift[a] = res.map(i=>Object.values(i)[a]).filter(Boolean)
		}
	}else{
		gift = res.map(i=>Object.values(i)[0]).filter(Boolean)
	}	
	if(isArr){
		try{
			gift = gift[0].split(',')
		}catch(err){}
	}
	return gift
}
const idPicker = (arr) =>{
	let counter = id = 0
	if(!arr[0]){
		return 1
	}
	while(counter == id){
		const s = arr[counter]
		counter = counter + 1
		try{
			id = s.substring(s.indexOf('#')+1,s.lastIndexOf('.'))
		}catch(err){
			id = err
		}
	}
	return counter
}

// Load all data
ipcMain.handle('mnt-main', (event) =>{
	const output = new Promise((resolve)=>{
		const cmd = `select id,name from Monitor`
		db.all(cmd,(err,res)=>{
			if(err){
				resolve()
			}else{
				if(res[0]){
					const data = unpack(res)
					resolve(data)				
				}else{
					resolve([[],[]])
				}
			}		
		})
	})
	return output
})
// Load monitored group data
ipcMain.handle('mnt-load',async(event,name)=>{
	const promiseArr = []
	const mdb = mdbLoader('Groups')
	const cmda = `select child from Members where name = ?`

	const promiseChain = ()=>{
		const outcome = new Promise((resolve)=>{
			mdb.all(cmda,name,(err,res)=>{
				const raw = unpack(res)
				if(raw[0]){
					const rawArr = raw[0].split(',')
					resolve(rawArr)		
				}else{				
					resolve(unpack(res))
				}
			})
		})
		return outcome	
	}
	const idArr = await promiseChain()
	const cmdb = `select name from Members where id = ?`
	for(let i=0;i<idArr.length;i++){
		promiseArr[i] = new Promise((resolve)=>{
			mdb.all(cmdb,Number(idArr[i]),(err,res)=>{
				if(res){
					resolve([idArr[i],unpack(res)[0]])
				}else{
					resolve([])
				}
			})
		})
	}
	
	const groupArr = await Promise.all(promiseArr)
	const cmdc = `select name from Members`
	const mdbs = mdbLoader(name)
	const dataChain = ()=>{
		const outcome = new Promise((resolve)=>{
			mdbs.all(cmdc,(err,res)=>{
				if(res[0]){
					resolve(unpack(res))
				}else{
					resolve([])
				}
				mdbs.close()
			})
		})
		return outcome
	}
	const dataset = await dataChain()
	const idChain = []
	const isGroups = name =='Groups'
	if(isGroups){
		const mdbg = mdbLoader('Groups')
		const cmdd = `select id from Members where name = ?`
		for(let i=0;i<dataset.length;i++){
			idChain[i] = new Promise((resolve)=>{
				mdbg.all(cmdd,dataset[i],(err,res)=>{
					resolve(unpack(res))
				})
		})
	}
	}else{
		const cmdd = `select id from Monitor where name = ?`
		for(let i=0;i<dataset.length;i++){
			idChain[i] = new Promise((resolve)=>{
				db.all(cmdd,dataset[i],(err,res)=>{
					resolve(unpack(res))
				})
			})
		}
	}
	
	const idset = Promise.all(idChain)
	const dataArr = [await idset,dataset]
	const output = [groupArr,dataArr]
	return output
	
})
// Simple query
ipcMain.handle('mnt-query',async(event,cmdArr,name='Groups',isArr=false)=>{
	let pos = ''
	if(cmdArr[2]){
		pos = ` where ` + cmdArr[2] + ` = ?` 
	}
	const cmd = `select ` + cmdArr[0] + ` from ` + cmdArr[1] + pos
	const output = new Promise((resolve)=>{
		const mdb = mdbLoader(name)
		mdb.all(cmd,cmdArr[3],(err,res)=>{
			const outcome = unpack(res,isArr)
			resolve(outcome)
		})
	})
	return output
})
// Get belonged monitored groups data
ipcMain.handle('mnt-get',async(event,dataset)=>{
	
	const isArr = dataset.constructor == Array
	if(!isArr){
		dataset = [dataset]
	}else{
		dataset = arrUniq(dataset)
	}
	const cmd = `select parent from Monitor where name = ?`
	const promiseChain = []
	for(var i=0;i<dataset.length;i++){
		const data = dataset[i]
		promiseChain[i] = new Promise((resolve)=>{
			db.all(cmd,data,(err,res)=>{
				if(err){
					resolve([])
				}else{
					const arr = unpack(res,true)
					if(arr[0]){
						resolve(arr)
					}else{
						resolve([])
					}
				}
			})
		})
	}
	const totalArr = await Promise.all(promiseChain)
	const flatArr = totalArr.flat()
	const output = arrUniq(flatArr)
	return output
})
// Remove monitored members
ipcMain.handle('mnt-remove',async(event,folderset,dataset,isGroup = false)=>{
	const promiseChain = []
	const cmd  = `delete from Members where name = ?`
	const cmda = `select parent from Monitor where name = ?`
	const cmdb = `update Monitor set parent = ? where name = ?`
	/*
	const cmdga= `select id from Members where name = ?`
	const cmdgb= `select child from Members where id = ?` 
	const cmdgc= `update Members set child = ? where id = ?`
	const cmdgd= `select parent from Members where id = ?`*/
	if(isGroup){
		const mdb = mdbLoader('Groups')
		for(let i=0;i<dataset.length;i++){
			promiseChain[i] = new Promise((resolve)=>{
				console.log(11)
				resolve(true)
				/*
				mdb.all(cmdga,folderset[i],(err,res)=>{
					const parentid = unpack(res)
					mdb.all(cmdga,dataset[i],(err,res)=>{
						const childid = unpack(res)
						mdb.all(cmdgb,parentid,(err,res)=>{
							const childArr = unpack(res,true)
							const childPos = childArr.indexOf(childid)
							childArr.splice(childPos,1)
							mdb.all(cmdgc,[childArr,parentid],(err,res)=>{
								mdb.all(cmdgd,childid)
							})
						})
					})
					
				})*/
			})
		}
	}else{
		for(let i=0;i<dataset.length;i++){	
			promiseChain[i] = new Promise((resolve)=>{
				const mdb = mdbLoader(folderset[i])
				const data = dataset[i]
				const folder=folderset[i]
				mdb.run(cmd,data,(err)=>{
					if(err){
						resolve(false)
					}else{
						db.all(cmda,data,(err,res)=>{
							const groupArr = unpack(res,true)
							const index = groupArr.indexOf(folder)
							if(index+1){
								groupArr.splice(index,1)
								db.all(cmdb,[groupArr + '',data],()=>{
									resolve(true)
								})
							}else{
								resolve(true)
							}							
						})
					}
					mdb.close()
				})
			})
		}		
	}

	const output = Promise.all(promiseChain)
	return output
})
// Delete monitored groups
ipcMain.handle('mnt-delete',(event,dataset)=>{
	const mdb = mdbLoader('Groups')
	const cmd  = `select id from Members where name = ?`
	const cmda = `delete from Members where id =?`
	const cmdb = `select parent from Members where id =?`
	const cmdc = `select child from Members where id =?`
	const cmdd = `update Members set child = ? where id = ?`
	const cmde = `select name from Members where id = ?`
	
	const idlist = []
	const promiseArr = []
	const promiseChain = (parent,id)=>{
		const chainArr = []
		for(let j=0;j<parent.length;j++){
			chainArr[j] = new Promise((resolve)=>{
				const pid = parent[j]
				mdb.all(cmdc,pid,(err,res)=>{
					const child = unpack(res,true)
					const position = child.indexOf(id+'')
					const dump = child.splice(position,1)
					mdb.all(cmdd,[child,pid],(err,res)=>{
						mdb.all(cmde,pid,(err,res)=>{
							idlist.push(unpack(res)[0])
							resolve(true)
						})
					})
				})
			})
		}
		const reply = Promise.all(chainArr)
		return reply
	}
	for(let i=0;i<dataset.length;i++){
		const name = dataset[i]
		promiseArr[i] = new Promise((resolve)=>{
			mdb.all(cmd,dataset[i],async(err,res)=>{
				const id = unpack(res)
				mdb.all(cmdb,id,async(err,res)=>{
					const parent = unpack(res,true)		
					const isFinished = await promiseChain(parent,id)
					if(isFinished){
						mdb.all(cmda,id,()=>{
							fs.unlink(mdbStorage + '\\' + name + '.db',(err)=>{
								resolve(idlist)
							})
						})
					}
				})	
				
			})
		})
	}
	
	const output = Promise.all(promiseArr)
	return output
})
// Delete monitored members
ipcMain.handle('mnt-delete-member',(event,folderset,dataset)=>{
	const cmd = `delete from Members where name = ?`
	const cmda= `delete from Monitor where name = ?`
	//const cmdb= `delete from Ref where nameref = ?`
	const cmdb = `select name from Meta`
	const cmdc= `delete from File where name = ?`
	const cmdd= `delete from Ref where nameref = ?`
	const promiseArr = []
	
	const dbDelete = (path,dataArr)=>{
		const delArr = []
		for(var i=0;i<dataArr.length;i++){
			const data = path + dataArr[i]
			delArr[i] = new Promise((resolve)=>{
				db.all(cmdc,data,(err)=>{
					db.all(cmdd,data,(err)=>{
						resolve(true)
					})
				})
			})
		}
		const delpromise = Promise.all(delArr)
		return delpromise
	}
	for(var i=0;i<folderset.length;i++){
		promiseArr[i] = new Promise((resolve)=>{
			const data = dataset[i]
			const folder = folderset[i]
			const mdb = mdbLoader(folder)
			mdb.all(cmd,data,(err)=>{
				mdb.close()
			})
			db.all(cmda,data,(err)=>{
				const meta = mdbLoader(data,true)
				meta.all(cmdb,async(err,res)=>{
					meta.close()
					const isFinished = await dbDelete(data,unpack(res))
					if(isFinished){
						fs.unlink(data + 'Stemmeta.db',(err)=>{
							resolve(true)
						})
					}
				})
			})
		})		
	}
	const output = Promise.all(promiseArr)
	return output
})
// Create new monitored group
ipcMain.handle('mnt-create',(event)=>{
	const output = new Promise((resolve)=>{
		const filelist = fs.readdirSync(mdbStorage)	
		const grouplist = filelist.filter((e)=>{return e.startsWith('New Group #')})
		const id = idPicker(grouplist)
		const newname = 'New Group #' + id
		const newdb = mdbLoader(newname)
		const cmd = `create table 'Members'(
			"id" 	integer not null unique,
			"name" 	text not null,
			primary key("id" autoincrement),
			unique(name))`
		newdb.run(cmd,()=>{
			newdb.close()
			const mdb = mdbLoader('Groups')
			const cmda = `insert into Members(name) values(?)`
			mdb.all(cmda,newname,()=>{
				resolve(newname)
			})			
		})		
	})
	return output
})
// Load monitored groups
ipcMain.handle('mnt-group',(event,parent,child)=>{
	const isGroups = parent == 'Groups'
	const output = new Promise((resolve)=>{
		const mdb = mdbLoader('Groups')
		if(isGroups){
			const mdb = mdbLoader('Groups')
			const cmda = `create table "Members" (
				"id"	integer not null unique,
				"name"	text not null unique,
				"parent"text,
				"child"	text,
				primary key("id" autoincrement)
				)`
			const cmdb = `insert into Members(name) values(?)`
			mdb.run(cmda,()=>{
				mdb.all(cmdb,[child],()=>{
					resolve(true)
				})
			})
		}else{
			const cmda = `select child from Members where name = ?`
			mdb.all(cmda,[parent],(err,data)=>{
				if(err){
					resolve(false)
				}else{
					const grouplist = data.split(',')
					grouplist.push(child)
					const cmdb = `update child from Members where name=?`
					mdb.all(cmdb,[grouplist+''],(err,res)=>{
						if(err){
							resolve(false)
						}else{
							resolve(true)
						}
					})
				}
			})
		}
	})
	return output
})

// Rename monitored group
ipcMain.handle('mnt-rename', (event,oldname,newname)=>{
	const output = new Promise((resolve)=>{
		const filelist = fs.readdirSync(mdbStorage)
		const grouplist= filelist.filter((e)=>{return e.startsWith(newname)})
		const isDuplicate = filelist.indexOf(newname+'.db')
		if(isDuplicate+1){
			const id = idPicker(grouplist)
			newname = newname + '#' + id
		}
		const mdb = mdbLoader('Groups')
		const cmd = `update Members set name = ? where name =?`
		mdb.all(cmd,[newname,oldname],(err)=>{
			mdb.close()
			resolve(true)
		})
		fs.rename(mdbStorage + '//' + oldname + '.db',mdbStorage + '//' + newname + '.db',(err)=>{
			
		})
	})
	return output
})
// Update monitored group members
ipcMain.handle('mnt-update',(event,folderset,dataset,isGroup=false)=>{
	const promiseArr = []
	const cmdga = `select parent from Members where id = ?`
	const cmdgb = `update Members set parent = ? where id = ?`
	const cmdgc = `select child from Members where id = ?`
	const cmdgd = `update Members set child = ? where id = ?`
	const cmda	= `insert into Members(name) values(?)`
	const cmdb	= `select parent from Monitor where name = ?`
	const cmdc	= `update Monitor set parent = ? where name = ?`
	for(var i=0;i<folderset.length;i++){
		const folder = folderset[i]
		const data = dataset[i]
		promiseArr[i] = new Promise((resolve)=>{
			if(isGroup){
				const mdb = mdbLoader('Groups')		
				mdb.all(cmdga,data,(err,res)=>{
					const parentArr = unpack(res,true)
					const isExist = parentArr.indexOf(folder)
					if(isExist+1){
						resolve(false)
					}else{
						parentArr.push(folder)
						//console.log(parentArr)
						mdb.all(cmdgb,[parentArr,data],()=>{
							mdb.all(cmdgc,folder,(err,res)=>{
								const childArr = unpack(res,true)
								childArr.push(data)
								mdb.all(cmdgd,[childArr,folder],()=>{
									resolve(true)
								})
							})
						})
					}
				})
			}else{
				const mdb = mdbLoader(folder)
				mdb.all(cmda,data,(err,res)=>{
					if(err){
						resolve(false)
					}else{
						db.all(cmdb,data,(err,res)=>{
							const parentArr = unpack(res,true)
							parentArr.push(folder)
							db.all(cmdc,[parentArr,data],()=>{
								resolve(true)
							})
						})
					}
				})
			}	
		})
		
	}
	const output = Promise.all(promiseArr)
	return output
})
// Exception handler
ipcMain.handle('mnt-error',(event,err)=>{
	const warn = []
	warn['mntrename-censor']	= `Groups name cannot contain` + '`!`@$%^&*+\\=[]{};' + `:"|,<>/?~`
	warn['mntrename-empty']		= `Groups name cannot make by white space only`
	warn['mntrename-prefix']	= `Groups name cannot start with white space`
	dialog.showErrorBox('ERROR',warn[err])
})

// Building database
ipcMain.handle('mnt-build',async(event)=>{
	const promiseArr = []
	promiseArr[0] = new Promise((resolve)=>{
		const mdb = mdbLoader('Groups')
		const cmd = `create table "Members" (
			"id"	integer not null unique,
			"name"	text not null unique,
			"parent"text,
			"child"	text,
			primary key("id" autoincrement)
			)`
		mdb.run(cmd,(err,res)=>{
			resolve(true)
		})
	})
	promiseArr[1] = new Promise((resolve)=>{
		const mdb = mdbLoader('Shortcut')
		const cmd = `create table 'Members'(
			"id" 	integer not null unique,
			"name" 	text not null,
			primary key("id" autoincrement),
			unique(name))`
		mdb.run(cmd,(err,res)=>{
			resolve(true)
		})
	})
	const output = Promise.all(promiseArr)
	return output
})

// Setting Support
// Restore the missing records in Groups 
ipcMain.handle('mnt-groupscan',(event)=>{
	const promiseArr = []
	const mdb = mdbLoader('Groups')
	const cmd = `select name from Members`
	const cmda = `insert or ignore into Members(name) values(?)`
	const filelist = fs.readdirSync(mdbStorage)
	const grouplist= filelist.filter((e)=>{return e.endsWith('.db')})
	grouplist.splice(grouplist.indexOf('Groups'),1)
	grouplist.splice(grouplist.indexOf('Shortcut'),1)
	for(let i=0;i<grouplist.length;i++){
		promiseArr[i] =new Promise((resolve)=>{
			mdb.all(cmd,[],()=>{	
				name = grouplist[i].slice(0,-3)
				mdb.all(cmda,name,(err,res)=>{
					resolve(true)
				})
			})
		})
	}
	const output = Promise.all(promiseArr)	
	return output
})




























