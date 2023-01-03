
// Testing function
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// FileSystem
	//Main: File User Interface
const fsfunc = async (path) => {
		//Initialize
	let updateDiv = document.querySelector('div[id=fs-main]')
	updateDiv.innerHTML=''
		//Insert file as button
	const response = await window.fs.main(path)
	response.forEach(i=>{
		i = `<button class='fs-data'>` + i + `</button><br>`
		updateDiv.insertAdjacentHTML('beforeend',i)
	})
		//Browse
	const fsbutton = document.querySelectorAll('button[class=fs-data]')
	fsbutton.forEach(e=>{
		e.addEventListener('click',async()=>{
			fsfunc(e.innerHTML)
		})
	})
		//Show pathname
		let fspath = document.querySelector('p[id=fs-path]')
		console.log(path)
		if (typeof path !== 'undefined'){
			fspath.innerHTML = path
		}
}
	// Side: Directory browser
document.getElementById('fs-openDir').addEventListener('click', async () => {
	
	const fsbrowse = await window.fs.getDir()
	fsfunc(fsbrowse)
	
})
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


