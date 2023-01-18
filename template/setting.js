
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
	//Main:	Autofill
const init = async () =>{
	var idArray = Array.prototype.map.call(document.querySelectorAll('input[class=option]'),function (element){return element.id})
	idArray.forEach(async(i) => {
		document.getElementById(i).value = await window.st.read(i)
	})
	
	
}

init()
