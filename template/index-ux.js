//Tagging System
	//Side: Tag get datalist
const taggetdb = async()=>{
	const taglist = document.getElementById('tag-matchlist-tag')
	const namelist = document.getElementById('tag-matchlist-name')
	const pathlist = document.getElementById('tag-matchlist-path')
	const {tagset,nameset,pathset} = await window.tag.getdb()
	taglist.value = JSON.stringify(tagset) 
	namelist.value= JSON.stringify(nameset)
	pathlist.value= JSON.stringify(pathset)
	return {tagset,nameset,pathset}	
}
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
		await taggetdb()
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
	// Side: Refresh
const tagfunc = async (name) =>{
	tagmain(name)
	tagdisplay(name)	
}

	// Init: User Interactive Design
const uxselect = async (name) =>{
	document.getElementById('ux-info').value = name
	document.getElementById('ux-selected').innerHTML = name	
	tagfunc(name)
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
	const inputBlock = document.querySelectorAll('input[class=input-field]')
	inputBlock.forEach(e=>{
		e.addEventListener('click',()=>{
			e.select()
		})	
	})
}


	//Side: Tag match
const tagmatch = async()=>{
	//const {tagset:tag,fileset:file} = await taggetdb()
	const {tagset:tag,nameset:name,pathset:path} = await taggetdb()
	const tagsearchbar = document.getElementById('tag-search')
	const updateDiv = document.getElementById('tag-match-div')
	const tagbtn = document.getElementById('tag-searchbtn')
	const taglist = document.getElementById('tag-matchlist-tag')
	const namelist = document.getElementById('tag-matchlist-name')
	const pathlist = document.getElementById('tag-matchlist-path')
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
		const evt = new Event('click')
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
			e.addEventListener('dblclick',()=>{
				tagbtn.dispatchEvent(evt)
			})
		})
		
	})
	
}
	// Label function
const tagLabelfunc = ()=>{
	const searchFilebtn= document.querySelectorAll('button[class=filelabel]')
	const tooltipArea = document.querySelectorAll('em[class=tooltip]')
	const pathArea = document.querySelectorAll('em[class=filelabel-info]')
	
	searchFilebtn.forEach(e=>{
		e.addEventListener('click',()=>{	
			uxselect(e.innerHTML)
			try{
				fsfunc(e.nextSibling.innerHTML.slice(0,-1))
			}catch{
				fsfunc(e.nextSibling.innerHTML)
			}		
		})
	})
	for(let i=0;i<tooltipArea.length;i++){
		tooltipArea[i].addEventListener('mouseover',()=>{			
			tooltipArea[i].style.display = 'block'
		})
		tooltipArea[i].addEventListener('mouseleave',()=>{
			tooltipArea[i].style.display = 'none'
		})
		pathArea[i].addEventListener('mouseover',()=>{
			tooltipArea[i].style.display = 'block'
		})
		pathArea[i].addEventListener('mouseleave',()=>{
			tooltipArea[i].style.display = 'none'
		})
		tooltipArea[i].style.width = tooltipArea[i].innerHTML.length *7.5 + 'px'
		
	}
}
	// Label contents 
const tagFileCreator = (pathset,fileset)=>{
	const updateDiv = document.getElementById('tag-search-output')
	const searchbar = document.getElementById('tag-searchbar')
	const searchBlocks = []
	let pathdata = ''
	for(var i=0;i<fileset.length;i++){
		
		const maxLength = 30
		const infoset = []
		infoset[i] = pathset[i].split('\\')
		const pathhead = infoset[i][0]
		const textLength = pathhead.length 
		const trimLength = maxLength - textLength - 5
		if(pathset[i].length>30){
			infoset[i].splice(0,1)
			infoset[i].splice(infoset[i].length-1,1)
			const pathinfo = infoset[i].join('\\')
			const infohead = Math.ceil(trimLength/2)
			const infotail = Math.floor(trimLength/2)
			const pathhand = pathinfo.substring(0,infohead)
			const pathleg = pathinfo.substring(pathinfo.length - infotail)
			pathdata = pathhead + '\\' + pathhand + '...' + pathleg + '\\'
		}else{
			pathdata = pathset[i]
		}
		
		const searchLabel = `<div class = 'tag-search-block'><button class = 'filelabel'>` + fileset[i] + `</button>`
		const searchTooltip = `<em class = 'tooltip'>` + pathset[i] + fileset[i] + `</em></div>`
		const searchInfo = `<em class = 'filelabel-info'>` + pathdata + `</em></div><br>`
		searchBlocks.push(searchLabel + searchTooltip + searchInfo)
	}
	updateDiv.innerHTML = searchBlocks.join('')
	tagLabelfunc()
} 
const taglabel = (queryset,isTag = true)=>{
	let pathset = []
	let fileset = []
	if(isTag){
		for(var i=0;i<queryset.length;i++){
			
			fileset.push(queryset[i].split('\\').pop()) 
			pathset.push(queryset[i].slice(0,-fileset[i].length))
		}
		tagFileCreator(pathset,fileset)
	}else{
		
	}
}
	//Side: Tag search 
const tagsearch = ()=>{
	const tagbtn = document.getElementById('tag-searchbtn')
	const updateDiv = document.getElementById('tag-search-output')
	const taginput = document.getElementById('tag-search')
	const taglist = document.getElementById('tag-matchlist-tag')
	const namelist = document.getElementById('tag-matchlist-name')
	const pathlist = document.getElementById('tag-matchlist-path')
	
	
	//Main: Search function
	tagbtn.addEventListener('click', async()=>{
		const evt = new Event('click')
		const tag = JSON.parse(taglist.value)
		const path = JSON.parse(pathlist.value)
		const name = JSON.parse(namelist.value)
		const input = taginput.value
		const tagmatch = tag.filter(v => v.includes(input))
		const namematch = name.reduce((val, i, idx) => val = i == input ? [...val, idx] : val, [])
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
		
		
		// Display search result
		updateDiv.innerHTML = searchBlocks.join('')
		const searchBlockbtn = document.querySelectorAll('div[class=tag-search-block]')
		const searchTagbtn = document.querySelectorAll('button[class=taglabel]')
		
		//Side: Function of search results
			//Connection of main and info
		searchBlockbtn.forEach(e=>{
			e.children[1].addEventListener('click',()=>{
				e.children[0].dispatchEvent(evt)
			})	
		})
			//Tag label function	
		searchTagbtn.forEach(e=>{
			e.addEventListener('click',async()=>{
				const queryset = await window.tag.query(e.innerHTML)
				taglabel(queryset)			
			})		
		})
		tagLabelfunc()
		
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


