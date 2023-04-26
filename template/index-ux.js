const uxScroll = (e)=>{
	const targetDiv = document.getElementById(e)
	const offset = 200
	const targetPos = (targetDiv.getBoundingClientRect().right + targetDiv.getBoundingClientRect().left)/2
	const movePos = targetPos + window.pageXOffset - offset
	
	console.log(targetPos)
	console.log(movePos)
	document.getElementById('fs-main').scrollTo({
		left: movePos,
		behavior: 'smooth'
	})
}

const uxContextMenuRemove = ()=>{
	const contextMenu = document.getElementById('mnt-cm')
	document.querySelector('body').addEventListener('click',(event)=>{
		if(event.target.offsetParent !=contextMenu){
			contextMenu.classList.remove('visible')
			const subMenu = document.querySelector('.mnt-cm-dropmenu.visible')
			if(subMenu){
				subMenu.classList.remove('visible')
			}
		}	
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