//Tagging System
	// Main: Tag add
const tagmain = async (name) =>{
	const tagbtn = document.getElementById('tag-btn')
	tagbtn.innerHTML = ''
	tagbtn.insertAdjacentHTML('beforeend',`<button id='tag-write'>Tag button</button>`)
	document.getElementById('tag-write').addEventListener('click', async()=>{
		const taginput 	= document.getElementById('tag-input').value
		const tagpath	= document.getElementById('fs-path').innerHTML
		const tagwrite 	= await window.tag.main(name,taginput,tagpath)
		tagdisplay(name)
	})
}
	// Side: Tag button function
const tagbtnInit = () =>{
	const tagbtn = document.querySelectorAll('button[class=tag-label]')
	tagbtn.forEach(e =>{
		e.addEventListener('dblclick', () =>{
			console.log(e.innerHTML)
		})
		e.addEventListener('mousedown', () =>{
			document.getElementById('tag-selected').value = e.innerHTML
			const tagList = Array.from(document.querySelectorAll('button[class=tag-label]'))
			const tagInnerList = tagList.map(function(e){return e.innerHTML})
			const tagindex = tagInnerList.indexOf(e.innerHTML)
			document.getElementById('tag-selected-id').value = tagindex
			document.getElementById('tag-info').innerHTML =''
		})
	})
}

	// Side: Tag display
const tagdisplay = async (name) =>{
	const updateDiv = document.getElementById('tag-display')
	const tagpath	= document.getElementById('fs-path').innerHTML
	const taginfo 	= await window.tag.info(name,tagpath)
	updateDiv.innerHTML  = ''
	if(taginfo == 'None'){
		updateDiv.insertAdjacentHTML('beforeend','No tags found')
	}else{ 
		taginfo.forEach(e =>{
			const taglabel = `<button class='tag-label'>` + e + `</button><br>` 
			updateDiv.insertAdjacentHTML('beforeend',taglabel)
		})
		tagbtnInit()		
	}
}
	//Side: Tag delete
const tagdelete = async () =>{
	const tagDeletedbtn = document.getElementById('tag-delete')
	
	tagDeletedbtn.addEventListener('click', async(e) =>{
		const file = document.getElementById('ux-selected').innerHTML
		const tag = document.getElementById('tag-selected').value
		if (tag!==''){
			const id = document.getElementById('tag-selected-id').value
			const tagpath = document.getElementById('fs-path').innerHTML
			const tagremove = await window.tag.remove(file,tag,id,tagpath)
			document.getElementById('tag-selected-id').value =''
			tagdisplay(file)
		}else{
			const taginfo = document.getElementById('tag-info')
			taginfo.innerHTML = 'Tag is not selected'
		}
		
	})
}
	//Side: Auto selected
const tagfocus = ()=>{
	const inputBlock = document.getElementById('tag-input')
	inputBlock.addEventListener('click', (e)=>{
		inputBlock.select()
	})
}
	//Side: Tag get datalist
const taggetdb = async()=>{
	const {tagset,fileset} = await window.tag.getdb()
	return {tagset,fileset}	
}
	//Side: Tag match
const tagmatch = async()=>{
	const {tagset:tag,fileset:file} = await taggetdb()
	const tagsearchbar = document.getElementById('tag-search')
	const updateDiv = document.getElementById('tag-match-div')
	const taglist = document.getElementById('tag-matchlist-tag')
	const filelist = document.getElementById('tag-matchlist-file')
	taglist.value = JSON.stringify(tag) 
	filelist.value = JSON.stringify(file)
	tagsearchbar.addEventListener('input', ()=>{
		const file = JSON.parse(filelist.value)
		const tag = JSON.parse(taglist.value)
		updateDiv.innerHTML =''
		for(var i=0,n=Math.min(5,tag.length,file.length);i<n;i++){
			const tagoutput = `<button id='tag-match-result'>` + tag[i] + `</button><br>`
			updateDiv.insertAdjacentHTML('beforeend',tagoutput)
		}
	})
	
}
	//Side: Tag search 
const tagsearch = ()=>{
	const tagbtn = document.getElementById('tag-searchbtn')
	const updateDiv = document.getElementById('tag-search-output')
	const taginput = document.getElementById('tag-search')
	tagbtn.addEventListener('click', async()=>{
		const input = taginput.value
		const rawArray = await window.tag.query(input)
		let result=''
		if(input){
			result = rawArray
		}else{
			result = Object.keys(rawArray)
		}
		updateDiv.innerHTML = ''
		for(var i=0,n=result.length;i<n;i++){
			const tagoutput = `<div id='tag-search-result'><p>` + result[i] + `</p>`
			const tagdetail = `<em> this is a italics words test</em></div>`
			updateDiv.insertAdjacentHTML('beforeend',tagoutput + tagdetail)
		}
	})
}
	// Init
const tagInit = () =>{
	tagdelete()
	tagfocus()
	tagsearch()
	tagmatch()
}
tagInit()
	// Refresh
const tagfunc = async (name) =>{
	tagmain(name)
	tagdisplay(name)	
}

// User Interactive Design
const uxselect = async (name) =>{
	document.getElementById('ux-info').value = name
	document.getElementById('ux-selected').innerHTML = name	
	tagfunc(name)
}

