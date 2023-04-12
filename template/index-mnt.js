
// Side:	Monitored group collapse and expand
const mntfold = ()=>{
	const mntheader = document.querySelectorAll('.mnt-folder-header')
	const mntcontent = document.querySelectorAll('.mnt-folder-content')
	for(let i=0;i<mntheader.length;i++){
		mntheader[i].addEventListener('click',()=>{
			console.log(mntcontent[i].style.height)
			if(mntcontent[i].style.height=='0px'){
				mntcontent[i].style.height = 'auto'
			}else{
				mntcontent[i].style.height = '0px'
			}
		})
	}
}
// Side:	Jump to monitored path
const mntfunc = ()=>{
	const mntdata = document.querySelectorAll('.mnt-data')
	for(let i=0;i<mntdata.length;i++){
		mntdata[i].addEventListener('dblclick',()=>{
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
		
}
//Initailizer
const mntInit = ()=>{
	mntmain()
	mntfold()
	mntfunc()
}
mntInit()