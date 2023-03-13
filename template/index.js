// Testing function
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
let pathset = []

// FileSystem
const fsgetPath = ()=>{
	console.time('first')
	
	const path = document.getElementById('fs-path').innerHTML
	console.time('regex method')
	const b = path.replace(/(\<.*?\>)/gi,'\\')
	
	const c = b.replaceAll('\\\\\\','\\')
	const output = c.slice(0,-1).slice(1,b.length-1)
	console.log(output)
	//const output = path.replace('<p>','').replace('</p>','')
	return output
}

const fssetPath = (v)=>{
	console.log(v)
	const updateDiv = document.getElementById('fs-path')
	let pathset = v.split('\\')
	for(var i=0;i<pathset.length;i++){
		pathset[i] = `<p id='fs-path-part-` + i + `'class='fs-path-part'>` + pathset[i] + `\\</p>`
	}
	const path = pathset.join('')
	updateDiv.innerHTML = path
	const partset = document.querySelectorAll('.fs-path-part')
	for(var i=0;i<partset.length;i++){
		partset[i].addEventListener('click',()=>{
			console.log(partset[i].id)
		})
	}
}
	//Main: File User Interface
const fsfunc = async (path=false) => {
		//Initialize
	const fspath = document.getElementById('fs-path')
	const updateDiv = document.getElementById('fs-main')
	//const nowPath = fspath.innerHTML
	const nowPath = fsgetPath()
	//fspath.innerHTML=''
	//console.log(path)
	//fssetPath(path)
	console.log('aaa' + path)
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
		//fspath.innerHTML = pathname
		console.log('aaa')
		fssetPath(pathname)
	}else if (typeof path !== 'undefined'){
		 
		//Check file typeof		
		const fstype = await window.fs.type(path)
		if (fstype){						
			//fspath.innerHTML = path
			fssetPath(path)
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
	/*const nowPath = document.getElementById('fs-path')
	const newPath = nowPath.innerHTML.split('\\').slice(0,-1).join('\\')*/
	const currPath = fsgetPath()
	console.log(currPath)
	const path = currPath.split('\\').slice(0,-2).join('\\')
	if(path == 'C:'){
		fsfunc('C:\\')
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





