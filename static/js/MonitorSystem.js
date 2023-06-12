const {ipcMain,dialog} = require('electron')
const fs = require('fs')
const env = require('./env.js')
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
		const output = new Promise((resolve)=>{
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
		return output		
	}
	const idArr = await promiseChain()
	const cmdb = `select name from Members where id = ?`
	for(let i=0;i<idArr.length;i++){
		promiseArr[i] = new Promise((resolve)=>{
			mdb.all(cmdb,Number(idArr[i]),(err,res)=>{
				if(res){
					resolve(unpack(res))
				}else{
					resolve([])
				}
			})
		})
	}
	
	const groupArr = await Promise.all(promiseArr)
	for(var j=0;j<groupArr.length;j++){
		groupArr[j] = groupArr[j][0]
	}
	
	const cmdc = `select id,name from Members`
	const mdbs = mdbLoader(name)
	const dataArr = new Promise((resolve)=>{
		mdbs.all(cmdc,(err,res)=>{
			if(res[0]){
				resolve(unpack(res))
			}else{
				resolve([])
			}
			mdbs.close()
		})
	})
	
	const output = [groupArr,await dataArr]
	return output
	
})
// Remove monitored members
ipcMain.handle('mnt-remove',(event,folderset,dataset)=>{
	const output = new Promise((resolve)=>{
		const cmd = `delete from Members where name = ?`
		const cmda = `select parent from Members where name = ?`
		for(let i=0;i<dataset.length;i++){
			const mdb = mdbLoader(folderset[i])
			mdb.run(cmd,dataset[i],(err)=>{
				if(err){
					resolve(false)
				}else{
					resolve(true)
				}
				mdb.close()
			})
			
		}
	})
	return output
})
// Remove monitored members fromm all groups
ipcMain.handle('mnt-ungroup',(event,folderset,dataset)=>{
	
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
ipcMain.handle('mnt-update',(event,folderset,nameset)=>{
	const promiseArr = []
	const cmda = `select id from Members where name = ?`
	for(var i=0;i<folderset.length;i++){
		const folder = folderset[i]
		const name	 = nameset[i]
		const mdbg= mdbLoader('Groups')
		promiseArr[i] = new Promise((resolve)=>{
			mdbg.all(cmda,name,(err,res)=>{
				if(res[0]){
					const id = unpack(res)
					const cmdb = `select child from Members where name = ?`
					mdbg.all(cmdb,folder,(err,res)=>{
						const children = unpack(res)
						const isExist  = children.indexOf(id+'')
						if(isExist+1){
							resolve(true)
						}else{
							children.push(id)
							const cmdc = `insert or ignore into Members(name) values(?)`
							mdbg.all(cmdc,folder,()=>{
								const cmdd = `update Members set child = ? where name = ?`
								mdbg.all(cmdd,[children+'',folder],(err,res)=>{
									const cmde =`select parent from Members where id = ?`
									mdbg.all(cmde,id,(err,res)=>{
										const parents = unpack(res)
										mdbg.all(cmda,folder,(err,res)=>{		
											const parents = unpack(res)
											const cmdf = `update Members set parent = ? where id = ?`
											mdbg.all(cmdf,[parents+'',id],(err,res)=>{
												resolve(false)
											})
										})
										
									})
								})								
							})
						}
					})
				}else{
					const mdb = mdbLoader(folder)
					const cmd = `insert or ignore into Members(name) values(?)`
					mdb.all(cmd,name,()=>{
						mdb.close()
						if(folder){
							const cmda = `select parent from Monitor where name = ?`
							db.all(cmda,name,(err,res)=>{
								const groupArr = unpack(res,true)
								const isExist = groupArr.indexOf(name)
								if(isExist + 1){
									resolve(false)
								}else{
									groupArr.push(folder)
									const cmdb = `update Monitor set parent = ? where name = ?`
									db.all(cmdb,[groupArr + '',name],(err,res)=>{
										resolve(true)
									})
								}
							})
						}else{
							if(err){
								resolve(false)
							}else{
								resolve(true)
							}
						}					
					})
				}
			})
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




























