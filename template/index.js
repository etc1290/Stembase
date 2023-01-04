
// Testing function
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// FileSystem
	//Main: File User Interface
const fsfunc = async (path) => {
		//Initialize
	let fspath = document.querySelector('p[id=fs-path]')
	let updateDiv = document.querySelector('div[id=fs-main]')
	updateDiv.innerHTML=''
	
		//Insert file as button
	const response = await window.fs.main(fspath.innerHTML + path)
	console.log(response)
	response.forEach(i=>{
		i = `<button class='fs-data'>` + i + `</button><br>`
		updateDiv.insertAdjacentHTML('beforeend',i)
	})
		//Browse
	const fsbutton = document.querySelectorAll('button[class=fs-data]')
	fsbutton.forEach(e=>{
		e.addEventListener('click',async()=>{
			fsfunc('\\' + e.innerHTML)
		})
	})

		//Show pathname
	//let fspath = document.querySelector('p[id=fs-path]')
	const pathname = await window.fs.path(path)
	console.log(pathname)
	if(path == 'default'){
		fspath.innerHTML = pathname
	}else if (typeof path !== 'undefined'){
		//Check file typeof
		
		const fstype = await window.fs.type(fspath.innerHTML + path)
		console.log(fstype)
		if (fstype){
			
			fspath.innerHTML += path
		}else{
			console.log('this is a file')
		}
		
	}else{
		console.log('Exception in show pathname')
	}
}
	// Side: Directory browser
document.getElementById('fs-openDir').addEventListener('click', async () => {
	
	const fsbrowse = await window.fs.getDir()
	fsfunc(fsbrowse)
	
})
//Initailizer

fsfunc('default')


// DarkMode
	//Main: Toggle
document.getElementById('dm-main').addEventListener('click', async () =>{
	const isDarkMode = await window.dm.main()
	document.getElementById('dm-text').innerHTML = isDarkMode ? 'Dark' : 'Light'
})
	//Side: Reset to system 
document.getElementById('dm-reset').addEventListener('click', async () =>{
	await window.dm.reset()
	document.getElementById('dm-text').innerHTML = 'System'
})	


