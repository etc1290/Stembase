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
			const hideRule = mainRule = hideOpt = []
			const classArr = event.target.className.split(' ')
			// Hide function
			const mnthide = (e)=>{
				for(var i=0;i<e.length;i++){
					e[i].classList.add('hide')
				}
			}
			const hide = (e)=>{
				hideOpt.push(e)
			}
			// Hide table
			hideRule['mnt'] = ()=>{
				mainRule['function-section'] = ()=>{
					hide(document.getElementById('mnt-cm-remove'))
					hide(document.getElementById('mnt-cm-move'))
					hide(document.getElementById('mnt-headercm'))
				}
				mainRule['mnt-folder-header'] = ()=>{
					hide(document.getElementById('mnt-datacm'))	
					const subRule = []
					subRule['mnt-mainfolder'] = ()=>{
						hide(document.getElementById('mnt-cm-groupremove'))
						hide(document.getElementById('mnt-cm-grouprename'))
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
					hide(document.getElementById('mnt-headercm'))
					const subRule = []
					subRule['mnt-main'] = ()=>{
						hide(document.getElementById('mnt-cm-remove'))						
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