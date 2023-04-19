
// Side:	Monitored group collapse and expand
const mntfold = ()=>{
	const mntheader = document.querySelectorAll('.mnt-folder-header')
	const mntcontent = document.querySelectorAll('.mnt-folder-content')
	for(let i=0;i<mntheader.length;i++){
		mntheader[i].addEventListener('click',()=>{
			
			if(mntcontent[i].style.height==''){
				mntcontent[i].style.height = mntcontent[i].childElementCount*21 + 31 + 'px'
				mntcontent[i].classList.add('mnt-expanding')
			}else{
				mntcontent[i].style.height = ''
				mntcontent[i].classList.remove('mnt-expanding')
			}
		})
	}
}
// Side:	The Style of Monitored system
const mntstyle = ()=>{
	const mntdropzone = document.querySelectorAll('.mnt-dropzone')
	const mntfolderheader = document.querySelectorAll('.mnt-folder-header')
	for(let i=0;i<mntdropzone.length;i++){
		mntdropzone[i].addEventListener('mouseenter',()=>{
			mntfolderheader[i].style.background = 'rgb(124,225,192)'
		})
		mntdropzone[i].addEventListener('mouseleave',()=>{
			mntfolderheader[i].style.background = ''
		})
	}
	const mnt = document.getElementById('mnt')
	mnt.addEventListener('mousedown',()=>{
		const mntselected = document.querySelector('.mnt-selected')
		if(mntselected){
			mntselected.style.background = ''
			mntselected.classList.remove('mnt-selected')
		}
	})
}
// Side:	Context menu of monitored data
const mntmenu = ()=>{
	const contextMenu = document.getElementById('mnt-cm')
	const mntfolder = document.querySelectorAll('.mnt-folder')
	for(let i=0;i<mntfolder.length;i++){
		mntfolder[i].addEventListener('contextmenu',(event)=>{
			event.preventDefault()
			const {clientX: mouseX, clientY: mouseY} = event
			contextMenu.style.top = `${mouseY}px`
			contextMenu.style.left= `${mouseX}px`
			contextMenu.classList.add('visible')
		})
	}
}	
// Side:	Function of monitored data
const mntfunc = ()=>{
	// Data function
	const mntdata = document.querySelectorAll('.mnt-data')
	for(let i=0;i<mntdata.length;i++){
		// Jump to monitored path
		const target = mntdata[i]
		target.addEventListener('dblclick',()=>{
			floorNum = 'fs-floor-0'
			fsfunc(target.innerHTML)
		})
		// Drag
		target.addEventListener('dragstart',(event)=>{
			event.dataTransfer.setData('text/plain',event.target.id)
			/*const clone = target.cloneNode(true)
			target.parentNode.insertBefore(clone,target)
			clone.id = event.target.id + '-clone'
			event.dataTransfer.setData('text/plain',clone.id)*/
		})
		target.addEventListener('dragend',()=>{
			target.style.background = ''
		})
		// Style
		target.addEventListener('click',()=>{
			target.classList.add('mnt-selected')			
		})
		target.addEventListener('mousedown',()=>{
			target.style.background = 'rgb(124,225,192)'
		})
		target.addEventListener('mouseup',()=>{
			target.style.background = 'rgb(154,255,222)'
		})
	}
	
	// Folder function
	// Shortcut
	// All List
	/*
	const mntmain = document.getElementById('mnt-main')
	mntmain.addEventListener('dragstart',()=>{
		console.log('apple')
	})
	mntmain.addEventListener('dragend',()=>{
		console.log('bana')
	})*/
	// Drop folder
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
			const id = event.dataTransfer.getData('text/plain')
			console.log(id)
			content.appendChild(document.getElementById(id))
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
	}		
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
	mntfunc()	
}
//Initailizer
const mntInit = ()=>{
	mntmain()
	mntfold()
	mntstyle()
	mntmenu()
	
}
mntInit()