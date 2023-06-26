



// Custom scroll unfinished
const uxScroll = (e)=>{
	const targetDiv = document.getElementById(e)
	const offset = 200
	const targetPos = (targetDiv.getBoundingClientRect().right + targetDiv.getBoundingClientRect().left)/2
	const movePos = targetPos + window.pageXOffset - offset
	
	document.getElementById('fs-main').scrollTo({
		left: movePos,
		behavior: 'smooth'
	})
}

// Multiple Selector
const uxSelect = (funcSection)=>{
	const selCode = '.' + funcSection + '-selected'
	const input = document.querySelectorAll(selCode)
	const selMode = []
	selMode['mnt'] = ()=>{		
		const selFolder = []
		const selHeader = []
		const selNode   = []
		const selGroup  = []
		const selGroupCls=[]	 
		for(let i=0;i<input.length;i++){
			const folder = input[i].parentNode.closest('.mnt-folder')
			//console.log(folder)
			//console.log(input[i])
			const group  = mntclass(folder)
			selFolder[i] = folder.children[0].innerHTML	
			selHeader[i] = input[i].innerHTML
			selNode[i]	 = document.getElementById(folder.id)
			selGroup[i]	 = group[0]
			selGroupCls[i]=group[1]
		}
		const selArr = {
			'Folder':selFolder,'Data':selHeader,'Node':selNode,
			'Folderid':selGroup,'Folderclass':selGroupCls,
			'Raw':input
		}
		return selArr
	}
	const output = selMode[funcSection]()
	return output
}

