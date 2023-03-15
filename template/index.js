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

const fssetPath = (v)=>{
	const updateDiv = document.getElementById('fs-path')
	let pathset = v.split('\\')
	for(var i=0;i<pathset.length;i++){
		pathset[i] = `<p id='fs-path-part-` + i + `'class='fs-path-part'>` + pathset[i] + `\\</p>`
	}
	const path = pathset.join('')
	updateDiv.innerHTML = path
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
			target.style.background = 'rgb(255,250,240)'
		})
		part.addEventListener('mousedown',()=>{			
			target.style.background = 'rgb(255,221,158)'
			
		})
		part.addEventListener('mouseup',()=>{
			target.style.background = 'rgb(255,250,240)'
			fsfunc(pathlogout[i])
		})
	}
}
	//Main: File User Interface
const fsfunc = async (path=false,isDrive=false) => {
		//Initialize
	const fspath = document.getElementById('fs-path')
	const updateDiv = document.getElementById('fs-main')
	const nowPath = fsgetPath()
	const {file,size,mtime} = await window.fs.main(path)
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
	
		//Button function
	let focusStorage = 'fs-info'
	const fslabelset = document.querySelectorAll('div.fs-data-label')
	fslabelset.forEach(e =>{
		e.addEventListener('dblclick',async() =>{
			fsfunc(fsgetPath()  + e.firstChild.innerHTML)
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
			//fspath.innerHTML = path
			fssetPath(path,isDrive)
		}
		
	}else{
		console.log('Exception in show pathname')
	}
	return new Promise((resolve)=>{resolve(true)})
}
	// Side: Clear path text
const fsclear = (path) =>{
	document.getElementById('fs-path').innerHTML=''
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
	const path = currPath.split('\\').slice(0,-2).join('\\')
	const reg = /(?=^.{0,2}$)[A-Z]:/
	const isDrive = reg.test(path)
	if(isDrive){
		console.log('first stage')
		fsfunc(path+'\\')
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
btn.addEventListener('click', async () => {
	const filePath = await window.versions.fileTree()
	console.log(JSON.parse(filePath)) 
  })

//Initailizer
fsfunc()





