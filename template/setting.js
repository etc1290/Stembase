
const testfunc = async ()=>{
	const apple = await window.st.test('st-test')
}

testfunc() 

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

//WindowSetting
const init = async () =>{
	//const apple = document.querySelector('input[class=option]')
	//console.log(apple)
	document.getElementById('Width').value = await window.st.read('Width')
	
}

init()
