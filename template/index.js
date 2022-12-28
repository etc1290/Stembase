
// Testing function
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// FileSystem
const func = async () => {
    const response = await window.fs.main()
    console.log(response)
	response.forEach(function (item, i){
		document.getElementById('fs-dir').innerHTML += '<h2>' + item + '</h2>'
	})
	
}

func()

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
	await window.fs.getDir().then(console.log("response"))
})
