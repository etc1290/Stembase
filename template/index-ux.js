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
	const {tagset,nameset,pathset} = await window.tag.getdb()
	return {tagset,nameset,pathset}	
}
	//Side: Tag match
const tagmatch = async()=>{
	//const {tagset:tag,fileset:file} = await taggetdb()
	const {tagset:tag,nameset:name,pathset:path} = await taggetdb()
	const tagsearchbar = document.getElementById('tag-search')
	const updateDiv = document.getElementById('tag-match-div')
	const taglist = document.getElementById('tag-matchlist-tag')
	const namelist = document.getElementById('tag-matchlist-name')
	const pathlist = document.getElementById('tag-matchlist-path')
	taglist.value = JSON.stringify(tag) 
	namelist.value= JSON.stringify(name)
	pathlist.value= JSON.stringify(path)
	//filelist.value = JSON.stringify(file)
		// Initialize match area
	document.addEventListener('click', (e)=>{
		const isInBoundary = [tagsearchbar,updateDiv].some(i => e.composedPath().includes(i))
		if(!isInBoundary){
			updateDiv.style.height = 0
		}
	})
		// Expand match area
	tagsearchbar.addEventListener('click', ()=>{
		updateDiv.style.height = '20vh'
	})
		// Main match function
	tagsearchbar.addEventListener('input', ()=>{
		const tag = JSON.parse(taglist.value)
		const path = JSON.parse(pathlist.value)
		const name = JSON.parse(namelist.value)
		const input = tagsearchbar.value.toLowerCase()	
		const tagmatch = tag.filter(v =>v.includes(input))
		const namematch = name.filter(v =>v.includes(input))
		const matchResult = tagmatch.concat(namematch)
		const matchBlocks = []
		const displayNum = Math.min(5,matchResult.length)
		for(var i=0;i<displayNum;i++){
			matchBlocks.push(`<button class='tag-match-block'>` + matchResult[i] +`</button><br>`)
			
		}
		updateDiv.innerHTML = matchBlocks.join('')
		const matchBlockbtn = document.querySelectorAll('button[class=tag-match-block]')
		matchBlockbtn.forEach(e =>{
			e.addEventListener('click',()=>{
				tagsearchbar.value = e.innerHTML
			})
		})
		
	})
	
}
	//Side: Tag search 
const tagsearch = ()=>{
	const tagbtn = document.getElementById('tag-searchbtn')
	const updateDiv = document.getElementById('tag-search-output')
	const taginput = document.getElementById('tag-search')
	const taglist = document.getElementById('tag-matchlist-tag')
	const namelist = document.getElementById('tag-matchlist-name')
	const pathlist = document.getElementById('tag-matchlist-path')
	
	tagbtn.addEventListener('click', async()=>{
		const tag = JSON.parse(taglist.value)
		const path = JSON.parse(pathlist.value)
		const name = JSON.parse(namelist.value)
		const input = taginput.value
		const tagmatch = tag.filter(v => v.includes(input))
		const namematch = name.reduce((val, i, idx) => val = i == input ? [...val, idx] : val, [])
		console.log(tagmatch)
		console.log(namematch)
		const searchTagInfo = `<em class ='taglabel-info'>Tag</em></div><br>`
		const searchBlocks = []
		for(var i=0;i<tagmatch.length;i++){
			const searchLabel = `<div class = 'tag-search-block'><button class='taglabel'>` + tagmatch[i] + `</button>`
			searchBlocks.push(searchLabel + searchTagInfo)
		}
		for(var i=0;i<namematch.length;i++){
			const searchLabel = `<div class = 'tag-search-block'><button class = 'filelabel'>` + name[namematch[i]] + `</button>`
			const searchInfo = `<em class = 'filelabel-info'>` + path[namematch[i]] + `</em></div><br>`
			searchBlocks.push(searchLabel + searchInfo)
		}
		console.log(searchBlocks)
		updateDiv.innerHTML = searchBlocks.join('')

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

