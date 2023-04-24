
// Side:	Monitored group collapse and expand
const mntfold = (target)=>{
	for(let i=0;i<target.length;i++){
		const el = target[i]
		el.addEventListener('click',(event)=>{
			const header = event.currentTarget.querySelector('.mnt-folder-header')
			const content = event.currentTarget.querySelector('.mnt-folder-content')
			const isExpand = content.classList.contains('mnt-expanding')
			if(isExpand){
				content.style.height = ''
				content.classList.remove('mnt-expanding')
			}else{
				content.style.height = content.childElementCount*21 + 31 + 'px'
				content.classList.add('mnt-expanding')
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
			const content = event.currentTarget.querySelector('.mnt-folder-header')
			const isDropzone = mntcheck(event)
			if(isDropzone){
				content.style.background = 'rgb(124,255,192)'
			}else{
				content.style.background = 'rgb(255,174,189)'
			}
		})
		el.addEventListener('mouseleave',(event)=>{
			const content = event.currentTarget.querySelector('.mnt-folder-header')
			content.style.background = ''
		})
	}
}
// Side:	Context menu of monitored data
const mntmenu = (target)=>{
	
	// Main menu
	const contextMenu = document.getElementById('mnt-cm')
	const menuPositioner = (event)=>{
		const winX = document.body.clientWidth
		const winY = document.body.clientHeight
		const {clientX : mouseX, clientY: mouseY} = event
		const menuX = contextMenu.style.width
		const menuY = contextMenu.style.height
		const secMargin = 10
		let posLeft = posTop = ''
		const overflowLimX = mouseX + menuX + secMargin
		const overflowLimY = mouseY + menuY + secMargin
		if(overflowLimX >= winX && overflowLimY >=winY){
			posLeft = mouseX - menuX - secMargin + 'px'
			posTop = mouseY - menuY - secMargin + 'px'
		}else if(overflowLimX >= winX){
			posLeft = mouseX - menuX - secMargin + 'px'
			posTop = mouseY + secMargin + 'px'
		}else if(overflowLimY >= winY){
			posLeft = clientX + secMargin + 'px'
			posTop = clientY - menuY - secMargin + 'px'
		}else{
			posLeft = clientX + secMargin + 'px'
			posTop = clientY + secMargin + 'px'
		}
		return [posLeft,posTop]
	}
	for(let i=0;i<target.length;i++){
		const el=target[i]
		el.addEventListener('contextmenu',(event)=>{
			event.preventDefault()
			/*
			const {clientX : mouseX, clientY: mouseY} = event
			contextMenu.style.top = mouseY + 'px'
			contextMenu.style.left= mouseX + 'px'*/
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
		el.addEventListener('click',(event)=>{
			
		})
	}
}	
// Side:	Function of monitored data
const mntfunc = (target)=>{
	// Data function
	const mntcheck = (event)=>{
		return event.currentTarget.classList.contains('mnt-dropzone')		
	}
	for(let i=0;i<target.length;i++){
		// Jump to monitored path
		const el = target[i]
		el.addEventListener('dblclick',(event)=>{
			if(mntcheck(event)){
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
				event.target.style.background = 'rgb(124,255,192'
				event.target.classList.add('mnt-selected')
			}		
		})
		el.addEventListener('mouseup',(event)=>{
			if(mntcheck(event)){
				event.target.style.background = 'rgb(154,255,222)'
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
			el.addEventListener('drop',(event)=>{
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
	// Folder function
	// Shortcut
	// All List
	// Drop folder
	
	/*
	let counter= false
	const mntdropzone = document.querySelectorAll('.mnt-dropzone')
	const mntcancel = (event)=>{
		event.preventDefault()
		event.stopPropagation()
		return false
	}

	const mntfoldercontent = document.querySelectorAll('.mnt-folder-content')
	for(let i=0;i<mntdropzone.length;i++){
		const target = mntdropzone[i]
		const content = mntfoldercontent[i]
		let isExpand = false
		target.addEventListener('drop',(event)=>{
			mntcancel(event)
			const dropid = event.dataTransfer.getData('text/plain')
			const dropdata = document.getElementById(dropid)
			const dropclone = dropdata.cloneNode(true)
			dropdata.parentNode.insertBefore(dropclone,dropdata.nextSibling)
			content.appendChild(dropdata)
		})
		target.addEventListener('dragenter',mntcancel)
		target.addEventListener('dragover',mntcancel)
		target.addEventListener('dragenter',()=>{
			if(!counter){
				content.style.height = (content.clientHeight + 100) + 'px'
				counter = 0
			}
			counter++
		})
		target.addEventListener('dragleave',()=>{
			counter--
			if(counter==0){
				if(content.classList.contains('mnt-expanding')){
					content.style.height = content.childElementCount*21 + 31 + 'px'
				}else{
					content.style.height = ''
				}			
				counter = false
			}
		})
		target.addEventListener('drop',()=>{
			counter = 0
			if(content.classList.contains('mnt-expanding')){
				content.style.height = content.childElementCount*21 + 31 + 'px'
			}else{
				content.style.height = ''
			}	
		})
	}	*/	
}
// Main:	Load all monitored data
const mntmain = async()=>{
	const mntdata = []
	const updateDiv = document.getElementById('mnt-main-display')
	const mntset = await window.mnt.main()
	for(var i=0;i<mntset.length;i++){
		const id = `id='mnt-data-` + i + `'`
		mntdata[i] = `<p ` + id+ ` class='mnt-data' draggable='true'>` + mntset[i] + `</p>`
	}
	updateDiv.innerHTML = mntdata.join('')
	return true
}
//Initailizer
const mntApplier = (target)=>{
	mntfunc(target)
	mntfold(target)
	mntstyle(target)
	mntmenu(target)
}
const mntInit = async()=>{
	const isReady = await mntmain()
	if(isReady){
		const mntfolder = document.querySelectorAll('.mnt-folder')
		mntApplier(mntfolder)
	}
	
	
}
mntInit()