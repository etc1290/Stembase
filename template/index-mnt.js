
// Side:	Monitored group collapse and expand
const mntfold = ()=>{
	const mntheader = document.querySelectorAll('.mnt-folder-header')
	const mntcontent = document.querySelectorAll('.mnt-folder-content')
	for(let i=0;i<mntheader.length;i++){
		mntheader[i].addEventListener('click',()=>{
			console.log(mntcontent[i].style.height)
			if(mntcontent[i].style.height==''){
				mntcontent[i].style.height = 'auto'
			}else{
				mntcontent[i].style.height = ''
			}
		})
	}
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
		})
		// Style
		target.addEventListener('click',()=>{
			const apple = target.clientWidth
			console.log(apple)
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
	const mntshortcut = document.getElementById('mnt-shortcut')
	mntshortcut.addEventListener('dragenter',()=>{
		mntshortcut.style.height = mntshortcut.clientWidth + 100 + 'px'
	})
	// Drop folder
	const mntdropzone = document.querySelectorAll('.mnt-dropzone')
	const mntcancel = (event)=>{
		event.preventDefault()
		event.stopPropagation()
		return false
	}
	for(let i=0;i<mntdropzone.length;i++){
		const target = mntdropzone[i]
		target.addEventListener('drop',(event)=>{
			mntcancel(event)
			const id = event.dataTransfer.getData('text/plain')
			console.log(id)
			console.log(document.getElementById(id))
			event.target.appendChild(document.getElementById(id))
		})
		target.addEventListener('dragenter',mntcancel)
		target.addEventListener('dragover',mntcancel)
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
	mntmenu()
	
}
mntInit()