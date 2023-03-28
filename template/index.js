// Testing function
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// Global in FileSystem
let floorNum = 'fs-floor-0'
let floorCheckIn =  floorDist = 0
const maxFloor = 5
// FileSystem
const fsgetPath = (isDetour=false)=>{	
	const pathset = document.querySelectorAll('.fs-path-part')
	const pathArr = []
	let pathLen = pathset.length
	if(isDetour){
		pathLen = Array.prototype.indexOf.call(pathset,document.querySelector('.this-floor')) +1
		//console.log(pathLen)
	}
	for(var i=0;i<pathLen;i++){
		pathArr[i] = pathset[i].innerHTML
	}
	//console.log(pathArr)
	const path=pathArr.join('')
	return path
}

const fsfuncPath = (v=0)=>{
	const partset = document.querySelectorAll('.fs-path-part')
	const pathlog = []
	const pathlogout = []
	const partLen = partset.length
	const fspath = document.getElementById('fs-path')
	// Side: Path function
	for(let i=0;i<partLen;i++){
		const part = partset[i]
		const target = document.getElementById(part.id)
		pathlog[i] = part.innerHTML
		pathlogout[i] = pathlog.join('')
		part.addEventListener('mouseover',()=>{
			target.style.background = 'rgb(255,232,189)'
			
			const isOutset = document.querySelector('.this-floor')
			if(!isOutset){
				fspath.lastChild.classList.add('this-floor')
			}
			const floorStart = document.querySelector('.this-floor')
			const startFloor = Array.prototype.indexOf.call(partset,floorStart)
			const endFloor = Array.prototype.indexOf.call(partset,partset[i])			
			floorDist = startFloor - endFloor
			
		})
		part.addEventListener('mouseleave',()=>{
			target.style.background = ''
		})
		let isExec = false
		//Floor Jump or Rebuild
		part.addEventListener('mousedown',()=>{			
			target.style.background = 'rgb(255,221,158)'
			const currFloor = +floorNum[floorNum.length-1]
			if(floorDist < 0){		
				
				const targetFloor = 'fs-floor-' + (currFloor - floorDist)
				console.log(targetFloor)
				document.getElementById(targetFloor).scrollIntoView()
				floorNum = targetFloor
			}else if(floorDist>0){
				if(floorDist>currFloor){
					floorNum = 'fs-floor-0'
					isExec = true
				}else{
					
					const targetFloor = 'fs-floor-' + (currFloor - floorDist)
					document.getElementById(targetFloor).scrollIntoView()
					floorNum = targetFloor
				}
			}
			const thisFloor = document.querySelectorAll('.this-floor')
			for(var i=0;i<thisFloor.length;i++){
				thisFloor[i].classList.remove('this-floor')
			}				
			
		})
		
		part.addEventListener('mouseup',(event)=>{
			target.style.background = ''
			if(isExec){
				fsfunc(pathlogout[i])				
			}
			document.getElementById(event.currentTarget.id).classList.add('this-floor')	
		})
	}
}
const fssetPath = (v)=>{
	const updateDiv = document.getElementById('fs-path')
	let rawset = v.split('\\')
	const pathset = rawset.filter(n => n)
	for(var i=0;i<pathset.length;i++){
		pathset[i] = `<p id='fs-path-part-` + i + `'class='fs-path-part'>` + pathset[i] + `\\</p>`
	}
	const path = pathset.join('')
	updateDiv.innerHTML = path
	fsfuncPath()
}
	//Main: File User Interface

