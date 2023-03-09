// Testing function
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
let pathset = []

// FileSystem
	//Main: File User Interface
const fsfunc = async (path,callback) => {
		//Initialize
	const fspath = document.querySelector('[id=fs-path]')
	const updateDiv = document.querySelector('div[id=fs-main]')
	const nowPath = fspath.innerHTML
	fspath.innerHTML=''
	let focusStorage = 'fs-info'
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
	const fslabelset = document.querySelectorAll('div[class=fs-data-label]')
	fslabelset.forEach(e =>{
		e.addEventListener('dblclick',async() =>{
			fsfunc(fspath.innerHTML + '\\' + e.firstChild.innerHTML)
		})
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
		
	const pathname = await window.fs.path(path)
	if(path == 'default'){
		fspath.innerHTML = pathname
	}else if (typeof path !== 'undefined'){
		 
		//Check file typeof		
		const fstype = await window.fs.type(fspath.innerHTML + path)
		if (fstype){			
			fspath.innerHTML += path
		}else{
			console.log('this is a file')
			fspath.innerHTML = nowPath
		}
		
	}else{
		console.log('Exception in show pathname')
	}
	return new Promise((resolve)=>{resolve(true)})
}
	// Side: Clear path text
const fsclear = (path) =>{
	document.querySelector('p[id=fs-path]').innerHTML=''
}
	// Side: Directory browser
document.getElementById('fs-openDir').addEventListener('click', async () => {
	const fsbrowse = await window.fs.getDir()
	fsfunc(fsbrowse[0])

	
})
	// Side: Home 
document.getElementById('fs-home').addEventListener('click', async () =>{
	fsfunc('default')
})

	// Side: Uplevel
document.getElementById('fs-up').addEventListener('click', async () =>{
	const nowPath = document.querySelector('p[id=fs-path]')
	const newPath = nowPath.innerHTML.split('\\').slice(0,-1).join('\\')
	if(newPath == 'C:'){
		fsfunc('C:\\')
	}else if (newPath){
		fsfunc(newPath)
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
fsfunc('default')

const testfunc = async ()=>{
	//const apple = await window.cw.codelab()
}

testfunc()



