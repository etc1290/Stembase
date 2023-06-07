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
			const restriction = /[`9!@$%^&*+\=\[\]{};':"\\|,<>\/?~]/
			return restriction.test(name)
		}
		const isBanned = censorCheck(newname)
		if(isBanned){
			const mnterror = await window.mnt.error('mntrename-censor')
		}else if(!newname.trim().length){
			const mnterror = await window.mnt.error('mntrename-empty')
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
					e.classList.remove(oldmodName)
					e.classList.add(newmodName)
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
const mntgroupwrite = async(target,isLoaded=true) =>{
	const header = target.children[0]
	const updateDiv = target.children[1]
	const [groupset,dataset] = await window.mnt.load(header.innerHTML)
	//console.log(groupset)
	//console.log(dataset)
	const mntdata = []
	const groups = []
	for(var i=0;i<groupset.length;i++){
		const modName = mntreplace(groupset[i])
		const id = `'mnt-` + header.innerHTML + `-group-` + i + `'`
		const subheader = `<p class='mnt-folder-header mnt-data'>` + groupset[i] + `</p>`
		const subcontent= `<div class='mnt-folder-content'></div>`
		const uniqClass = `mnt-usergroup-` + modName
		const subfolder = `<div id=` + id 
			+ ` class='mnt-folder mnt-dropzone ` + uniqClass + ` mnt-subfolder' draggable = 'true'>` 
			+ subheader + subcontent + `</div>`
		groups[i] = subfolder
	}
	for(var i=0;i<dataset.length;i++){
		const id = `id='mnt-` + header.innerHTML + `-data-` + i + `'`
		mntdata[i] = `<p ` + id+ ` class='mnt-data' draggable='true'>` + dataset[i] + `</p>`
	}
	groups.push.apply(groups,mntdata)
	updateDiv.innerHTML = groups.join('')
	mntspan(updateDiv)
}
// Side:	Load data in monitored groups 
const mntgroupload = ()=>{
	document.body.addEventListener('click',async(event)=>{
		const isAll = event.target.innerHTML == 'All'
		if(mntcheck(event,'mnt-folder-header')&&!isAll){
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
			event.dataTransfer.setData('text/plain',event.target.id)
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
						if(!isClone && !isExist){									
							const dropclone = dropdata.cloneNode(true)
							dropdata.parentNode.insertBefore(dropclone,dropdata.nextSibling)					
						}
						if(!isExist){
							const isFolderOnly = folder.classList.contains('folder-only')						
							if(isFolderOnly){
								const isFolder = dropdata.classList.contains('mnt-folder')
								if(isFolder){
									mntgroupwrite(dropzone)
								}
							}else{
								console.log(dropzoneid)
								mntgroupwrite(dropzone)
							}				
						}
						mntspan(content)
					}					
				}
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
		console.log('enter:' + folder.id)
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
		console.log('leave:' + folder.id)
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
		console.log('delete function')
		const selected = uxSelect('mnt')
		const updateArr = await window.mnt.remove(selected['Folder'],selected['Data'])
		
	})
		// Remove(Remove from group):	Remove member from this monitored group
	document.getElementById('mnt-removemenu-remove').addEventListener('mousedown',async()=>{		
		const selected = uxSelect('mnt')
		const isRemove = await window.mnt.remove(selected['Folder'],selected['Data'])
		if(isRemove){
			for(var i=0;i<selected['Node'].length;i++){
				mntgroupwrite(document.getElementById(selected['Node'][i]),false)
			}
		}
	})
		// Remove(Remove grouping):		Remove member from all monitored groups
	document.getElementById('mnt-removemenu-ungroup').addEventListener('mousedown',async()=>{
		const dataset = document.querySelectorAll('.mnt-selected')
		const data = []
		for(let i=0;i<dataset.length;i++){
			if(!dataset[i].classList.contains('.mnt-mainfolder')){
				data[i] = dataset[i].innerHTML
			}
		}
		const group = dataset[0].parentNode.parentNode
		if(data[0]){
			const isRemove = await window.mnt.remove(group.innerHTML,data)
			if(isRemove){
				mntgroupwrite(group,false)
			}
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
			const [,groups] = await window.mnt.load('Groups')
			const optionArr = []
			for(var i=0;i<groups.length;i++){
				const id = `'mnt-movemenu-` + groups[i] + `'`
				const text = 'to ' + groups[i]
				const modName = mntreplace(groups[i])
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
					const selected = uxSelect('mnt')
					const groupArr = [...selected['Data']].fill(name)
					const isFinished = await window.mnt.update(groupArr,selected['Data'])	
					let nodelist = []
					if(name == 'Shortcut'){
						nodelist = [document.getElementById('mnt-shortcut')]
					}else{
						const modName = mntreplace(name)
						nodelist = [...document.getElementsByClassName(modName)]
					}
					for(var i;i<nodelist.length;i++){
						console.log(nodelist[i])
						mntgroupwrite(nodelist[i])
					}					
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
		const [,grouplist] = await window.mnt.load('Groups')
		const mntdata = []
		for(var i=0;i<grouplist.length;i++){
			const modName = mntreplace(grouplist[i])
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
	let mntset = await window.mnt.main()
	if(!mntset){
		mntset = 0
	}
	for(var i=0;i<mntset.length;i++){
		const id = `id='mnt-main-data-` + i + `'`
		mntdata[i] = `<p ` + id+ ` class='mnt-data' draggable='true'>` + mntset[i] + `</p>`
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