const fsfloorSign = (v=0)=>{
	// Floor sign display
	const floorset = document.querySelectorAll('.fs-floor')	
	for(let i=v;i<floorset.length;i++){
		floorset[i].addEventListener('mouseenter',(event)=>{
			
			const pathPrev = document.querySelector('.this-floor')
			if(pathPrev){
				pathPrev.classList.remove('this-floor')
			}
			const pathset = document.querySelectorAll('.fs-path-part')
			const pathCount = pathset.length
			const floorStayNum = +event.currentTarget.id.match(/.$/,'')
			const floorCurrNum = pathCount - floorCheckIn -1 + floorStayNum
			const pathTarget = pathset[floorCurrNum]
			if(pathTarget){
				pathTarget.style.background = 'aliceblue'
				pathTarget.classList.add('this-floor')
			}
			
		})
		floorset[i].addEventListener('mouseleave',(event)=>{
			const pathTarget = document.querySelector('.this-floor')
			if(pathTarget){
				pathTarget.style.background = ''
			}
		})
	}
}
const fsfloorfunc = ()=>{
	const floorset = document.querySelectorAll('.fs-floor')
	for(var i = +floorNum.match(/.$/,'')+1;i<floorset.length;i++){
		floorset[i].innerHTML = ''
		floorset[i].style.width = '0px'
		//floorset[i].style.outline = '0px'
		floorset[i].style.overflowY = 'hidden'
		floorset[i].style.borderRight = '0px'
		floorset[i].style.borderBottom = '0px'
	}
	//document.getElementById(floorNum).scrollIntoView()
	uxScroll(floorNum)
		//Floor function
	
	for(let i=0;i<floorset.length;i++){
		floorset[i].addEventListener('mouseenter',()=>{
			floorNum = floorset[i].id
			const floorid = +floorNum.match(/.$/,'')
			
		})
	}
}
const fsfunc = async (v=false,isDrive=false) => {
		//Declaration - constant
	const fspath = document.getElementById('fs-path')
	const updateDiv = document.getElementById(floorNum)
	const initDiv = document.getElementById('fs-floor-0')
	const path = v
	
		//Initialize
	
	if(isDrive){
		v = v + '\\'
	}
	const {file,size,mtime} = await window.fs.main(v)
	const fsdataset = []	
	for(var i=0;i<file.length;i++){
		if(size[i]){
			const fsbtn = `<div class='fs-data-label' id='datalabel` + i +`'><button class='fs-data'>` + file[i] + `</button>`
			const fssize = `<p class='fs-data-size'>`+ size[i] + `</p>`
			const fsmtime = `<p class='fs-data-mtime'>`+ mtime[i] +`</p></div>`
			const fsdata = fsbtn + fssize + fsmtime + `<br>`
			fsdataset[i] = fsdata
		}	
	}
	updateDiv.innerHTML = fsdataset.join('')
	if(updateDiv === initDiv){		
		updateDiv.style.width = '100%'
	}else{
		initDiv.style.width = '532px'
		updateDiv.style.width = '532px'
	}	
	floorCheckIn = +floorNum.match(/.$/,'')
	//updateDiv.style.outline = '5px solid rgb(255,238,214)'
	updateDiv.style.overflowY = 'scroll'
	updateDiv.style.borderRight = '5px solid rgb(255,238,214)'
	updateDiv.style.borderBottom = '5px solid rgb(255,238,214)'
		//Button function
	let focusStorage = 'fs-info'
	
	const fslabelset = document.querySelectorAll('#' + floorNum +' .fs-data-label')
	fslabelset.forEach(e =>{
		e.addEventListener('dblclick',async() =>{
			const floortype = await window.fs.type(fsgetPath(true)+e.firstChild.innerHTML)
			const nextFloor = +floorNum.match(/.$/,'')+1
			const floorset = document.querySelectorAll('.fs-floor')
			if(floortype){
				if(nextFloor > maxFloor - 1){
					//Floor overflow handler
					document.getElementById('fs-floor-0').outerHTML = ''
					for(var i=1;i<floorset.length;i++){
						floorset[i].id = 'fs-floor-' + (i-1)
					}
					const newFloor = `<div id='fs-floor-4' class='fs-floor'></div>`
					const fsmain = document.getElementById('fs-main')
					fsmain.insertAdjacentHTML('beforeend',newFloor)
					fsfloorSign(maxFloor - 1)
					floorNum = 'fs-floor-' + (maxFloor -1)
				}else{
					floorNum = 'fs-floor-' + nextFloor
				}
				fsfunc(fsgetPath(true) + e.firstChild.innerHTML)
			}else{
				// Open it when double clicking
				await window.fs.openfile(fsgetPath() + e.firstChild.innerHTML)
			}
		})
			//Select file
		e.addEventListener('click',async(evt) =>{
		
			uxselect(e.firstChild.innerHTML)
			e.style.background = 'rgb(167,203,221)'		
			const focusTarget = evt.currentTarget.id		
			if (focusStorage !== focusTarget){
				document.getElementById(focusStorage+'').style.background = ''
				focusStorage = focusTarget
			}
		})
	})
	
		//Show pathname
	if(!path){
		const pathname = await window.fs.path(path)
		fssetPath(pathname)
	}else if (typeof path !== 'undefined'){
		 
		//Check file typeof		
		const fstype = await window.fs.type(path)
		if (fstype){						
			fssetPath(path)
		}
		
	}else{
		console.log('Exception in show pathname')
	}
	fsfloorfunc()
	return new Promise((resolve)=>{resolve(true)})
}
	// Side: Directory browser
document.getElementById('fs-openDir').addEventListener('click', async () => {
	const fsbrowse = await window.fs.getDir()
	fsfunc(fsbrowse[0])

	
})
	// Side: Home 
document.getElementById('fs-home').addEventListener('click', async () =>{
	fsfunc()
})

	// Side: Uplevel
document.getElementById('fs-up').addEventListener('click', async () =>{
	
	const currPath = fsgetPath()
	let path = currPath.split('\\').slice(0,-2).join('\\')
	if(!path){
		path = currPath.replace(/.$/,'')
	}
	const reg = /(?=^.{0,2}$)[A-Z]:/
	let lastFloor = +floorNum.match(/.$/,'')-1
	if(lastFloor<0){
		lastFloor = 0
	}
	floorNum = 'fs-floor-' + lastFloor
	const isDrive = reg.test(path)
	if(isDrive){
		fsfunc(path,isDrive)
	}else if (path){
		fsfunc(path)
	}else{
		document.getElementById('fs-info').innerHTML = 'Error in FS Up level'
	}
	
	
})

// Toolbar
document.getElementById('cw-setting').addEventListener('click', async () =>{
	const stCreateWindow = await window.cw.setting()

})

//Test function
/*
btn.addEventListener('click', async () => {
	const filePath = await window.versions.fileTree()
	console.log(JSON.parse(filePath)) 
  })
*/
document.getElementById('btn').addEventListener('click', async ()=>{
	console.log('deleting!')
	await window.tag.delDB()
})
//Initailizer
const fsInit = async()=>{
	const isReady = await fsfunc()
	if(isReady){
		fsfloorSign()		
	}

}
fsInit()

