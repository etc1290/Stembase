const uxScroll = (e)=>{
	const targetDiv = document.getElementById(e)
	const offset = 0
	const targetPos = (targetDiv.getBoundingClientRect().right + targetDiv.getBoundingClientRect().left)/2
	const movePos = targetPos + window.pageXOffset - offset
	console.log(targetPos)
	console.log(movePos)
	document.getElementById('fs-main').scrollTo({
		left: movePos,
		behavior: 'smooth'
	})
}
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