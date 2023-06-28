// Side: 	Drag remake
const mntdragSetup = function() {
  var mntdrag,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments) } }

  mntdrag = (function() {
    function mntdrag(el) {
      this.el = el
      this.dragleave = __bind(this.dragleave, this)
      this.dragenter = __bind(this.dragenter, this)
      if (this.supportsEventConstructors()) {
        this.first = false
        this.second = false
        this.el.addEventListener("dragenter", this.dragenter, false)
        this.el.addEventListener("dragleave", this.dragleave, false)
      }
    }

    mntdrag.prototype.dragenter = function(event) {
      if (this.first) {
        return this.second = true
      } else {
        this.first = true
        return this.el.dispatchEvent(new CustomEvent("mntdrag:enter", {
          bubbles: true,
          cancelable: true,
          detail: {
            dataTransfer: event.dataTransfer
          }
        }))
      }
    }

    mntdrag.prototype.dragleave = function(event) {
      if (this.second) {
        this.second = false
      } else if (this.first) {
        this.first = false
      }
      if (!this.first && !this.second) {
        return this.el.dispatchEvent(new CustomEvent("mntdrag:leave", {
          bubbles: true,
          cancelable: true,
          detail: {
            dataTransfer: event.dataTransfer
          }
        }))
      }
    }

    mntdrag.prototype.removeListeners = function() {
      this.el.removeEventListener("dragenter", this.dragenter, false)
      return this.el.removeEventListener("dragleave", this.dragleave, false)
    }

    mntdrag.prototype.supportsEventConstructors = function() {
      try {
        new CustomEvent("z")
      } catch (_error) {
        return false
      }
      return true
    }

    mntdrag.prototype.reset = function() {
      this.first = false
      return this.second = false
    }

    return mntdrag

  })()
  window.mntdrag = mntdrag
}
// Side:	Monitored unique class picker
const mntclass = (el) =>{
	const arr = el.classList
	const isData = arr.contains('mnt-data')
	let checkClass = 'mnt-usergroup-'
	let n = 14
	if(isData){
		checkClass = 'mnt-data-'
		n = 9
	}
	let uniqClass = arr[1]
	const isUniq = uniqClass.substring(0,n) == checkClass
	if(!isUniq){
		for(var i=0;i<arr.length;i++){
			if(i==1){
				continue
			}
			const cls = arr[i]
			if(cls.substring(0,n) == checkClass){
				uniqClass = cls
				break
			}
		}
	}
	const id = uniqClass.substring(n)
	return [id,uniqClass]	
}
// Side:	Data and groups selector
const mntsort = (arr)=>{
	const groupArr = []
	const dataArr = []
	const groupParent = []
	const dataParent = []
	let g = 0
	let d = 0
	for(var i=0;i<arr['Raw'].length;i++){
		const el = arr['Raw'][i]
		const p = arr['Parent'][i]
		const isData = el.classList.contains('mnt-data')
		if(isData){
			dataParent[d] = p
			dataArr[d++] = el
		}else{
			groupParent[g] = p
			groupArr[g++]= arr['Folderid'][i]
		}
	}
	return [groupArr,dataArr,groupParent,dataParent]
}

