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
	if(mntcheck(event,'mnt-data')){
		event.target.style.background = 'rgb(124,255,192)'
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

// Side:		Monitored group loader
const mntgroupwrite = async(target,isLoaded=true) =>{
	if(isLoaded){
		isLoaded = target.querySelector('.mnt-data')
	}
	if(!isLoaded){
		const updateDiv = target.querySelector('.mnt-folder-content')
		const header = target.querySelector('.mnt-folder-header')
		const mntset = await window.mnt.load(header.innerHTML)
		let mntdata = []
		for(var i=0;i<mntset.length;i++){
			const id = `id='mnt-` + header.innerHTML + `-data-` + i + `'`
			mntdata[i] = `<p ` + id+ ` class='mnt-data' draggable='true'>` + mntset[i] + `</p>`
		}
		updateDiv.innerHTML = mntdata.join('')
		mntspan(updateDiv)
	}
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
		})
		// Style
		el.addEventListener('mousedown',(event)=>{
			mntselected(event)		
		})
		// Folder Function
			// Drop Folder
		let counter = isExpand = false
		const mntcancel = (event)=>{
			event.preventDefault()
			event.stopPropagation()
			return false
		}
		if(el.classList.contains('mnt-dropzone')){
			el.addEventListener('drop',async(event)=>{
				mntcancel(event)
				const dropid = event.dataTransfer.getData('text/plain')
				const dropdata = document.getElementById(dropid)
				const isClone = dropdata.parentNode.parentNode.classList.contains('mnt-dropzone')
				
				const content = event.currentTarget.querySelector('.mnt-folder-content')
				
				// Monitored group update
				const dropzoneid = event.currentTarget.id
				const header = document.querySelector('#' + dropzoneid + ' .mnt-folder-header')				
				const isExist = await window.mnt.update(header.innerHTML,dropdata.innerHTML)
				if(!isClone && !isExist){
					const dropclone = dropdata.cloneNode(true)
					dropdata.parentNode.insertBefore(dropclone,dropdata.nextSibling)
				}
				if(!isExist){
					content.appendChild(dropdata)
					mntspan(content)
				}
			})
			el.addEventListener('dragenter',mntcancel)
			el.addEventListener('dragover',mntcancel)
			el.addEventListener('dragenter',(event)=>{
				const content = event.currentTarget.querySelector('.mnt-folder-content')
				if(!counter){
					content.style.height = (content.clientHeight + 100) + 'px'
					counter = 0
				}
				counter++
			})
		
			el.addEventListener('dragleave',(event)=>{
				counter--
				const content = event.currentTarget.querySelector('.mnt-folder-content')
				if(counter==0){
				
					mntspan(content)
					counter = false
				}
			})
			el.addEventListener('drop',(event)=>{
				counter = 0
				const content = event.currentTarget.querySelector('.mnt-folder-content')
				mntspan(content)
			})
		}
	}	
}
// Side:	Contextmenu function
const mntmenufunc = async()=>{
	// Create new monitored group
	document.getElementById('mnt-cm-new').addEventListener('mousedown',async()=>{
		const isCreate = await window.mnt.create()		
		if(isCreate){
			console.log('active')			
			//const isReady = await mntgroupwrite(group,false)
		}
	})
	// Add this member to Shortcut
	document.getElementById('mnt-movemenu-shortcut').addEventListener('mousedown',()=>{
		console.log('add this to shorcut')
	})
	// Delete all tags and meta and remove monitored status of this member
	document.getElementById('mnt-removemenu-delete').addEventListener('mousedown',()=>{
		console.log('delete function')
	})
	// Remove member from this monitored group
	document.getElementById('mnt-removemenu-remove').addEventListener('mousedown',async()=>{
		const dataset = document.querySelectorAll('.mnt-selected')
		const data = []
		for(var i=0;i<dataset.length;i++){
			data[i] = dataset[i].innerHTML
		}
		const content = dataset[0].parentNode
		const group = dataset[0].parentNode.parentNode
		const folder = group.querySelector('.mnt-folder-header')
		const isRemove = await window.mnt.remove(folder.innerHTML,data)	
		if(isRemove){
			const isReady = await mntgroupwrite(group,false)
		}
	})
	
}

// Side:	Load all monitored group
const mntgroup = async()=>{
	
	const updateDiv = document.getElementById('mnt-group-display')
	const grouplist = await window.mnt.group()
	const mntdata = []
	for(var i=0;i<grouplist.length;i++){
		const header = `<p class='mnt-folder-header'>` + grouplist[i] + `</p>`
		const content= `<div class='mnt-folder-content'></div>`
		const folder = `<div class='mnt-folder mnt-dropzone'>` + header + content + `</div>`
		mntdata[i] = folder
	}
	updateDiv.innerHTML = mntdata.join('')
	mntspan(updateDiv)
	const group = updateDiv.querySelectorAll('.mnt-subfolder')
	mntApplier(group)
	return true
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

//Side:		Load Shortcut data
const mntshortcut = () =>{
	const mntdata = []
	const mntshortcut = document.getElementById('mnt-shortcut')
	mntgroupwrite(mntshortcut)
	return true
}
//Side:		Initial page structure
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
	//mntmenu(target)
}
const mntInit = ()=>{
	const isReady = mntbuild()
	if(isReady){
		mntfold()
		const mntfolder = document.querySelectorAll('.mnt-folder')
		mntApplier(mntfolder)
		mntmenufunc()
	}
	
	
}
mntInit()