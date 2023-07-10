
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
			const optionStr = document.getElementById('st-record').value
			const optionArr = optionStr.split(',')
			if (optionArr.indexOf(e.id)==-1){				
				optionArr.push(e.id)
			}
			document.getElementById('st-record').value = ''+optionArr
		})
	})
}
	//Side: Write 
const stWrite = async () =>{
	document.getElementById('st-write').addEventListener('click', async () =>{
		const editedOpt = document.getElementById('st-record').value.split(',')		
		editedOpt.shift()
		editedOpt.forEach(async(i) =>{
			const v = document.getElementById(i).value
			await window.st.write(i,v)
		})
		document.getElementById('st-message').innerHTML = 'To take effect, restart the app is required.'
	})
}
	//Side: Reset
const stReset = async () =>{
	document.getElementById('st-reset').addEventListener('click', () =>{
		const editedOpt = document.getElementById('st-record').value.split(',')
		editedOpt.shift()
		editedOpt.forEach(async(i) =>{
			document.getElementById(i).value = await window.st.read(i)
		})		
	})
}
	//Side: Testroom
const stTest = () =>{
	document.getElementById('cw-codelab').addEventListener('click', async () =>{
		const clCreateWindow = await window.cw.codelab()
	})
	document.getElementById('cw-stylelab').addEventListener('click', async () =>{
		const slCreateWindow = await window.cw.stylelab()
	})
	
}

	//Side: Scan monitored groups
const stmntGroupscan = ()=>{
	document.getElementById('mnt-groupscan').addEventListener('click',async()=>{
		const isFinished = await window.mnt.groupscan()
		console.log(isFinished)
	})
}
	// Testfunc
const testfunc = async () =>{
	const apple = await window.cw.codelab()
	const bapple = await window.cw.stylelab()
}
const init = async ()=>{
	stAutoFill()
	stWrite()
	stReset()
	stRecord()
	stTest()
	stmntGroupscan()
}
init()