// Side:	Target class checker
const mntcheck = (event,classname,isCurrent=false)=>{
	if(!event){
		console.log('event is . Did you remember to call it ?')
	}
	if(isCurrent){
		return event.currentTarget.classList.contains(classname)
	}else{
		return event.target.classList.contains(classname)
	}
}
// Side:	Reserved characters replacer
const mntreplace = (name)=>{
	
	const c = '@'
	const isArr = name.constructor == Array
	if(isArr){
		console.log(name)
		for(var i=0;i<name.length;i++){
			name[i] = name[i].replace(/ /g,c)
		}
		return name
	}
	return name.replace(/ /g,c)
}
// Side:	Selected monitored members
const mntselected = (event)=>{
	const selected = document.querySelectorAll('.mnt-selected')
	for(let i=0;i<selected.length;i++){
		selected[i].classList.remove('mnt-selected')
		selected[i].style.background = ''
	}
	if(mntcheck(event,'mnt-data') || mntcheck(event,'mnt-folder-header')){
		event.target.style.background = 'rgb(124,255,192)'
		event.target.classList.add('mnt-selected')
	}else if(mntcheck(event,'mnt-folder-content')){
		event.target.classList.add('mnt-selected')
	}
}
// Side:	Monitored group collapse and expand
const mntfold = ()=>{
	document.body.addEventListener('click',(event)=>{
		const isHeader = mntcheck(event,'mnt-folder-header')
		const folder = event.target.parentNode
		const content = event.target.nextElementSibling
		let subLen = 0
		if(isHeader){
			
			const isExpand = content.classList.contains('mnt-expanding')
			
			content.classList.toggle('mnt-expanding')
			const mainFolder = event.target.closest('.mnt-mainfolder')
			const mainContent = mainFolder.children[1]
			const baseLen = mainContent.childElementCount*21 + 31			
			const subGroup = mainContent.querySelectorAll('.mnt-expanding')
	
			if(subGroup){
				for(let i=0;i<subGroup.length;i++){
					subLen = subLen + subGroup[i].childElementCount*21 + Boolean(subGroup[i]) * 31 
				}
			}
			const mainLen = baseLen + subLen
			const isMain = mainFolder == folder
			if(!isMain){
				mainContent.style.height = mainLen + 'px'
			}
			if(isExpand){
				content.style.height = ''
			}else{
				content.style.height = content.childElementCount*21 + 31 +'px'
			}	
		}		
	})
}
// Side:	Monitored group span adjustment
const mntspan = (content) =>{
	const isExpand = content.classList.contains('mnt-expanding')
	if(isExpand){
		content.style.height = content.childElementCount*21 + 31 + 'px'
	}else{
		content.style.height = ''
	}
	
}
// Side:	The Style of Monitored system
const mntstyle = (target)=>{
	
	for(let i=0;i<target.length;i++){
		const el = target[i]
		el.addEventListener('mouseenter',(event)=>{
			const header = event.currentTarget.querySelector('.mnt-folder-header')
			const content = event.currentTarget.querySelector('.mnt-folder-content')
			const isDropzone = mntcheck(event,'mnt-dropzone',true)
			if(isDropzone){
				header.style.background = 'rgb(124,255,192)'
				content.style.background = 'rgb(235,255,251)'
			}else{
				header.style.background = 'rgb(255,174,189)'
				content.style.background = 'rgb(255,245,247)'
			}
		})
		el.addEventListener('mouseleave',(event)=>{
			const header = event.currentTarget.querySelector('.mnt-folder-header')
			const content = event.currentTarget.querySelector('.mnt-folder-content')
			header.style.background = ''
			content.style.background = ''
		})
	}
}
// Side: 	Rename main function
let oldname = 0
const mntrename = ()=>{
	let newname = 0
	const mainfunc = async()=>{
		// Check if contains reserved or illegal characters
		const censorCheck = (name)=>{
			//const restriction = /[`!@$%^&*+\=\[\]{};':"\\|,<>\/?~]/
			//return restriction.test(name)
			const censorArr = [
				'`',`'`,'@','!','$',
				'%','^','&','*','\\',
				'+','=','[',']','{',
				'}','/','"',';'
				]
			let isIllegal = false
			for(let i=0;i<censorArr.length;i++){
				isIllegal = name.indexOf(censorArr[i])
				if(isIllegal+1){
					return true
				}
			}
			return false
		}
		const isBanned = censorCheck(newname)
		if(newname.startsWith('&nbsp')){
			const mnterror = await window.mnt.error('mntrename-prefix')
		}else if(newname[0]==' '){
			if(!newname.trim().length){
				const mnterror = await window.mnt.error('mntrename-empty')
			}else{
				const mnterror = await window.mnt.error('mntrename-prefix')
			}
		}else if(isBanned){
			const mnterror = await window.mnt.error('mntrename-censor')
		}else{
			const isReady = await window.mnt.rename(oldname,newname)
			if(isReady){
				document.querySelector('.mnt-editing').classList.remove('mnt-editing')
				mntgroup()
				mntmenuAddition('create','movemenu')
				const oldmodName = `mnt-usergroup-` + mntreplace(oldname)
				const newmodName = `mnt-usergroup-` + mntreplace(newname)
				const oldclass = document.getElementsByClassName(mntreplace(oldmodName))
				for(var i=0;i<oldclass.length;i++){
					const e = oldclass[i]
					e.children[0].innerHTML = newname
				}
				
			}
		}	
	}
	document.addEventListener('click',(event)=>{
		const target = document.querySelector('.mnt-editing')
		const isInside = event.target == target
		if(target){
			if(!isInside){
				newname = target.innerHTML
				mainfunc()
			}			
		}
	})
	document.addEventListener('keydown',(event)=>{
		let funcArea
		try{
			funcArea = event.target.closest('.function-section')
		}catch(err){
			funcArea = false
		}
		const isMNT = funcArea.id =='mnt'
		if(isMNT){
			const isEditable = event.target.contentEditable == 'true'	
			event.target.classList.add('mnt-editing')
			if(isEditable){
				newname = event.target.innerHTML
				const isMonitored= mntcheck(event,'mnt-folder-header')
				if(isMonitored){
					if(event.which==13){
						event.preventDefault()
						mainfunc()
					}
				}
			}
		}		
		
	})
}
// Side:	Monitored group loader
const mntgroupwrite = async(target,isMainExec=true) =>{
	const isArr = target.constructor == Array
	if(!isArr){
		target=[target]
	}else{
		target = extUniq(target)
	}
	for(var a=0;a<target.length;a++){
		const isAll = target[a].id == 'mnt-main'
		if(isMainExec){		
			if(isAll){
				mntmain()
				continue
			}
		}else if(isAll){
			continue
		}
		/*
		const isAll = target[a].id == 'mnt-main'
		if(isAll){
			mntmain()
			continue
		}*/
		const header = target[a].children[0]
		const updateDiv = target[a].children[1]
		let [groupset,[idset,dataset]] = await window.mnt.load(header.innerHTML)
		if(!idset){
			idset = []
			dataset=[]
		}
		const mntdata = []
		const groups = []
		for(var i=0;i<groupset.length;i++){
			//const modName = mntreplace(groupset[i][1])
			const modName = groupset[i][0]
			const id = `'mnt-` + header.innerHTML + `-group-` + i + `'`
			const subheader = `<p class='mnt-folder-header'>` + groupset[i][1] + `</p>`
			const subcontent= `<div class='mnt-folder-content'></div>`
			const uniqClass = `mnt-usergroup-` + modName
			const subfolder = `<div id=` + id 
				+ ` class='mnt-folder mnt-dropzone ` + uniqClass + ` mnt-subfolder' draggable = 'true'>` 
				+ subheader + subcontent + `</div>`
			groups[i] = subfolder
		}
		for(var i=0;i<dataset.length;i++){
			const id = `id='mnt-` + header.innerHTML + `-data-` + i + `'`
			const uniqClass = 'mnt-data-' + idset[i]
			mntdata[i] = `<p ` + id+ ` class='mnt-data ` + uniqClass +`' draggable='true'>` + dataset[i] + `</p>`
		}
		groups.push.apply(groups,mntdata)
		updateDiv.innerHTML = groups.join('')
		mntspan(updateDiv)
	}

}
// Side:	Load data in monitored groups 
const mntgroupload = ()=>{
	document.body.addEventListener('click',async(event)=>{
		const isAll = event.target.innerHTML == 'All'
		const isEditable = mntcheck(event,'mnt-editing')
		const operator = isAll + isEditable
		if(mntcheck(event,'mnt-folder-header')&&!operator){
			const group = event.target.closest('.mnt-folder')
			if(group.classList.contains('mnt-folder')){
				const content = group.children[1]
				if(!content.innerHTML){
					mntgroupwrite(group)
				}
			}
		}	
	})
}
// Side:	Cancel current actions for contextmenu and drag function
const mntcancel = (event)=>{
	event.preventDefault()
	event.stopPropagation()
	return false
}
// Side:	Function of monitored data
const mntfunc = (target)=>{
	// Data function
	for(let i=0;i<target.length;i++){
		// Jump to monitored path
		const el = target[i]	
		el.addEventListener('dblclick',(event)=>{
			if(mntcheck(event,'mnt-data')){
				floorNum = 'fs-floor-0'
				fsfunc(event.target.innerHTML)
			}		
		})
		// Drag
		
		el.addEventListener('dragstart',(event)=>{
			//event.dataTransfer.setData('text/plain',event.target.id)
			const isHeader = event.target.classList.contains('mnt-folder-header')
			if(isHeader){
				const folder = event.target.parentNode.classList.contains('mnt-folder')
				folder.classList.add('mnt-selected-drag')
			}else{
				event.target.classList.add('mnt-selected-drag')
			}
			
		})
		el.addEventListener('dragend',(event)=>{
			event.target.style.background = ''
			mntcancel(event)
		})
		// Style
		el.addEventListener('mousedown',(event)=>{
			mntselected(event)		
		})
		// Folder Function
			// Drop Folder
		let counter = isExpand = false		
		if(el.classList.contains('mnt-dropzone')){
			el.addEventListener('dragover',(event)=>{
				mntcancel(event)
			})
			el.addEventListener('drop',async(event)=>{
				mntcancel(event)					
				
				const dropFolder = event.target.closest('.mnt-folder')
				const dropHeader = dropFolder.children[0].innerHTML
				const dropContent= dropFolder.children[1]
				let dropid = mntclass(dropFolder)[0]
				if(dropid == 'Shortcut'){
					dropid = await window.mnt.query(['id','Members','name',dropHeader])
				}
				const dragArr = document.querySelectorAll('.mnt-selected-drag')
				const checkArr = []
				const parentArr = []
				const dataArr = []
				const dataParentArr = []
				const groupArr = []
				const groupParentArr = []
				const groupNodeArr = []
				const groupChildArr= []
				const failArr = []
				let n = 0
				let g = 0
				let d = 0
				// Drop conditions check
				for(var i=0;i<dragArr.length;i++){
					const data = dragArr[i]
					let header
					const isGroup = data.classList.contains('mnt-subfolder')
					data.classList.remove('mnt-selected-drag')
					if(isGroup){
						header = data.children[0].innerHTML
					}else{
						header = data.innerHTML
					}
					const group  = data.parentNode.closest('.mnt-folder')
					const groupName = group.children[0].innerHTML
					const isDropable= dropFolder.classList.contains('fixed-content')
					if(!isDropable){
						const isFolderOnly = group.classList.contains('folder-only')
						if(isFolderOnly){							
							if(!isGroup){
								console.log('No monitored data in this area')
								continue
							}
						}
						checkArr[n] = data
						if(isGroup){
							groupArr[g] = header
							groupParentArr[g] = groupName
							groupChildArr[g++]= data
							
							//mntclass(dropFolder)
							//mntclass(data)
							
						}else{
							dataArr[d] = header
							dataParentArr[d++] = groupName
						}
						parentArr[n++]= groupName
					}
					else{
						console.log('No drop in this area')
					}
				}
				// Append and remove function
				const nameArr = groupArr.concat(dataArr)
				const tempDataArr = [...nameArr].fill(dropid)
				const isAdd = await window.mnt.update(tempDataArr,nameArr)
				//const isAdd = await window.mnt.update([dropHeader],nameArr)
				/*if(isAdd){						
					const isRemoveGroup = await window.mnt.remove(groupParentArr,groupArr,true)
					const isRemove = await window.mnt.remove(dataParentArr,dataArr)
				}*/
				// Update function
				
				
				/*
				const dropid = event.dataTransfer.getData('text/plain')
				const dropdata = document.getElementById(dropid)
				const isClone = dropdata.parentNode.parentNode.classList.contains('mnt-dropzone')
				const folder = event.target.closest('.mnt-folder')			
				const content = folder.children[1]
				const header = folder.children[0]
				// Monitored group update
				const dropzoneid = event.currentTarget.id
				const dropzone = event.currentTarget
				if(dropzoneid == dropid){
					mntspan(content)
					return
				}
				if(header.innerHTML!=='Groups'){
					const existArr = await window.mnt.update([header.innerHTML],[dropdata.innerHTML])
					for(var i=0;i<existArr.length;i++){
						const isExist = existArr[i]
						if(!isClone && isExist){									
							const dropclone = dropdata.cloneNode(true)
							dropdata.parentNode.insertBefore(dropclone,dropdata.nextSibling)					
						}
						if(isExist){
							const isFolderOnly = folder.classList.contains('folder-only')						
							if(isFolderOnly){
								const isFolder = dropdata.classList.contains('mnt-folder')
								if(isFolder){
									mntgroupwrite(dropzone)
								}
							}else{
								mntgroupwrite(dropzone)
							}				
						}
						mntspan(content)
					}					
				}
				*/
			})
		}
	}	
}
// Side:	Handle drag-related function
const mntdragfunc = ()=>{
	document.addEventListener('mntdrag:enter',(event)=>{
		mntcancel(event)
		
		const contentList = []
		const folder = event.target.closest('.mnt-folder')
		//console.log('enter:' + folder.id)
		const content = folder.children[1]
		let node = content
		while(!node.classList.contains('function-section')){
			contentList.push(node)
			node = node.parentNode.parentNode
		}
		for(var i=0;i<contentList.length;i++){
			const c = contentList[i]
			c.style.height = c.clientHeight+100+'px'
		}
	})
	document.addEventListener('mntdrag:leave',(event)=>{
		mntcancel(event)
		const contentList = []
		const folder = event.target.closest('.mnt-folder')
		//console.log('leave:' + folder.id)
		const content = folder.children[1]
		let node = content
		while(!node.classList.contains('function-section')){
			contentList.push(node)
			node = node.parentNode.parentNode
		}
		for(var i=0;i<contentList.length;i++){
			const c = contentList[i]
			c.style.height = c.clientHeight-100+'px'
		}
		mntspan(content)
	})
}
// Side:	Contextmenu function
const mntmenufunc = async()=>{
	// Data
		// New:							Create new monitored group
	document.getElementById('mnt-cm-new').addEventListener('mousedown',async()=>{
		let group = 0
		try{
			group = document.querySelector('.mnt-selected').closest('.mnt-folder')
		}catch(err){
			group = document.getElementById('mnt-group')
		}
		const header = group.children[0].innerHTML
		const isGroups = group.id == 'mnt-group'
		const newGroup = await window.mnt.create()		
		if(newGroup){
			if(!isGroups){
				const isCreate = await window.mnt.update([header],[newGroup])
				if(isCreate){
					mntgroupwrite(group,false)
				}
			}	
			mntgroup(header,newGroup)
			mntmenuAddition('create','movemenu')
		}
	})
		// Remove(Delete this record):	Delete all tags and meta and remove monitored status of this member
	document.getElementById('mnt-removemenu-delete').addEventListener('mousedown',async()=>{
		const selected = uxSelectAll('mnt')
		const isFinished = await window.mnt.deleteM(selected['Folder'],selected['Data'])
		if(isFinished){
			mntgroupwrite(selected['Node'])
			//mntmain()
		}	
	})
		// Remove(Remove from group):	Remove member from this monitored group
	document.getElementById('mnt-removemenu-remove').addEventListener('mousedown',async()=>{		
		const selected = uxSelect('mnt')
		const [groupArr,dataArr,groupParent,dataParent] = mntsort(selected)
		console.log(groupArr)
		console.log(dataArr)
		console.log(groupParent)
		console.log(dataParent)
		let isRemoveGroup = false
		let isRemove = false
		/*
		if(groupArr.length){
			const tempArr = [...groupArr].fill(dropid)
			isRemoveGroup = await window.mnt.remove()
		}else{
			
		}*/
		/*
		const isRemove = await window.mnt.remove(selected['Folder'],selected['Data'])
		if(isRemove){
			mntgroupwrite(selected['Node'])
		}*/
	})
		// Remove(Remove grouping):		Remove member from all monitored groups
	document.getElementById('mnt-removemenu-ungroup').addEventListener('mousedown',async()=>{
		const selected = uxSelectAll('mnt')	
		const groupArr = await window.mnt.get(selected['Data'])
		//console.log(groupArr)
		const updateArr = []
		let n = 0
		for(let i=0;i<groupArr.length;i++){
			const group = mntreplace(groupArr[i])
			const folder = document.getElementsByClassName('mnt-usergroup-' + group)[0]
			const content = folder.children[1]
			const isExpand = content.innerHTML
			if(isExpand){
				updateArr[n++] = folder
			}
		}
		const isRemove = await window.mnt.remove(selected['Folder'],selected['Data'])
		if(isRemove){
			mntgroupwrite(updateArr)
		}
	})	
	// Header
		// Remove:						Delete this group
	document.getElementById('mnt-cm-groupdelete').addEventListener('mousedown',async()=>{
		const selected = uxSelect('mnt')
		const updateArr = await window.mnt.delete(selected['Data'])
		if(updateArr[0]){
			mntgroup()
			for(var i=0;i<updateArr.length;i++){
				const node = updateArr[i]
				if(node == 'Shortcut'){
					mntgroupwrite(document.getElementById('mnt-shortcut'))
				}else{
					const modName = mntreplace(node)
					const nodelist = document.getElementsByClassName(modName)
					if(nodelist[0]){
						mntgroupwrite(nodelist)						
					}				
				}
			}
			mntmenuAddition('create','movemenu')
		}
	})
		// Rename:						Rename this group
	document.getElementById('mnt-cm-grouprename').addEventListener('mousedown',async(event)=>{
		const group = document.querySelector('.mnt-selected')
		oldname = group.innerHTML
		group.contentEditable = 'true'
	})
}

