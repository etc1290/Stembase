//Tagging System
const tagfunc = async (name) =>{
	const tagbtn = document.getElementById('tag-btn')
	tagbtn.innerHTML = ''
	tagbtn.insertAdjacentHTML('beforeend',`<button id='tag-write'>Tag button</button>`)
	document.getElementById('tag-write').addEventListener('click', async()=>{
		const taginput 	= document.getElementById('tag-input').value
		const tagpath	= document.getElementById('fs-path').innerHTML
		const tagwrite 	= await window.tag.main(name,taginput,tagpath)
	})
}


// User Interactive Design
const uxselect = async (name) =>{
	document.getElementById('ux-info').value = name
	document.getElementById('ux-selected').innerHTML = name
	
	tagfunc(name)
}

