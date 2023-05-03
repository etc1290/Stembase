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
// Contextmenu Select
const uxContextMenuSelect = (event,id)=>{
	const selector = []
	selector['mnt'] = (event)=>{mntselected(event)}
	
	try{
		selector[id](event)
	}catch(err){
		console.log('System error message:' + err)
	}
	
}
// Contextmenu Creator
const uxContextMenuCreate = ()=>{
	// Positioner
	//const contextMenu = document.getElementById('mnt-cm')
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
	/*
	for(let i=0;i<target.length;i++){
		const el=target[i]
		el.addEventListener('contextmenu',(event)=>{
			// Select contextmenu target
			mntselected(event)
			
			// Customized display
		
			if(event.currentTarget.id == 'mnt-main'){
				const hideOpt = document.getElementById('mnt-removemenu-remove')
				hideOpt.classList.add('hide')
			}
			// Main function
			event.preventDefault()
			const [posLeft,posTop] = menuPositioner(event)
			contextMenu.style.left = posLeft
			contextMenu.style.top = posTop
			contextMenu.classList.add('visible')
		})
	}*/
	// Side menu
	/*
	const submenu = document.querySelectorAll('.mnt-cm-submenu')
	const dropmenu= document.querySelectorAll('.mnt-cm-dropmenu')*/
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
	/*
	const submenu = contextMenu.querySelectorAll(contextMenu.id + '-submenu')
	const dropmenu= contextMenu.querySelectorAll(contextMenu.id + '-dropmenu')
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
	}*/
	// test: Should be removed after all context related function is completed
	
	const page = document.body
	page.addEventListener('contextmenu',(event)=>{
		event.preventDefault()
		// Display contextmenu
		const funcSection = event.target.closest('.function-section')
		const contextMenu = funcSection.querySelector('.context-menu')
		const [posLeft,posTop] = menuPositioner(event)
		contextMenu.style.left = posLeft
		contextMenu.style.top = posTop
		contextMenu.classList.add('visible')
		
		// Select target
		uxContextMenuSelect(event,funcSection.id)
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
			}/*
			for(var i=0;i<vsbSubMenu.length;i++){
				vsbSubMenu[i].classList.remove('visible')
			}*/
			for(var i=0;i<hideOpt.length;i++){
				hideOpt[i].classList.remove('hide')
			}			
		}
		for(var i=0;i<vsbSubMenu.length;i++){
				vsbSubMenu[i].classList.remove('visible')
			}
	}
	const body = document.querySelector('body')
	body.addEventListener('contextmenu',(event)=>{
		event.preventDefault()
		mainfunc(true) 
	})
	body.addEventListener('mousedown',()=>{
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