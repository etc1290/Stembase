//Tagging System
const tagfunc = (name) =>{
	const tagbtn = document.getElementById('tag-btn')
	tagbtn.innerHTML = ''
	tagbtn.insertAdjacentHTML('beforeend',`<button id='tag-write'>Tag button</button>`)
	document.getElementById('tag-write').addEventListener('click', e=>{
		console.log(name)
	})
}


// User Interactive Design
const uxselect = async (name) =>{
	document.getElementById('ux-info').value = name
	document.getElementById('ux-selected').innerHTML = name
	tagfunc(name)
}

