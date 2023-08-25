const boxHeader = {
	'mnt-groupdelete':`Groups Delete Confirmation`,
	'mnt-removemenu-delete':`Members Delete Confirmation`
}
const boxContent= {
	'mnt-groupdelete':`This action cannot be reverted.\n
		Monitored members will remain,
		but group will gone forever.`,
	'mnt-removemenu-delete':`This action cannot be reverted.\n
		tags will remain,
		but all files in this folder will be un-monitored`
}
const boxButton = {
	'mnt-groupdelete':`<p id='box-yes' class='box-btn box-close'>OK</p>
		<p id='box-no' class='box-btn box-close'>Cancel</p>`,
	'mnt-removemenu-delete':`<p id='box-yes' class='box-btn box-close'>OK</p>
		<p id='box-no' class='box-btn box-close'>Cancel</p>`
}

// Create custom message box
const boxCreate = (mode)=>{
	const box = document.getElementById('box')
	box.classList.add('visible')
	const header = document.getElementById('box-header')
	const content= document.getElementById('box-content')
	const btn	 = document.getElementById('box-container')
	const filter = document.getElementById('box-filter')
	header.innerHTML = boxHeader[mode]
	content.innerHTML= boxContent[mode]
	btn.innerHTML	 = boxButton[mode]	
}
const boxFunc = ()=>{
	const main = document.getElementById('box-main')
	// Box close operation
	main.addEventListener('click',(event)=>{
		const isClose = event.target.classList.contains('box-close')
		if(isClose){
			const box = document.getElementById('box')
			box.classList.remove('visible')
		}
	})
	document.getElementById('box-filter').addEventListener('click',()=>{
		console.log('1121')
	})
}
const boxInit = ()=>{
	boxFunc()
}
boxInit()