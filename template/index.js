// Testing function
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`


// FileSystem
	//Main: File User Interface
const fsfunc = async (path) => {
		//Initialize
	let fspath = document.querySelector('p[id=fs-path]')
	let updateDiv = document.querySelector('div[id=fs-main]')
	const nowPath = fspath.innerHTML
	updateDiv.innerHTML=''
	fspath.innerHTML=''
	const {file,size,mtime} = await window.fs.main(path)
		
	for(var i=0;i<file.length;i++){
		var fsbtn = `<button class='fs-data'>` + file[i] + `</button>`
		var fssize = `<p class='fs-data-size'>`+ size[i] + `</p>`
		var fsmtime = `<p class='fs-data-mtime'>`+ mtime[i] +`</p>`
		var fsdata = fsbtn + fssize + fsmtime + `<br>`
		updateDiv.insertAdjacentHTML('beforeend',fsdata)
	}
		//Button function
	const fsbutton = document.querySelectorAll('button[class=fs-data]')
	fsbutton.forEach(e =>{
		e.addEventListener('dblclick',async() =>{
			fsfunc(fspath.innerHTML + '\\' + e.innerHTML)
		})
		e.addEventListener('mousedown',async() =>{
			uxselect(e.innerHTML)
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
	console.log(newPath)
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
document.getElementById('fs-createMeta').addEventListener('click', () => {
	window.fs.createMeta()
})

//Initailizer
fsfunc('default')

const testfunc = async ()=>{
	//const apple = await window.cw.codelab()
}

testfunc()



