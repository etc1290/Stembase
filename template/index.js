
// Testing function
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// FileSystem
	//Main: Show filenames
const fsfunc = async () => {
	
	const response = await window.fs.main()
	let updateDiv = document.querySelector('div[id=fs-main]')
	let fsPlaceholder = document.querySelector('p[id=fs-text]')
	fsPlaceholder.remove()
	response.forEach(i=>{
		i = `<button class='fs-data'>` + i + `</button>`
		console.log(i)
		updateDiv.insertAdjacentHTML('beforeend',i)
	})
	//Side: Show file pathname
	let fspath = document.querySelector('p[id=fs-path]')
	const fspathInit = await window.fs.path()
	fspath.innerHTML = fspathInit
}

fsfunc()

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

// Directory response
document.getElementById('fs-openDir').addEventListener('click', async () => {
	const fstest = await window.fs.getDir()
	let fspath = document.querySelector('p[id=fs-path]')
	if(typeof fstest !== 'undefined'){
		fspath.innerHTML = fstest
	}
})
