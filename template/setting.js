
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
const stAutoFill = async () =>{
	var idArray = Array.prototype.map.call(document.querySelectorAll('input[class=option]'),function (element){return element.id})
	idArray.forEach(async(i) => {
		document.getElementById(i).value = await window.st.read(i)
	})	
}
	//Side: Record
const stRecord = () =>{
	document.querySelectorAll('input[class=option').forEach((e) =>{
		e.addEventListener('input', ()=>{
			document.getElementById('st-record').value+=','+e.id
		})
	})
}
	//Side: Write 
const stWrite = async () =>{
	document.getElementById('st-write').addEventListener('click', async () =>{
		//await window.st.write('Width',1280)
	})
}
	//Side: Reset
const stReset = async () =>{
	console.log('reset test')
}

const init = async ()=>{
	stAutoFill()
	stWrite()
	stReset()
	stRecord()
}
init()
