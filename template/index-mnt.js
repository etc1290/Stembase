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
	if(isCurrent){
		return event.currentTarget.classList.contains(classname)
	}else{
		return event.target.classList.contains(classname)
	}
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
// Side: 	Rename function
let oldname = 0
const mntrename = ()=>{
	let newname = 0
	const mainfunc = async()=>{
		const isReady = await window.mnt.rename(oldname,newname)
		if(isReady){
			console.log(1)
			document.querySelector('.mnt-editing').classList.remove('mnt-editing')
			mntgroup()
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
	})
}
// Side:	Monitored group loader
const mntgroupwrite = async(target,isLoaded=true) =>{
	const header = target.children[0]
	const updateDiv = target.children[1]
	//const dataset = await window.mnt.load(header.innerHTML)
	const [groupset,dataset] = await window.mnt.load(header.innerHTML)
	const mntdata = []
	const groups = []
	for(var i=0;i<groupset.length;i++){
		const id = `id='mnt-` + header.innerHTML + `-group-` + i + `'`
		groups[i]=`<p ` + id + ` class='mnt-data' draggable='false'>` + groupset[i] + `</p>`
	}
	for(var i=0;i<dataset.length;i++){
		const id = `id='mnt-` + header.innerHTML + `-data-` + i + `'`
		mntdata[i] = `<p ` + id+ ` class='mnt-data' draggable='true'>` + dataset[i] + `</p>`
	}
	groups.push.apply(groups,mntdata)
	updateDiv.innerHTML = groups.join('')
	mntspan(updateDiv)
}
const mntcancel = (event)=>{
			event.preventDefault()
			//event.stopPropagation()
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
				console.log(1)
				const dropid = event.dataTransfer.getData('text/plain')
				const dropdata = document.getElementById(dropid)
				const isClone = dropdata.parentNode.parentNode.classList.contains('mnt-dropzone')
				const folder = event.target.closest('.mnt-folder')			
				const content = folder.children[1]
				const header = folder.children[0]
				
				// Monitored group update
				const dropzoneid = event.currentTarget.id
				let isExist = true
				if(header.innerHTML!=='Groups'){
					isExist = await window.mnt.update(header.innerHTML,dropdata.innerHTML)
				}
				if(!isClone && !isExist){
					console.log(278)
					const dropclone = dropdata.cloneNode(true)
					dropdata.parentNode.insertBefore(dropclone,dropdata.nextSibling)
				}
				if(!isExist){
					console.log(283)
					const isFolderOnly = folder.classList.contains('folder-only')						
					if(isFolderOnly){
						console.log(286)
						const isFolder = dropdata.classList.contains('mnt-folder')
						if(isFolder){
							console.log(289)
							content.appenchild(dropdata)
							mntspan(content)
						}
					}else{
						//content.appendChild(dropdata)
						console.log(event.currentTarget.id)
						mntgroupwrite(event.currentTarget.id)
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
		//mntcancel(event)
		const contentList = []
		const folder = event.target.closest('.mnt-folder')
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
		//mntcancel(event)
		const contentList = []
		const folder = event.target.closest('.mnt-folder')
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
				const isCreate = await window.mnt.update(header,newGroup)
				if(isCreate){
					mntgroupwrite(group,false)
				}
			}	
			mntgroup(header,newGroup)
		}
	})
		// Move(Add to Shortcut):		Add this member to Shortcut
	
	document.getElementById('mnt-movemenu-shortcut').addEventListener('mousedown',async()=>{
		console.log('Add to shortcut')
		/*
		const selected = uxSelect('mnt')
		let isFinished = false
		for(var i=0;i<selected['Data'].length;i++){
			isFinished = await window.mnt.update('Shortcut',selected['Data'][i])
		}	*/
		
	})
		// Remove(Delete this record):	Delete all tags and meta and remove monitored status of this member
	document.getElementById('mnt-removemenu-delete').addEventListener('mousedown',()=>{
		console.log('delete function')
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
		const updateArr = await window.mnt.delete(selected['Folder'],selected['Data'])
		if(updateArr[0]){
			mntgroup()
			for(var i=0;i<updateArr.length;i++){
				mntgroupwrite(document.getElementById(updateArr[i]),false)
			}
		}
	})
		// Rename:						Rename this group
	document.getElementById('mnt-cm-grouprename').addEventListener('mousedown',async(event)=>{
		const group = document.querySelector('.mnt-selected')
		oldname = group.innerHTML
		group.contentEditable = 'true'
	})
}

// Side:	Load all monitored group
const mntgroup = async(parent,child)=>{
	const mainfunc = async()=>{
		const updateDiv = document.getElementById('mnt-group-display')
		const [,grouplist] = await window.mnt.load('Groups')
		const mntdata = []
		for(var i=0;i<grouplist.length;i++){
			const header = `<p class='mnt-folder-header'>` + grouplist[i] + `</p>`
			const content= `<div class='mnt-folder-content'></div>`
			const folder = `<div id='mnt-user-` + grouplist[i] + `' class='mnt-folder mnt-dropzone mnt-subfolder'>` + header + content + `</div>`
			mntdata[i] = folder
		}
		updateDiv.innerHTML = mntdata.join('')
		const group = updateDiv.querySelectorAll('.mnt-subfolder')
		mntApplier(group)
		mntspan(updateDiv)
		return true	
	}
	if(parent == 'Shortcut'){
		parent = 'Groups'
	}
	if(parent){
		const isAppend = await window.mnt.group(parent,child)
		if(isAppend){
			mainfunc()
		}		
	}else{
		mainfunc()
	}
		
}
// Main:	Load all monitored data
const mntmain = async()=>{
	const mntdata = []
	const updateDiv = document.getElementById('mnt-main-display')
	let mntset = await window.mnt.main()
	if(mntset == undefined){
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
const mntbuild = ()=>{
	const mainStatus = mntmain()
	const groupStatus = mntgroup()
	const shortcutStatus = mntshortcut()
	if(mainStatus && shortcutStatus && groupStatus){
		return true
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
	const isReady = mntbuild()
	if(isReady){
		mntfold()
		mntrename()
		const mntfolder = document.querySelectorAll('.mnt-folder')
		mntdragfunc()
		mntmenufunc()
		mntApplier(mntfolder)
		
	}
	
	
}
mntInit()