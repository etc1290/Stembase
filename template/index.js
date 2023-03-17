// Testing function
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
let pathset = []

// FileSystem
const fsgetPath = ()=>{	
	const path = document.getElementById('fs-path').innerHTML
	const rawPath = path.replace(/(\<.*?\>)/gi,'\\')	
	const newPath = rawPath.replaceAll('\\\\\\','\\')
	const output = newPath.slice(0,-1).slice(1,newPath.length-1)
	return output
}
const fsfuncPath = (v)=>{
	const partset = document.querySelectorAll('.fs-path-part')
	const pathlog = []
	const pathlogout = []
	// Side: Path function
	for(let i=0;i<partset.length;i++){
		const part = partset[i]
		const target = document.getElementById(part.id)
		pathlog[i] = part.innerHTML
		pathlogout[i] = pathlog.join('')
		part.addEventListener('mouseover',()=>{
			target.style.background = 'rgb(255,232,189)'
		})
		part.addEventListener('mouseleave',()=>{
			target.style.background = ''
		})
		part.addEventListener('mousedown',()=>{			
			target.style.background = 'rgb(255,221,158)'
			
		})
		part.addEventListener('mouseup',()=>{
			target.style.background = ''
			fsfunc(pathlogout[i])
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
let floorNum = 'fs-floor-0'
const fsfloorfunc = ()=>{
	
		//Floor Sign
	const floorCurrNum = document.getElementById('fs-path').lastChild
	const floorSign = ()=>{
		//document.getElementById('fs-path-part-' + floorNumber).style.background = 'aliceblue'
		floorCurrNum.style.background = 'aliceblue'
		
	}
	const floorSignout = ()=>{
		//document.getElementById('fs-path-part-' + floorNumber).style.background = ''
		floorCurrNum.style.background = ''
	}
		//Floor building
	const floorCurr = document.getElementById(floorNum)
	floorCurr.addEventListener('mouseenter',floorSign)
	floorCurr.addEventListener('mouseleave',floorSignout)
	
	document.getElementById(floorNum).scrollIntoView()
		//Floor function
	const floorset = document.querySelectorAll('.fs-floor')
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
	const nowPath = fsgetPath()
	const path = v
	
		//Initialize
	console.log(floorNum)
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
	updateDiv.style.width = '532px'
	updateDiv.style.borderLeft = '5px solid rgb(255,238,214)'
		//Button function
	let focusStorage = 'fs-info'
	const maxFloor = 5
	const fslabelset = document.querySelectorAll('#' + floorNum +' .fs-data-label')
	fslabelset.forEach(e =>{
		e.addEventListener('dblclick',async() =>{
			const nextFloor = +floorNum.match(/.$/,'')+1
			if(nextFloor > maxFloor - 1){
				const info = document.getElementById('info')
				info.id = 'BOOM'
				console.log(info)
			}else{
				floorNum = 'fs-floor-' + nextFloor
				fsfunc(fsgetPath() + e.firstChild.innerHTML)
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
document.getElementById('btn').addEventListener('click',()=>{
	console.log('ding!')
})
//Initailizer
fsfunc()