const uxSelectAll = (funcSection)=>{
	const selCode = '.' + funcSection + '-selected'
	const target = document.querySelectorAll(selCode)
	const selMode = []
	const hash = []
	let token = 0
	selMode['mnt'] = ()=>{
		for(var i=0;i<target.length;i++){		
			const el = target[i]
			const [,uniqClass] = mntclass(el)
			//const classArr = el.classList
			/*
			let uniqClass = classArr[1]
			const isUniq = uniqClass.substring(0,9) == 'mnt-data-'
			if(!isUniq){
				for(var a=0;a<classArr.length;a++){
					if(a==1){
						continue
					}
					const cls = classArr[a]
					if(cls.substring(0,9) == 'mnt-data-'){
						uniqClass = cls
						break
					}
				}
			}*/
			const isExist = hash.indexOf(uniqClass)
			if(!isExist+1){
				hash[token++] = uniqClass
				const selNode = document.querySelectorAll('.' + uniqClass)
				for(var a=0;a<selNode.length;a++){
					selNode[a].classList.add(funcSection + '-selected')
				}
			}
		}
	}
	selMode[funcSection]()
	const output = uxSelect(funcSection)
	return output
}
// Contextmenu Creator
const uxContextMenuCreate = ()=>{
	// Positioner
	
	const menuPositioner = (event,isSub = false)=>{
		const funcSection = event.target.closest('.function-section')
		const contextMenu = funcSection.querySelector('.context-menu')
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
		// Main menu
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
	const cmmenu = document.querySelectorAll('.context-menu')
	for(var i=0;i<cmmenu.length;i++){
		const cm = cmmenu[i]
		const sub = document.getElementById(cm.id + '-sub')
		const submenu = cm.querySelectorAll('.' + cm.id + '-submenu')
		const dropmenu= sub.querySelectorAll('.submenu')
		for(var j=0;j<submenu.length;j++){
			const el= submenu[j]
			const subel = dropmenu[j]
			
			el.addEventListener('click',(event)=>{
				const [posLeft,posTop] = menuPositioner(event,true)
				subel.style.left = posLeft
				subel.style.top  = posTop
				subel.classList.add('visible')
			})
		}
	}
	
	const page = document.body
	page.addEventListener('passcheck',(event)=>{
		event.preventDefault()
		// Display contextmenu
		const funcSection = event.target.closest('.function-section')
		const contextMenu = funcSection.querySelector('.context-menu')
		if(!contextMenu){
			return false
		}
		const [posLeft,posTop] = menuPositioner(event.detail.data)
		contextMenu.style.left = posLeft
		contextMenu.style.top = posTop
		contextMenu.classList.add('visible')
		
		// Contextmenu Select
		const uxContextMenuSelect = ()=>{
			const selector = []
			selector['mnt'] = ()=>{mntselected(event)}
			try{
				selector[funcSection.id]()
			}catch(err){}
		}
		uxContextMenuSelect()
		// Hiding controller
		const uxContextMenuOptRule = ()=>{
			const hideRule = []
			const mainRule = []
			const hideOpt = []
			const classArr = event.target.className.split(' ')
			// Hide function
			const mnthide = (e)=>{
				for(var i=0;i<e.length;i++){
					e[i].classList.add('hide')
				}
			}
			const hide = (e,isAggreg=false)=>{
				e = document.getElementById(e)
				if(isAggreg){
					e = e.children				
					for(var i=0;i<e.length;i++){
						hideOpt.push(e[i])
					}
				}else{
					hideOpt.push(e)
				}
			}
			const unhide = (e,isAggreg=false)=>{
				e = document.getElementById(e)
				if(isAggreg){
					e = e.children				
					for(var i=0;i<e.length;i++){
						//hideOpt.push(e[i])
						const pos = hideOpt.indexOf(e[i])
						if(pos + 1){
							hideOpt.splice(pos,1)
						}
					}
				}else{
					const pos = hideOpt.indexOf(e)
					if(pos + 1){
						hideOpt.splice(hideOpt.indexOf(e),1)
					}
					
				}
				
			}
			// Hide table
			hideRule['mnt'] = ()=>{
				mainRule['function-section'] = ()=>{
					hide('mnt-cm-remove')
					hide('mnt-cm-move')
					hide('mnt-headercm')
				}
				mainRule['mnt-folder-header'] = ()=>{
					hide('mnt-datacm',true)
					const subRule = []
					subRule['mnt-mainfolder'] = ()=>{
						unhide('mnt-cm-new')
						hide('mnt-cm-groupdelete')
						hide('mnt-cm-grouprename')
					}
					subRule['mnt-subfolder'] = ()=>{
						unhide('mnt-cm-new')
						unhide('mnt-cm-move')
						unhide('mnt-headercm',true)
						const name = event.target.innerHTML
						hide('mnt-movemenu-' + name)
						hide('mnt-removemenu-delete')
						
					}
					const group = event.target.closest('.mnt-folder')
					const groupClass = group.className.split(' ')
					for(var i=0;i<groupClass.length;i++){
						try{
							subRule[groupClass[i]]()					
						}catch(err){}
					}
				}
				mainRule['mnt-data'] = ()=>{
					hide('mnt-headercm')
					const subRule = []
					subRule['mnt-main'] = ()=>{
						hide('mnt-cm-remove')						
					}
					try{
						const group = event.target.closest('.mnt-folder')
						subRule[group.id]()
					}catch(err){}				
				}
				mainRule['mnt-folder-content'] = ()=>{
					mainRule['function-section']()
				}
				for(let i=0;i<classArr.length;i++){
					try{
						mainRule[classArr[i] + '']()
					}catch(err){}				
				}			
			}
			try{
				hideRule[funcSection.id]()
			}catch(err){}
			mnthide(hideOpt)
		}
		uxContextMenuOptRule()		
	})	
}	
// Contextmenu Removal and hide
const uxContextMenuRemove = ()=>{
	const mainfunc = (isSub=false)=>{
		const vsbMenu = document.querySelectorAll('.context-menu.visible')
		const vsbSubMenu = document.querySelectorAll('.submenu.visible')
		const hideOpt = document.querySelectorAll('.hide')
		if(!event.target.offsetParent.classList.contains('context-menu')){
			if(!isSub){
				for(var i=0;i<vsbMenu.length;i++){
					vsbMenu[i].classList.remove('visible')				
				}
			}
			for(var i=0;i<hideOpt.length;i++){
				hideOpt[i].classList.remove('hide')
			}			
		}
		for(var i=0;i<vsbSubMenu.length;i++){
				vsbSubMenu[i].classList.remove('visible')
		}
	}
	const body = document.body
	body.addEventListener('contextmenu',(event)=>{
		event.preventDefault()
		mainfunc(true) 
		const evt = new CustomEvent('passcheck',{detail:{data:event},bubbles:true})
		event.target.dispatchEvent(evt)
		
	})
	body.addEventListener('mouseup',()=>{
		mainfunc()	
	})
	
}
// Initialize
const uxInit = ()=>{
	uxContextMenuCreate()
	uxContextMenuRemove()
}
uxInit()
/*
function scrollToTargetAdjusted(){
    var element = document.getElementById('targetElement');
    var headerOffset = 45;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
}*/