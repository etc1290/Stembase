


const mntfunc = ()=>{
	const mntdata = document.querySelectorAll('.mnt-data')
	for(let i=0;i<mntdata.length;i++){
		mntdata[i].addEventListener('dblclick',()=>{
			console.log(mntdata[i].innerHTML)
			floorNum = 'fs-floor-0'
			fsfunc(mntdata[i].innerHTML)
		})
	}
}
// Main:	Load all monitored data
const mntmain = async()=>{
	const mntdata = []
	const updateDiv = document.getElementById('mnt-main-display')
	const mntset = await window.mnt.main()
	for(var i=0;i<mntset.length;i++){
		mntdata[i] = `<p class='mnt-data'>` + mntset[i] + `</p>`
	}
	updateDiv.innerHTML = mntdata.join('')
	mntfunc()
}
//Initailizer
const mntInit = ()=>{
	mntmain()
}
mntInit()