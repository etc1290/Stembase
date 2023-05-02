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
			for(var i=0;i<vsbSubMenu.length;i++){
				vsbSubMenu[i].classList.remove('visible')
			}
			for(var i=0;i<hideOpt.length;i++){
				hideOpt[i].classList.remove('hide')
			}			
		}
	}
	const body = document.querySelector('body')
	body.addEventListener('contextmenu',(event)=>{
		event.preventDefault()
		mainfunc(true) 
	})
	body.addEventListener('click',(event)=>{
		mainfunc()	
	})
	
}
// Initialize
const uxInit = ()=>{
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