// Side: Contextmenu addition
const mntmenuAddition = (cmda='all',cmdb)=>{
	const mode = []
	const cmdset= ['create','func']
	const menuset = ['movemenu']
	// General Modes
	mode['all'] = ()=>{
		for(var i=0;i<cmdset.length;i++){
			mode[cmdset[i]]('all')
		}
	}
	mode['create'] = (cmdb)=>{
		mode['movemenu'] = async()=>{
			const [,[idlist,groups]] = await window.mnt.load('Groups')
			const optionArr = []
			for(var i=0;i<groups.length;i++){
				const id = `'mnt-movemenu-` + groups[i] + `'`
				const text = 'to ' + groups[i]
				//const modName = mntreplace(groups[i][1])
				const modName = idlist[i]
				const option = `<p id=` + id + `class='mnt-dropmenu-option mnt-movemenu-addition'>` + text + `</p>`
				optionArr[i] = option
			}
			const addition = optionArr.join('')
			const updateDiv = document.getElementById('mnt-cm-movemenu')
			updateDiv.innerHTML = addition
		}
		mode['all'] = ()=>{
			for(var i=0;i<menuset.length;i++){
				mode[menuset[i]]()
			}
		}
		mode[cmdb]()
	}
	mode['func'] = (cmdb)=>{
		mode['movemenu'] = ()=>{
			document.body.addEventListener('click',async(event)=>{
				if(mntcheck(event,'mnt-movemenu-addition')){
					const id = event.target.id
					const name = id.substring(13)
					let target = document.getElementById('mnt-user-' + name)
					if(name == 'Shortcut'){
						target = document.getElementById('mnt-shortcut')
					}
					if(!target){
						target = document.getElementById('mnt-group-' + name)
					}
					let targetid = mntclass(target)[0]
					if(targetid == 'Shortcut'){
						const queryset = await window.mnt.query(['id','Members','name','Shortcut'])
						targetid = queryset[0] + ''
					}
					const selected = uxSelect('mnt')
					//const parentArr = [...selected['Data']].fill(targetid)
					//const groupArr = [...selected['Data']].fill(selected['Folderid'])
					//const isFinished = await window.mnt.update(parentArr,selected['Dataid'])	
					const [groupArr,dataArr] = mntsort(selected)
					if(groupArr[0]){
						console.log(targetid)
						const parentArr = [...groupArr].fill(targetid)
						
						const isFinished = await window.mnt.update(parentArr,groupArr,true)
						if(isFinished){							
							mntgroupwrite(target)
						}
					}
					if(dataArr[0]){
						//console.log(dataArr)
						const parentArr = [...dataArr].fill(name)
						const isFinished = await window.mnt.update(parentArr,selected['Data'])
						if(isFinished){
							mntgroupwrite(target)
						}
					}
					
					//mntgroupwrite(dataArr.flat())
					//let nodelist = []
					/*
					if(name == 'Shortcut'){
						nodelist = [document.getElementById('mnt-shortcut')]
					}else{
						const modName = mntreplace(name)
						nodelist = [...document.getElementsByClassName(modName)]
					}
					for(var i;i<nodelist.length;i++){
						console.log(nodelist[i])
						mntgroupwrite(nodelist[i])
					}*/
						
				}
			})
		}
		mode['all'] = ()=>{
			for(var i=0;i<menuset.length;i++){
				mode[menuset[i]]()
			}
		}
		mode[cmdb]()
	}
	mode[cmda](cmdb)
}
// Side:	Load all monitored group
const mntgroup = async(parent,child)=>{
	const mainfunc = async()=>{
		const updateDiv = document.getElementById('mnt-group-display')
		const [,[idlist,grouplist]] = await window.mnt.load('Groups')
		const mntdata = []
		const pos = grouplist.indexOf('Shortcut')
		grouplist.splice(pos,1)
		idlist.splice(pos,1)
		for(var i=0;i<grouplist.length;i++){
			//const modName = mntreplace(grouplist[i][1])
			const modName = idlist[i]
			const header = `<p class='mnt-folder-header'>` + grouplist[i] + `</p>`
			const content= `<div class='mnt-folder-content'></div>`
			const uniqClass = `mnt-usergroup-` + modName
			const folder = `<div id='mnt-user-` + grouplist[i]
				+ `' class='mnt-folder mnt-dropzone ` + uniqClass + ` mnt-subfolder' draggable='true'>` 
				+ header + content + `</div>`
			mntdata[i] = folder
		}
		updateDiv.innerHTML = mntdata.join('')
		const group = updateDiv.querySelectorAll('.mnt-subfolder')
		mntApplier(group)
		mntspan(updateDiv)
		return true	
	}
	mainfunc()	
}
// Main:	Load all monitored data
const mntmain = async()=>{
	const mntdata = []
	const updateDiv = document.getElementById('mnt-main-display')
	let [idset,mntset] = await window.mnt.main()
	if(!mntset){
		mntset = 0
	}
	for(var i=0;i<mntset.length;i++){
		const uniqClass = 'mnt-data-' + idset[i]
		const id = `id='mnt-main-data-` + i + `'`
		mntdata[i] = `<p ` + id+ ` class='mnt-data ` + uniqClass +`' draggable='true'>` + mntset[i] + `</p>`
	}
	updateDiv.innerHTML = mntdata.join('')
	mntspan(updateDiv)
	return true
}

// Side:		Load Shortcut data
const mntshortcut = () =>{
	const mntdata = []
	const mntshortcut = document.getElementById('mnt-shortcut')
	mntgroupwrite(mntshortcut,false)
	return true
}

// Side:		Initial page structure
const mntRender = async()=>{
	const isCreated = await window.mnt.build()
	if(isCreated){
		const mainStatus = mntmain()
		const groupStatus = mntgroup()
		const shortcutStatus = mntshortcut()
		if(mainStatus && shortcutStatus && groupStatus){
			return true
		}
	}
}
//Initailizer
const mntApplier = (target)=>{
	mntfunc(target)	
	mntstyle(target)
	
	for(var i=0;i<target.length;i++){
		if(target[i].classList.contains('mnt-dropzone')){
			new mntdrag(target[i])		
		}
	}	
}
const mntInit = ()=>{
	mntdragSetup()
	const isReady = mntRender()
	if(isReady){
		mntfold()
		mntrename()
		const mntfolder = document.querySelectorAll('.mnt-folder')
		mntdragfunc()
		mntmenufunc()
		mntmenuAddition()
		mntgroupload()
		mntApplier(mntfolder)
		
	}
	
	
}
mntInit()