const {ipcMain,dialog} = require('electron')
const fs = require('fs')
//const env = require('./env.js')
const {env,arrUniq} = require('./addon.js')
const sqlite3 = require('sqlite3').verbose()
const Stemdb = env('StemdbDir')
const db = new sqlite3.Database(Stemdb + '.db')
const mdbStorage = env('StemMGDir')
const gdb= new sqlite3.Database(mdbStorage + '//' + 'Groups.db')
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
	const cmda = `select child from Members where name = ?`
	const promiseChain = ()=>{
		const outcome = new Promise((resolve)=>{
			gdb.all(cmda,name,(err,res)=>{
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
			gdb.all(cmdb,Number(idArr[i]),(err,res)=>{
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
		const cmdd = `select id from Members where name = ?`
		for(let i=0;i<dataset.length;i++){
			idChain[i] = new Promise((resolve)=>{
				gdb.all(cmdd,dataset[i],(err,res)=>{
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
	let mdb
	if(name == '@Stemdb'){
		mdb = db
	}else{
		mdb = mdbLoader(name)
	}
	const cmd = `select ` + cmdArr[0] + ` from ` + cmdArr[1] + pos
	const output = new Promise((resolve)=>{
		
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
	//const promiseChain = []
	const fakeChain = []
	const cmdga =`select parent from Members where id = ?`
	const cmdgb =`update Members set parent = ? where id = ?`
	const cmdgc =`select child from Members where id = ?`
	const cmdgd =`update Members set child = ? where id = ?`
	
	const cmda = `select name from Members where id = ?`
	const cmdb = `delete from Members where name = ?`
	const cmdc = `select parent from Monitor where name = ?`
	const cmdd = `update Monitor set parent = ? where name = ?`
	
	if(isGroup){
		// Groups
		for(let i=0;i<dataset.length;i++){
			
			const folder = folderset[i]
			const data = dataset[i]
			console.log(folder)
			console.log(data)
			const folderRemove =()=>{ 
				const outcome = new Promise((resolve)=>{
					gdb.all(cmdga,data,(err,res)=>{				
						const parentArr = unpack(res,true)
						let pos = parentArr.indexOf(folder)
						if(pos + 1){
							parentArr.splice(pos,1)
							gdb.all(cmdgb,[parentArr+'',data],(err,res)=>{
								gdb.all(cmdgc,folder,(err,res)=>{
									const childArr = unpack(res,true)
									pos = childArr.indexOf(data)
									if(pos + 1){
										childArr.splice(pos,1)
										gdb.all(cmdgd,[childArr+'',folder],(err)=>{
											resolve(true)
										})
									}
								})
							})
						}
					})
				})
				return outcome
			}
			fakeChain[i] = await folderRemove()
		}
	}else{
		// Data
		for(var i=0;i<dataset.length;i++){
			const dataRemove = ()=>{ 
				const outcome = new Promise((resolve)=>{
					const folder = folderset[i]
					const data = dataset[i]
					gdb.all(cmda,folder,(err,res)=>{
						const groupName = unpack(res)
						const mdb = mdbLoader(groupName)
						mdb.all(cmdb,data,()=>{
							db.all(cmdc,data,(err,res)=>{
								const parentArr = unpack(res,true)
								const pos = parentArr.indexOf(folder)
								if(pos + 1){
									parentArr.splice(pos,1)								
								}
								db.all(cmdd,[parentArr,data],(err,res)=>{
									resolve(true)
								})
							})
						})
					})
				})
				return outcome
			}
			fakeChain[i] = await dataRemove()
		}
	}

	const output = fakeChain
	return output
})
// Delete monitored groups
ipcMain.handle('mnt-delete',(event,dataset)=>{
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
				gdb.all(cmdc,pid,(err,res)=>{
					const child = unpack(res,true)
					const position = child.indexOf(id+'')
					const dump = child.splice(position,1)
					gdb.all(cmdd,[child,pid],(err,res)=>{
						gdb.all(cmde,pid,(err,res)=>{
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
			gdb.all(cmd,dataset[i],async(err,res)=>{
				const id = unpack(res)
				gdb.all(cmdb,id,async(err,res)=>{
					const parent = unpack(res,true)		
					const isFinished = await promiseChain(parent,id)
					if(isFinished){
						gdb.all(cmda,id,()=>{
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
			const cmda = `insert into Members(name) values(?)`
			gdb.all(cmda,newname,()=>{
				resolve(newname)
			})			
		})		
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
		const cmd = `update Members set name = ? where name =?`
		gdb.all(cmd,[newname,oldname],(err)=>{
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
	const cmdb 	= `select id from Members where name = ?`
	const cmdc	= `select parent from Monitor where name = ?`
	const cmdd	= `update Monitor set parent = ? where name = ?`
	for(let i=0;i<folderset.length;i++){
		const folder = folderset[i]
		const data = dataset[i]
		promiseArr[i] = new Promise((resolve)=>{
			if(isGroup){	
				gdb.all(cmdga,data,(err,res)=>{
					const parentArr = unpack(res,true)
					const isExist = parentArr.indexOf(folder)
					if(isExist+1){
						resolve(false)
					}else{
						parentArr.push(folder)
						gdb.all(cmdgb,[parentArr,data],()=>{
							gdb.all(cmdgc,folder,(err,res)=>{
								const childArr = unpack(res,true)
								childArr.push(data)
								gdb.all(cmdgd,[childArr,folder],()=>{
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
						gdb.all(cmdb,folder,(err,res)=>{
							const id = unpack(res)
							db.all(cmdc,data,(err,res)=>{
								const parentArr = unpack(res,true)
								const isExist = parentArr.indexOf(id)
								if(isExist + 1){
									resolve(false)
								}else{
									parentArr.push(id)
									db.all(cmdd,[parentArr,data],()=>{
										resolve(true)
									})
								}
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
	warn['mntmove-occupied']	= `Data exist in all monitored groups`
	warn['mntmove-exiled']		= `There is no any monitored group`
	dialog.showErrorBox('ERROR',warn[err])
})

// Building database
ipcMain.handle('mnt-build',async(event)=>{
	const promiseArr = []
	promiseArr[0] = new Promise((resolve)=>{
		const cmd = `create table "Members" (
			"id"	integer not null unique,
			"name"	text not null unique,
			"parent"text,
			"child"	text,
			primary key("id" autoincrement)
			)`
		gdb.run(cmd,(err,res)=>{
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
	const cmd = `select name from Members`
	const cmda = `insert or ignore into Members(name) values(?)`
	const filelist = fs.readdirSync(mdbStorage)
	const grouplist= filelist.filter((e)=>{return e.endsWith('.db')})
	grouplist.splice(grouplist.indexOf('Groups'),1)
	grouplist.splice(grouplist.indexOf('Shortcut'),1)
	for(let i=0;i<grouplist.length;i++){
		promiseArr[i] =new Promise((resolve)=>{
			gdb.all(cmd,[],()=>{	
				name = grouplist[i].slice(0,-3)
				gdb.all(cmda,name,(err,res)=>{
					resolve(true)
				})
			})
		})
	}
	const output = Promise.all(promiseArr)	
	return output
})




























