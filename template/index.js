
// Testing function
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// FileSystem
	//Main: Show filenames
const fsfunc = async (v) => {
	const response = await window.fs.main(v)
	let updateDiv = document.querySelector('div[id=fs-main]')
	updateDiv.innerHTML=''
	response.forEach(i=>{
		i = `<button class='fs-data'>` + i + `</button><br>`
		updateDiv.insertAdjacentHTML('beforeend',i)
	})

}
//Initailizer

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
	let fspath = document.querySelector('p[id=fs-path]')
	const fsbrowse = await window.fs.getDir()
	fsfunc(fsbrowse)
	if(typeof fsbrowse !== 'undefined'){
		fspath.innerHTML = fsbrowse
	}
})
