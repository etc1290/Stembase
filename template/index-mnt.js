
// Side:	Monitored group collapse and expand
const mntfold = (target)=>{
	for(let i=0;i<target.length;i++){
		const el = target[i]
		el.addEventListener('click',(event)=>{
			const header = event.currentTarget.querySelector('.mnt-folder-header')
			const content = event.currentTarget.querySelector('.mnt-folder-content')
			const isExpand = content.classList.contains('mnt-expanding')
			const isHeader = event.target == header
			if(isHeader){
				if(isExpand){
					content.style.height = ''
					content.classList.remove('mnt-expanding')
				}else{
					content.style.height = content.childElementCount*21 + 31 + 'px'
					content.classList.add('mnt-expanding')
				}
			}
		})
	}

}
// Side:	The Style of Monitored system
const mntstyle = (target)=>{
	const mntcheck = (event)=>{
		return event.currentTarget.classList.contains('mnt-dropzone')
	}
	for(let i=0;i<target.length;i++){
		const el = target[i]
		el.addEventListener('mouseenter',(event)=>{
			const header = event.currentTarget.querySelector('.mnt-folder-header')
			const content = event.currentTarget.querySelector('.mnt-folder-content')
			const isDropzone = mntcheck(event)
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

// Side:	Context menu of monitored data
const mntmenu = (target)=>{
	// Positioner
	const contextMenu = document.getElementById('mnt-cm')
	const menuPositioner = (event,isSub = false)=>{
		
		const winX = document.body.clientWidth
		const winY = document.body.clientHeight
		const menuX = contextMenu.offsetWidth
		const menuY = contextMenu.offsetHeight
		const secMargin = 5
		let posLeft = posTop = overflowLimX = overflowLimY = ''
		// Submenu
		if(isSub){
			const menuName = event.currentTarget.id + 'menu'
			const dropMenu = document.getElementById(menuName)
			const subX = 150
			const subY = dropMenu.childElementCount*31
			const upAdjustment = 30
			const downAdjustment = 10
			const cmPos = contextMenu.getBoundingClientRect()
			const optPos = event.currentTarget.getBoundingClientRect()
			const optionLeft = cmPos.left
			const optionRight = cmPos.right
			const optionTop = optPos.top
			const optionBottom = optPos.bottom
			overflowLimX = optionRight + subX + secMargin
			overflowLimY = optionTop + subY + secMargin
			if(overflowLimX >= winX && overflowLimY >= winY){
				posLeft = optionLeft - subX + 'px'
				posTop = optionBottom - subY + downAdjustment + 'px'
				
			}else if(overflowLimX >= winX){
				posLeft = optionLeft - subX + 'px'
				posTop = optionTop + upAdjustment + 'px'
				
			}else if(overflowLimY >= winY){
				posLeft = optionRight + 'px'
				posTop = optionBottom - subY + downAdjustment + 'px'
				
			}else{
				posLeft = optionRight + 'px'
				posTop = optionTop + upAdjustment + 'px'
				
			}
		// Mainmenu
		}else{
			const {clientX : mouseX, clientY: mouseY} = event
			overflowLimX = mouseX + menuX + secMargin
			overflowLimY = mouseY + menuY + secMargin
			if(overflowLimX >= winX && overflowLimY >=winY){
				posLeft = mouseX - menuX - secMargin + 'px'
				posTop = mouseY - menuY - secMargin + 'px'
			}else if(overflowLimX >= winX){
				posLeft = mouseX - menuX - secMargin + 'px'
				posTop = mouseY + secMargin + 'px'
			}else if(overflowLimY >= winY){
				posLeft = mouseX + secMargin + 'px'
				posTop = mouseY - menuY - secMargin + 'px'
			}else{
				posLeft = mouseX + secMargin + 'px'
				posTop = mouseY + secMargin + 'px'
				
			}
		}	
		return [posLeft,posTop]
	}
	// Main menu
	for(let i=0;i<target.length;i++){
		const el=target[i]
		el.addEventListener('contextmenu',(event)=>{
			event.preventDefault()
			const prevMenu = document.querySelector('.mnt-cm-dropmenu.visible')
			if(prevMenu){
				prevMenu.classList.remove('visible')
			}
			const [posLeft,posTop] = menuPositioner(event)
			contextMenu.style.left = posLeft
			contextMenu.style.top = posTop
			contextMenu.classList.add('visible')
		})
	}
	// Side menu
	const submenu = document.querySelectorAll('.mnt-cm-submenu')
	const dropmenu= document.querySelectorAll('.mnt-cm-dropmenu')
	for(let i=0;i<submenu.length;i++){
		const el = submenu[i]
		const subel = dropmenu[i]
		el.addEventListener('click',(event)=>{
			const prevMenu = document.querySelector('.mnt-cm-dropmenu.visible')
			if(prevMenu){
				prevMenu.classList.remove('visible')
			}
			const [posLeft,posTop] = menuPositioner(event,true)
			subel.style.left = posLeft
			subel.style.top = posTop
			subel.classList.add('visible')
		})
	}
	// test: Should be removed after all context related function is completed
	/*
	const page = document.body
	page.addEventListener('contextmenu',(event)=>{
		event.preventDefault()
		const prevMenu = document.querySelector('.mnt-cm-dropmenu.visible')
		if(prevMenu){
			prevMenu.classList.remove('visible')
		}
		const [posLeft,posTop] = menuPositioner(event)
		contextMenu.style.left = posLeft
		contextMenu.style.top = posTop
		contextMenu.classList.add('visible')
	})*/
	
}	
// Side:	Function of monitored data
const mntfunc = (target)=>{
	// Data function
	const mntcheck = (event)=>{
		return event.currentTarget.classList.contains('mnt-dropzone')		
	}
	const mntcontentCheck = (event) =>{
		return event.target.classList.contains('mnt-data')
	}
	for(let i=0;i<target.length;i++){
		// Jump to monitored path
		const el = target[i]
		el.addEventListener('dblclick',(event)=>{
			
			if(mntcontentCheck(event)){
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
			if(mntcheck(event)){
				const mntselected = document.querySelectorAll('.mnt-selected')
				for(let i=0;i<mntselected.length;i++){
					mntselected[i].classList.remove('mnt-selected')
					mntselected[i].style.background = ''
				}
				if(mntcontentCheck(event)){
					event.target.style.background = 'rgb(124,255,192)'
					event.target.classList.add('mnt-selected')
				}			
			}		
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
				if(!isClone){
					const dropclone = dropdata.cloneNode(true)
					dropdata.parentNode.insertBefore(dropclone,dropdata.nextSibling)
				}
				const content = event.currentTarget.querySelector('.mnt-folder-content')
				content.appendChild(dropdata)
				// Monitored group update
				const dropzoneid = event.currentTarget.id
				const header = document.querySelector('#' + dropzoneid + ' .mnt-folder-header')				
				const mntupdate = await window.mnt.update(header.innerHTML,dropdata.innerHTML)
				console.log(mntupdate)
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
			const mntexpand = (content)=>{
				if(content.classList.contains('mnt-expanding')){
					content.style.height = content.childElementCount*21 + 31 + 'px'
				}else{
					content.style.height = ''
				}
			}
			el.addEventListener('dragleave',(event)=>{
				counter--
				const content = event.currentTarget.querySelector('.mnt-folder-content')
				if(counter==0){
					mntexpand(content)
					counter = false
				}
			})
			el.addEventListener('drop',(event)=>{
				counter = 0
				const content = event.currentTarget.querySelector('.mnt-folder-content')
				mntexpand(content)
			})
		}
	}	
}
// Side:	Contextmenu function
const mntmenufunc = async()=>{
	// Create new monitored group
	document.getElementById('mnt-cm-new').addEventListener('click',()=>{
		console.log('create folders')
	})
	// Add this member to Shortcut
	document.getElementById('mnt-movemenu-shortcut').addEventListener('click',()=>{
		console.log('add this to shorcut')
	})
	// Remove member from this monitored group
	document.getElementById('mnt-removemenu-remove').addEventListener('click',()=>{
		console.log('remove from this group')
	})
}

//Side:		Monitored group loader
const mntgroupwrite = async(target) =>{
	const isLoaded = target.querySelector('.mnt-data')
	if(!isLoaded){
		const updateDiv = target.querySelector('.mnt-folder-content')
		const header = target.querySelector('.mnt-folder-header')
		const mntset = await window.mnt.load(header.innerHTML)
		let mntdata = []
		for(var i=0;i<mntset.length;i++){
			const id = `id='mnt-data-` + i + `'`
			mntdata[i] = `<p ` + id+ ` class='mnt-data' draggable='true'>` + mntset[i] + `</p>`
		}
		updateDiv.innerHTML = mntdata.join('')
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
		const id = `id='mnt-data-` + i + `'`
		mntdata[i] = `<p ` + id+ ` class='mnt-data' draggable='true'>` + mntset[i] + `</p>`
	}
	updateDiv.innerHTML = mntdata.join('')
		/*
		const mntexpand = document.querySelectorAll('.mnt-folder.visible')
		for(var i=0;i<mntexpand.length;i++){
			mntexpand[i].style.height = mntexpand[i].childElementCount*21 + 31 + 'px'
		}*/	
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
	const shortcutStatus = mntshortcut()
	if(mainStatus && shortcutStatus){
		return true
	}
}
//Initailizer
const mntApplier = (target)=>{
	mntfunc(target)
	mntfold(target)
	mntstyle(target)
	mntmenu(target)
}
const mntInit = ()=>{
	const isReady = mntbuild()
	if(isReady){
		const mntfolder = document.querySelectorAll('.mnt-folder')
		mntApplier(mntfolder)
		mntmenufunc()
	}
	
	
}
mntInit()