// Global in Tagging System
let isMonitored = false
//Tagging System

	// Main: Tag add
const tagmain = (name) =>{
	document.getElementById('tag-write').addEventListener('click', async()=>{
		const taginput 	= document.getElementById('tag-input').value
		const tagpath 	= fsgetPath()
		const name 		= document.getElementById('ux-selected').innerHTML
		if (taginput == ''){
			const inputError = await window.tag.error('taginput')
		}else{		
		// Link to Monitor System 
			const isMonitored = await window.tag.main(name,taginput,tagpath)
			if(!isMonitored){
				mntmain()
			}
			tagdisplay(name)
		}		
	})
}

	// Side: Tag display
const tagdisplay = async (name) =>{
	const tagpath = fsgetPath(true)
	isMonitored = await window.tag.monitor(tagpath)
	const queryset = []
	if(isMonitored[0]){
		const taginfo 	= await window.tag.info(name,tagpath)	
		if(!taginfo){
			queryset[0] = 'No Tag found'
		}else{
			for (var i=0;i<taginfo.length;i++){
				queryset[i] = `<button class='tag-label'>` + taginfo[i] + `</button><br>` 
			}
		}		
	}else{
		queryset[0] = 'Not Monitored'
	}
	tagupdate('tag-display',queryset)
}

	// Init: User Interactive Design
const uxselect = async (name) =>{
	document.getElementById('ux-selected').innerHTML = name	
	tagdisplay(name)
}
	//Side: Tag delete
const tagdelete = async () =>{
	const tagDeletedbtn = document.getElementById('tag-delete')
	
	tagDeletedbtn.addEventListener('click', async(e) =>{
		const file = document.getElementById('ux-selected').innerHTML
		const tag = document.getElementById('tag-selected').innerHTML
		const tagpath = fsgetPath()
		const tagremove = await window.tag.remove(file,tag,tagpath)
		tagdisplay(file)		
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
		//const evt = new Event('click')
		const input = tagsearchbar.value
		const matchBlock = []
		const tagset = await tag.match(input)
		for(var i=0;i<tagset.length;i++){
			matchBlock[i] = `<button class='tag-match-block tag-match-block-tag'>` + tagset[i] + `</button><br>`
		}
		tagupdate('tag-match-div',matchBlock)
		
	})
	
}
	// Label function
const tagLabelfunc = ()=>{
	const fileLabelbtn= document.querySelectorAll('button.filelabel')
	const tagLabelbtn = document.querySelectorAll('button.taglabel')
	const tooltipArea = document.querySelectorAll('em.tooltip')
	const displayArea = document.querySelectorAll('button.filelabel,em.filelabel-info,button.taglabel,em.taglabel-info')
	const tagLen = tagLabelbtn.length
	// Tag Label
	for(let i=0;i<tagLen;i++){
		tagLabelbtn[i].addEventListener('click',async()=>{
			const tag = tagLabelbtn[i].innerHTML
			const queryset = await window.tag.query(tag,'nameref','tagref')
			console.log(queryset)
			const searchBlock = tagsearch().file(queryset)
			tagupdate('tag-search-output',searchBlock)
		})
	}
	// File Label
	for(let i=0;i<fileLabelbtn.length;i++){
		fileLabelbtn[i].addEventListener('click',async()=>{
			const tooltip = tooltipArea[i + tagLen]
			const path = tooltip.innerHTML.split('\\')	
			path.pop()
			const filename = fileLabelbtn[i].innerHTML			
			const signal = await fsfunc(path.join('\\'))
			if(signal){
				uxselect(filename)
			}
		})
	}
	// Display Tooltip
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
	//Side: Truncate the display path this is not applied in anywhere now
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
	//Side:	Label Renderer
const tagfuncarr = []
//Match 
tagfuncarr['tag-match-div'] = () =>{
	const matchBlockbtn = document.querySelectorAll('button.tag-match-block')
	const tagsearchbar = document.getElementById('tag-search')
	const tagbtn = document.getElementById('tag-searchbtn')
	matchBlockbtn.forEach(e=>{
		e.addEventListener('click',()=>{
			tagsearchbar.value = e.innerHTML
		})
		e.addEventListener('dblclick',()=>{
			tagbtn.dispatchEvent(new Event('click'))
		})
	})
}
		//Search 
tagfuncarr['tag-search-output'] = () =>{
	const searchBlockbtn = document.querySelectorAll('div.tag-search-block')
	const searchTagbtn = document.querySelectorAll('button.taglabel')
	searchBlockbtn.forEach(e=>{
		e.children[1].addEventListener('click',()=>{
			e.children[0].dispatchEvent(new Event('click'))
		})	
	})
	tagLabelfunc()
}				
		//Tag
tagfuncarr['tag-display'] = ()=>{
	const tagbtn = document.querySelectorAll('button[class=tag-label]')
	tagbtn.forEach(e =>{
		e.addEventListener('dblclick', () =>{
			console.log(e.innerHTML)// The port of Tag interface
		})
		e.addEventListener('mousedown', () =>{
			document.getElementById('tag-selected').innerHTML = e.innerHTML
		})
	})
}
	// Write on screen 
const tagupdate = (areaName,queryset)=>{
	
	const content = queryset.join('')
	const updateDiv = document.getElementById(areaName)
	updateDiv.innerHTML = content
	tagfuncarr[areaName]()
}
	//Side: Tag search 
const tagsearch = ()=>{
	const tagbtn = document.getElementById('tag-searchbtn')
	const taginput = document.getElementById('tag-search')
	//Main: Search function
	let searchBlock = []
	let tagset = ''
	const fileProcessor = (nameset,searchBlock=[]) =>{
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
		return searchBlock
	}
	tagbtn.addEventListener('click', async()=>{
		searchBlock = []
		const input = taginput.value
		tagset = await tag.query(input,'tagref','tagref')
		const fileset = await tag.query(input,'nameref','nameref',false)
		const searchTagLabel = `<div class = 'tag-search-block'><button class='taglabel'>`
		const searchTagInfo = `</button><em class ='taglabel-info tooltip'>Tag</em></div><br>`
		for(var i=0;i<tagset.length;i++){
			searchBlock[i] = searchTagLabel + tagset[i] + searchTagInfo
		}		
		fileProcessor(fileset,searchBlock)	
		tagupdate('tag-search-output',searchBlock)		
	})
	return {
		file : fileProcessor
	}
}
	// Init
const tagInit = () =>{
	tagmain()
	tagdelete()
	tagfocus()
	tagsearch()
	tagmatch()
}
tagInit()


