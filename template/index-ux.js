//Tagging System

	//Side: Tag get datalist
const taggetdb = async()=>{
	/*
	const taglist = document.getElementById('tag-matchlist-tag')
	const namelist = document.getElementById('tag-matchlist-name')
	const pathlist = document.getElementById('tag-matchlist-path')
	const {tagset,nameset,pathset} = await window.tag.getdb()
	taglist.value = JSON.stringify(tagset) 
	namelist.value= JSON.stringify(nameset)
	pathlist.value= JSON.stringify(pathset)
	return {tagset,nameset,pathset}	*/
}
	// Main: Tag add
const tagmain = (name) =>{
	const tagbtn = document.getElementById('tag-btn')
	tagbtn.innerHTML = ''
	tagbtn.insertAdjacentHTML('beforeend',`<button id='tag-write'>Tag button</button>`)
	document.getElementById('tag-write').addEventListener('click', async()=>{
		const taginput 	= document.getElementById('tag-input').value
		const tagpath	= document.getElementById('fs-path').innerHTML
		const tagwrite = await window.tag.main(name,taginput,tagpath)
		tagdisplay(name)
		//taggetdb()
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
	console.log(taginfo)
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
			const tagpath = document.getElementById('fs-path').innerHTML
			const tagremove = await window.tag.remove(file,tag,tagpath)
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
	
	const tagsearchbar = document.getElementById('tag-search')
	const updateDiv = document.getElementById('tag-match-div')
	const tagbtn = document.getElementById('tag-searchbtn')
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
	tagsearchbar.addEventListener('input',async()=>{
		const evt = new Event('click')
		const input = tagsearchbar.value
		const matchBlock = []
		const tagset = await tag.match(input)
		for(var i=0;i<tagset.length;i++){
			matchBlock[i] = `<button class='tag-match-block tag-match-block-tag'>` + tagset[i] + `</button><br>`
		}
		updateDiv.innerHTML = matchBlock.join('')
		const matchBlockbtn = document.querySelectorAll('button.tag-match-block')
		matchBlockbtn.forEach(e=>{
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
	const searchFilebtn= document.querySelectorAll('button.filelabel')
	const tooltipArea = document.querySelectorAll('em.tooltip')
	const displayArea = document.querySelectorAll('button.filelabel,em.filelabel-info,button.taglabel,em.taglabel-info')
	
	for(let i=0;i<searchFilebtn.length;i++){
		searchFilebtn[i].addEventListener('click',()=>{
			const tooltip = tooltipArea[i]
			console.log(tooltip)
			const path = tooltip.innerHTML.split('\\')
			const filename = path.pop()
			uxselect(filename)			
			fsfunc(path.join('\\'))
		})
	}
	for(var i=0;i<displayArea.length;i++){
		const v = Math.floor(i/2)
		
		displayArea[i].addEventListener('mouseover',()=>{
			tooltipArea[v].style.display = 'block'
		})
		displayArea[i].addEventListener('mouseleave',()=>{
			tooltipArea[v].style.display = 'none'
			
		})
		tooltipArea[v].style.width = tooltipArea[v].innerHTML.length *7.5 + 'px'
		
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
	//Side: Truncate the display path
const Truncation = (path)=>{
	const maxLen = 20
	const bricks = path.split('\\')
	const drive = bricks[0]
	const pathLen = bricks.length
	const filename = bricks[pathLen-1]
	const currLen = drive.length + filename.length
	const extraLen = maxLen - currLen - 5
	if(extraLen > 0){
		bricks.splice(0,1)
		bricks.splice(pathLen - 1,1)
		const newpath = bricks.join('\\')
		const vorLen = Math.ceil(extraLen / 2)
		const hinterLen = Math.floor(extraLen/2)
		const vorpath = newpath.substring(0,vorLen)
		const hinterpath = newpath.substring(pathLen - hinterLen)
		output = drive + '\\' + vorpath + '...' + hinterpath + '\\' + filename
		return output
	}else{
		return path
	}
}
	//Side: Tag search 
const tagsearch = ()=>{
	const tagbtn = document.getElementById('tag-searchbtn')
	const updateDiv = document.getElementById('tag-search-output')
	const taginput = document.getElementById('tag-search')
	//Main: Search function
	tagbtn.addEventListener('click', async()=>{
		const evt = new Event('click')
		const input = taginput.value
		const tagset = await tag.query(input)
		
		const nameset = await tag.query(input,false)
		
		const searchBlock = []
		const searchTagLabel = `<div class = 'tag-search-block'><button class='taglabel'>`
		const searchTagInfo = `</button><em class ='taglabel-info tooltip'>Tag</em></div><br>`
		for(var i=0;i<tagset.length;i++){
			const newpath = Truncation(tagset[i])
			searchBlock[i] = searchTagLabel + tagset[i] + searchTagInfo
		}
		for(var i=0;i<nameset.length;i++){
			const name = nameset[i]
			const path = name.substring(0,name.lastIndexOf('\\') + 1)
			let pathcut = ''
			if(path.length > 20){
				pathcut = path.substring(0,17) + `...`
			}else{
				pathcut = path
			}
			const file = name.substring(name.lastIndexOf('\\') + 1,name.length)
			const searchNameLabel = `<div class = 'tag-search-block'><button class = 'filelabel'>` + file + `</button><br>`
			const searchNameInfo = `<em class = 'filelabel-info'>` + pathcut + `</em>`
			const searchNameTooltip=`<em class = 'tooltip'>` + path + `</em></div>`
			searchBlock[i+tagset.length] = searchNameLabel + searchNameInfo + searchNameTooltip
		}
		
		// Display search result
		updateDiv.innerHTML = searchBlock.join('')
		const searchBlockbtn = document.querySelectorAll('div.tag-search-block')
		const searchTagbtn = document.querySelectorAll('button.taglabel')
		
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
				//const queryset = await window.tag.query(e.innerHTML)
				console.log(e.innerHTML)
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


