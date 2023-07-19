// Side: 	Drag remake
const mntdragSetup = function() {
  var mntdrag,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments) } }

  mntdrag = (function() {
    function mntdrag(el) {
      this.el = el
      this.dragleave = __bind(this.dragleave, this)
      this.dragenter = __bind(this.dragenter, this)
      if (this.supportsEventConstructors()) {
        this.first = false
        this.second = false
        this.el.addEventListener("dragenter", this.dragenter, false)
        this.el.addEventListener("dragleave", this.dragleave, false)
      }
    }

    mntdrag.prototype.dragenter = function(event) {
      if (this.first) {
        return this.second = true
      } else {
        this.first = true
        return this.el.dispatchEvent(new CustomEvent("mntdrag:enter", {
          bubbles: true,
          cancelable: true,
          detail: {
            dataTransfer: event.dataTransfer
          }
        }))
      }
    }

    mntdrag.prototype.dragleave = function(event) {
      if (this.second) {
        this.second = false
      } else if (this.first) {
        this.first = false
      }
      if (!this.first && !this.second) {
        return this.el.dispatchEvent(new CustomEvent("mntdrag:leave", {
          bubbles: true,
          cancelable: true,
          detail: {
            dataTransfer: event.dataTransfer
          }
        }))
      }
    }

    mntdrag.prototype.removeListeners = function() {
      this.el.removeEventListener("dragenter", this.dragenter, false)
      return this.el.removeEventListener("dragleave", this.dragleave, false)
    }

    mntdrag.prototype.supportsEventConstructors = function() {
      try {
        new CustomEvent("z")
      } catch (_error) {
        return false
      }
      return true
    }

    mntdrag.prototype.reset = function() {
      this.first = false
      return this.second = false
    }

    return mntdrag

  })()
  window.mntdrag = mntdrag
}
// Side:	Monitored unique class picker
const mntclass = (el) =>{
	const idArr = []
	const clsArr = []
	const isElement = el instanceof Element
	if(isElement){
		el = [el]
	}
	for(var i=0;i<el.length;i++){
		const arr = el[i].classList
		const isData = arr.contains('mnt-data')
		let checkClass = 'mnt-usergroup-'
		let n = 14
		if(isData){
			checkClass = 'mnt-data-'
			n = 9
		}
		let uniqClass = arr[1]
		const isUniq = uniqClass.substring(0,n) == checkClass
		if(!isUniq){
			for(var j=0;j<arr.length;j++){
				if(j==1){
					continue
				}
				const cls = arr[j]
				if(cls.substring(0,n) == checkClass){
					uniqClass = cls
					break
				}
			}
		}
		const id = uniqClass.substring(n)
		idArr[i] = id
		clsArr[i]= uniqClass
	}
	if(idArr.length==1){
		return [idArr[0],clsArr[0]]
	}else{
		return [idArr,clsArr]
	}
}
// Side:	Data and groups selector
const mntsort = (arr)=>{
	const groupArr = []
	const dataArr = []
	const groupParent = []
	const dataParent = []
	let g = 0
	let d = 0
	for(var i=0;i<arr['Raw'].length;i++){
		const el = arr['Raw'][i]
		const p = arr['Parent'][i]
		let pid = mntclass(p)[0]
		const isData = el.classList.contains('mnt-data')
		if(isData){
			dataParent[d] = pid
			dataArr[d++] = el
		}else{
			groupParent[g] = pid
			groupArr[g++]= arr['Folderid'][i]
			//console.log(pid)
			//console.log(arr['Folderid'])
		}
	}
	return [groupArr,dataArr,groupParent,dataParent]
}

// Side:	Target class checker
const mntcheck = (event,classname,isCurrent=false)=>{
	if(!event){
		console.log('event is . Did you remember to call it ?')
	}
	if(isCurrent){
		return event.currentTarget.classList.contains(classname)
	}else{
		return event.target.classList.contains(classname)
	}
}
// Side:	Reserved characters replacer
const mntreplace = (name)=>{
	
	const c = '@'
	const isArr = name.constructor == Array
	if(isArr){
		console.log(name)
		for(var i=0;i<name.length;i++){
			name[i] = name[i].replace(/ /g,c)
		}
		return name
	}
	return name.replace(/ /g,c)
}
// Side:	Selected monitored members
const mntselected = (event)=>{
	const selected = document.querySelectorAll('.mnt-selected')
	for(let i=0;i<selected.length;i++){
		selected[i].classList.remove('mnt-selected')
		selected[i].style.background = ''
	}
	if(mntcheck(event,'mnt-data') || mntcheck(event,'mnt-folder-header')){
		event.target.style.background = 'rgb(124,255,192)'
		event.target.classList.add('mnt-selected')
	}else if(mntcheck(event,'mnt-folder-content')){
		event.target.classList.add('mnt-selected')
	}
}
// Side:	Monitored group collapse and expand
const mntfold = ()=>{
	document.body.addEventListener('click',(event)=>{
		const isHeader = mntcheck(event,'mnt-folder-header')
		const folder = event.target.parentNode
		const content = event.target.nextElementSibling
		let subLen = 0
		if(isHeader){
			
			const isExpand = content.classList.contains('mnt-expanding')
			
			content.classList.toggle('mnt-expanding')
			const mainFolder = event.target.closest('.mnt-mainfolder')
			const mainContent = mainFolder.children[1]
			const baseLen = mainContent.childElementCount*21 + 31			
			const subGroup = mainContent.querySelectorAll('.mnt-expanding')
	
			if(subGroup){
				for(let i=0;i<subGroup.length;i++){
					subLen = subLen + subGroup[i].childElementCount*21 + Boolean(subGroup[i]) * 31 
				}
			}
			const mainLen = baseLen + subLen
			const isMain = mainFolder == folder
			if(!isMain){
				mainContent.style.height = mainLen + 'px'
			}
			if(isExpand){
				content.style.height = ''
			}else{
				content.style.height = content.childElementCount*21 + 31 +'px'
			}	
		}		
	})
}
// Side:	Monitored group span adjustment
const mntspan = (content) =>{
	const isExpand = content.classList.contains('mnt-expanding')
	if(isExpand){
		content.style.height = content.childElementCount*21 + 31 + 'px'
	}else{
		content.style.height = ''
	}
	
}
// Side:	The Style of Monitored system
const mntstyle = (target)=>{
	
	for(let i=0;i<target.length;i++){
		const el = target[i]
		el.addEventListener('mouseenter',(event)=>{
			const header = event.currentTarget.querySelector('.mnt-folder-header')
			const content = event.currentTarget.querySelector('.mnt-folder-content')
			const isDropzone = mntcheck(event,'mnt-dropzone',true)
			if(isDropzone){
				header.style.background = 'rgb(124,255,192)'
				content.style.background = 'rgb(235,255,251)'
			}else{
				header.style.background = 'rgb(255,174,189)'
				content.style.background = 'rgb(255,245,247)'
			}
		})
		el.addEventListener('mouseleave',(event)=>{
			const header = event.currentTarget.querySelector('.mnt-folder-header')
			const content = event.currentTarget.querySelector('.mnt-folder-content')
			header.style.background = ''
			content.style.background = ''
		})
	}
}
// Side: 	Rename main function
let oldname = 0
const mntrename = ()=>{
	let newname = 0
	const mainfunc = async()=>{
		// Check if contains reserved or illegal characters
		const censorCheck = (name)=>{
			const censorArr = [
				'`',`'`,'@','!','$',
				'%','^','&','*','\\',
				'+','=','[',']','{',
				'}','/','"',';'
				]
			let isIllegal = false
			for(let i=0;i<censorArr.length;i++){
				isIllegal = name.indexOf(censorArr[i])
				if(isIllegal+1){
					return true
				}
			}
			return false
		}
		const isBanned = censorCheck(newname)
		if(newname.startsWith('&nbsp')){
			const mnterror = await window.mnt.error('mntrename-prefix')
		}else if(newname[0]==' '){
			if(!newname.trim().length){
				const mnterror = await window.mnt.error('mntrename-empty')
			}else{
				const mnterror = await window.mnt.error('mntrename-prefix')
			}
		}else if(isBanned){
			const mnterror = await window.mnt.error('mntrename-censor')
		}else{
			const isReady = await window.mnt.rename(oldname,newname)
			if(isReady){
				const target = document.querySelector('.mnt-editing')
				target.classList.remove('mnt-editing')
				const group = target.parentNode
				mntmenuAddition('create','movemenu')
				target.removeAttribute("contenteditable")
				const cls = mntclass(group)[1]
				const updateArr = document.querySelectorAll('.' + cls)
				for(var i=0;i<updateArr.length;i++){
					const e = updateArr[i]
					e.children[0].innerHTML = newname
				}				
			}
		}	
	}
	document.addEventListener('click',(event)=>{
		const target = document.querySelector('.mnt-editing')
		const isInside = event.target == target
		if(target){
			if(!isInside){
				newname = target.innerHTML
				mainfunc()
			}			
		}
	})
	document.addEventListener('keydown',(event)=>{
		let funcArea
		try{
			funcArea = event.target.closest('.function-section')
		}catch(err){
			funcArea = false
		}
		const isMNT = funcArea.id =='mnt'
		if(isMNT){
			const isEditable = event.target.contentEditable == 'true'	
			event.target.classList.add('mnt-editing')
			if(isEditable){
				newname = event.target.innerHTML
				const isMonitored= mntcheck(event,'mnt-folder-header')
				if(isMonitored){
					if(event.which==13){
						event.preventDefault()
						mainfunc()
					}
				}
			}
		}		
		
	})
}
// Side:	Monitored group loader
const mntgroupwrite = async(target,isMainExec=true) =>{
	const isArr = target.constructor == Array
	if(!isArr){
		target=[target]
	}else{
		target = extUniq(target)
	}
	for(var a=0;a<target.length;a++){
		const header = target[a].children[0]
		const updateDiv = target[a].children[1]
		const isAll = target[a].id == 'mnt-main'
		if(isMainExec){		
			if(isAll){
				mntmain()
				continue
			}
		}else if(isAll){
			continue
		}
		
		let [groupset,[idset,dataset]] = await window.mnt.load(header.innerHTML)
		if(!idset){
			idset = []
			dataset=[]
		}
		const mntdata = []
		const groups = []
		for(var i=0;i<groupset.length;i++){
			
			const modName = groupset[i][0]
			
			const id = `'mnt-` + header.innerHTML + `-group-` + i + `'`
			const subheader = `<p class='mnt-folder-header'>` + groupset[i][1] + `</p>`
			const subcontent= `<div class='mnt-folder-content'></div>`
			const uniqClass = `mnt-usergroup-` + modName
			const subfolder = `<div id=` + id 
				+ ` class='mnt-folder mnt-dropzone ` + uniqClass + ` mnt-subfolder' draggable = 'true'>` 
				+ subheader + subcontent + `</div>`
			groups[i] = subfolder
		}
		for(var i=0;i<dataset.length;i++){
			
			const id = `id='mnt-` + header.innerHTML + `-data-` + i + `'`
			const uniqClass = 'mnt-data-' + idset[i]
			mntdata[i] = `<p ` + id+ ` class='mnt-data ` + uniqClass +`' draggable='true'>` + dataset[i] + `</p>`
		}
		groups.push.apply(groups,mntdata)
		updateDiv.innerHTML = groups.join('')
		mntspan(updateDiv)
	}

}
// Side:	Load data in monitored groups 
const mntgroupload = ()=>{
	document.body.addEventListener('click',async(event)=>{
		const isEditable = mntcheck(event,'mnt-editing')
		const group = event.target.closest('.mnt-folder')
		let isMain = false
		if(group){
			isMain = group.classList.contains('mnt-mainfolder')
		}
		const operator = isEditable + isMain
		if(mntcheck(event,'mnt-folder-header')&&!operator){
			
			if(group.classList.contains('mnt-folder')){
				const content = group.children[1]
				if(!content.innerHTML){
					mntgroupwrite(group)
				}
			}
		}	
	})
}
// Side:	Cancel current actions for contextmenu and drag function
const mntcancel = (event)=>{
	event.preventDefault()
	event.stopPropagation()
	return false
}
// Side:	Function of monitored data
const mntfunc = (target)=>{
	// Data function
	for(let i=0;i<target.length;i++){
		// Jump to monitored path
		const el = target[i]	
		el.addEventListener('dblclick',(event)=>{
			if(mntcheck(event,'mnt-data')){
				floorNum = 'fs-floor-0'
				fsfunc(event.target.innerHTML)
			}		
		})
		// Drag
		
		el.addEventListener('dragstart',(event)=>{
			const e = event.target
			const isFolder = e.classList.contains('mnt-folder')
			if(isFolder){
				e.children[0].classList.add('mnt-selected-drag')
			}else{
				e.classList.add('mnt-selected-drag')
			}
		})
		el.addEventListener('dragend',(event)=>{
			event.target.style.background = ''
			const dragArr = document.querySelectorAll('.mnt-selected-drag')
			for(var i=0;i<dragArr.length;i++){
				dragArr[i].classList.remove('mnt-selected-drag')
			}
			mntcancel(event)
		})
		// Style
		el.addEventListener('mousedown',(event)=>{
			mntselected(event)		
		})
		// Folder Function
			// Drop Folder
		let counter = isExpand = false		
		if(el.classList.contains('mnt-dropzone')){
			el.addEventListener('dragover',(event)=>{
				mntcancel(event)
			})
			el.addEventListener('drop',async(event)=>{
				mntcancel(event)					
				
				const dropFolder = event.target.closest('.mnt-folder')
				const dropid = mntclass(dropFolder)[0]
				const dropName = dropFolder.children[0].innerHTML
				const selected = uxSelect('mnt','drag')
				let [groupArr,dataArr,groupParent,dataParent] = mntsort(selected)
				const has = (cls)=>{
					return dropFolder.classList.contains(cls)
				}
				//Rule Setting
				const isFixed = has('fixed-content')				
				if(isFixed){
					dataArr.length = 0
					dataParent.length = 0
					groupArr.length = 0
					groupParent.length = 0
				}
				const isFolderOnly = has('folder-only')
				if(isFolderOnly){
					dataArr.length = 0
					dataParent.length = 0
				}
				const isDataOnly = has('data-only')
				if(isDataOnly){
					groupArr.length = 0
					groupParent.length = 0
				}
				
				//Source detection
				let grouphash = []
				let datahash = []
				if(groupParent.length){
					[groupParent,groupArr,grouphash] = extRemove(groupParent,dropid,groupArr)
				}
				if(dataParent.length){
					[dataParent,dataArr,datahash] = extRemove(dataParent,dropid,dataArr)
				}					
				if(grouphash.length + datahash.length){
					if(groupArr.length + dataArr.length){
						console.log(526)
						const mnterror = await window.mnt.error('mntdrag-source-multi')
					}else{
						console.log(529)
						const mnterror = await window.mnt.error('mntdrag-source')
						return
					}
				} 
				//Main Function
				const dupArr = []
				const dupGroupArr = []
				let d = 0
				let g = 0
				// Update
				let isUpdate = false
				let isUpdateGroup = false
				if(groupArr.length){					
					const tempArr = [...groupArr].fill(dropid)
					console.log(544)
					const reportArr = await window.mnt.update(tempArr,groupArr,true)
					const pos = reportArr.indexOf(false)
					if(pos + 1){
						for(let i=pos;i<reportArr.length;i++){
							const e = reportArr[i]
							if(e===false){
								dupGroupArr[d++] = groupArr[i]								
							}
						}
					}	
					if(reportArr){
						isUpdate = true
					}
				}else{
					isUpdate = true
				}
				if(isUpdate&&dataArr.length){
					const tempArr = [...dataArr].fill(dropName)
					for(var i=0;i<dataArr.length;i++){
						dataArr[i] = dataArr[i].innerHTML
					}
					const reportArr = await window.mnt.update(tempArr,dataArr)
					const pos = reportArr.indexOf(false)
					if(pos + 1){
						for(let i=pos;i<reportArr.length;i++){
							const e = reportArr[i]
							if(e==false){
								dupArr[g++] = dataArr[i]
							}
						}
					}
					if(reportArr){
						isUpdateGroup = true
					}
				}else{
					isUpdateGroup = true
				} 
				// Remove
				let isRemove = false
				let isRemoveGroup = false
				if(isUpdate&&isUpdateGroup){
					if(groupArr.length){
						[groupParent,groupArr] = extRemove(groupParent,'',groupArr)
						console.log(589)
						const reportArr = await window.mnt.remove(groupParent,groupArr,true)
						if(reportArr){
							isRemoveGroup = true
						}	
					}else{
						isRemoveGroup = true
					}
					if(isRemoveGroup&&dataArr.length){
						[dataParent,dataArr] = extRemove(dataParent,'',dataArr)
						const reportArr = await window.mnt.remove(dataParent,dataArr)
						if(reportArr){
							isRemove = true
						}
					}else{
						isRemove = true
					}
				}
				
				//Render and Aftermath
				const dragArr = document.querySelectorAll('.mnt-selected-drag')
				for(var i=0;i<dupGroupArr;i++){
					const e = dupGroupArr[i]
					const pos = groupArr.indexOf(e)
					groupParent.splice(pos,1)
					
				}
				for(var i=0;i<dupArr;i++){
					const e = dupArr[i]
					const pos = dataArr.indexOf(e)
					dataParent.splice(pos,1)
				}
				const parentArr = groupParent.concat(dataParent)
				const filterParent = extUniq(parentArr)
				let updateArr = []
				for(var i=0;i<filterParent.length;i++){
					const e = filterParent[i]
					let arr = 0
					
					if(e){
						if(e=='@All'){
							continue
						}
						arr = document.querySelectorAll('.mnt-usergroup-' + e)
					}else{
						continue
					}
					updateArr = updateArr.concat([...arr])
				}
				const dropNode = document.querySelectorAll('.mnt-usergroup-' + dropid)
				const dropArr = Array.from(dropNode)
				updateArr.push(dropArr)
				updateArr = updateArr.flat(2)
				if(isRemove&&isRemoveGroup){
					mntgroupwrite(updateArr)
				}
				// Exception Handle
				if(dupArr.length){

					const mnterror = await window.mnt.error('mntdrag-data',dupArr)
				}
				if(dupGroupArr.length){
					const mnterror = await window.mnt.error('mntdrag-group',dupGroupArr)
				}
			})
		}
	}	
}
// Side:	Handle drag-related function
const mntdragfunc = ()=>{
	document.addEventListener('mntdrag:enter',(event)=>{
		mntcancel(event)
		
		const contentList = []
		const folder = event.target.closest('.mnt-folder')
		const content = folder.children[1]
		let node = content
		while(!node.classList.contains('function-section')){
			contentList.push(node)
			node = node.parentNode.parentNode
		}
		for(var i=0;i<contentList.length;i++){
			const c = contentList[i]
			c.style.height = c.clientHeight+100+'px'
		}
	})
	document.addEventListener('mntdrag:leave',(event)=>{
		mntcancel(event)
		const contentList = []
		const folder = event.target.closest('.mnt-folder')
		//console.log('leave:' + folder.id)
		const content = folder.children[1]
		let node = content
		while(!node.classList.contains('function-section')){
			contentList.push(node)
			node = node.parentNode.parentNode
		}
		for(var i=0;i<contentList.length;i++){
			const c = contentList[i]
			c.style.height = c.clientHeight-100+'px'
		}
		mntspan(content)
	})
}
// Side:	Contextmenu function
const mntmenufunc = async()=>{
	// Data
		// New:							Create new monitored group.                                                        
	document.getElementById('mnt-cm-new').addEventListener('mousedown',async()=>{
		let group = 0
		try{
			group = document.querySelector('.mnt-selected').closest('.mnt-folder')
		}catch(err){
			group = document.getElementById('mnt-group')
		}
		const header = group.children[0].innerHTML
		const isGroups = group.id == 'mnt-group'
		const newGroup = await window.mnt.create()		
		if(newGroup){
			if(!isGroups){
				const isCreate = await window.mnt.update([header],[newGroup])
				if(isCreate){
					mntgroupwrite(group,false)
				}
			}	
			mntgroup(header,newGroup)
			mntmenuAddition('create','movemenu')
		}
	})
		// Remove(Delete this record):	Delete all tags and meta and remove monitored status of this member
	document.getElementById('mnt-removemenu-delete').addEventListener('mousedown',async()=>{
		const selected = uxSelectAll('mnt')
		const pos = selected['Folder'].indexOf('All')
		if(pos + 1){
			for(var i=pos;i<selected['Folder'].length;i++){
				const node = selected['Node'][i]
				const isMain = node.id == 'mnt-main'
				selected['Folder'][i] =  '@All'
			}
		}
		const isFinished = await window.mnt.deleteM(selected['Folder'],selected['Data'])
		if(isFinished){
			mntgroupwrite(selected['Node'])
		}	
	})
		// Remove(Remove from group):	Remove member from this monitored group
	document.getElementById('mnt-removemenu-remove').addEventListener('mousedown',async()=>{		
		const selected = uxSelect('mnt')
		const [groupArr,dataRawArr,groupParent,dataParent] = mntsort(selected)
		let isRemoveGroup = false
		let isRemove = false
		const dataArr = []
		for(var i =0;i<dataRawArr.length;i++){
			dataArr[i] = dataRawArr[i].innerHTML
		}
		if(dataArr.length){
			isRemove = (await window.mnt.remove(dataParent,dataArr))[0]
		}else{
			isRemove = true
		}
		if(groupArr.length){
			isRemoveGroup = (await window.mnt.remove(groupParent,groupArr,true))[0]
		}else{
			isRemoveGroup = true
		}
		if(isRemove && isRemoveGroup){
			const rawArr = groupParent.concat(dataParent)
			const nodeArr = []
			for(var i=0;i<rawArr.length;i++){
				const nodeList = document.querySelectorAll('.mnt-usergroup-' + rawArr[i])
				nodeArr[i] = Array.from(nodeList)
			}
			const updateArr = nodeArr.flat(2)
			mntgroupwrite(updateArr)
		}
	})
		// Remove(Remove grouping):		Remove member from all monitored groups
	document.getElementById('mnt-removemenu-ungroup').addEventListener('mousedown',async()=>{
		let isRemove = false
		let isRemoveGroup = false
		const selected = uxSelect('mnt')
		const [groupArr,dataArr,] = mntsort(selected)
		const groupParentRaw = []
		const dataParentRaw = []
		let groupParent = []
		for(var i=0;i<groupArr.length;i++){
			const e = groupArr[i]
			groupParentRaw[i] = await window.mnt.query(['parent','Members','id',e],'Groups',true)
		}
		for(var i=0;i<groupParentRaw.length;i++){
			const folderset = groupParentRaw[i]
			const data = groupArr[i]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           			
			const dataset = [...folderset].fill(data)
			isRemoveGroup = await window.mnt.remove(folderset,dataset,true)
			if(isRemoveGroup){
				groupParent = groupParent.concat(folderset)
			}			
		}

		for(var i=0;i<dataArr.length;i++){
			const e = dataArr[i].innerHTML
			dataParentRaw[i] = await window.mnt.query(['parent','Monitor','name',e],'@Stemdb',true)
		}
		for(var i=0;i<dataParentRaw.length;i++){
			const folderset = dataParentRaw[i]
			const data = dataArr[i].innerHTML
			const dataset = [...folderset].fill(data)
			isRemove = await window.mnt.remove(folderset,dataset)
			if(isRemove){
				groupParent = groupParent.concat(folderset)
			}			
		}
		const parentArr = extUniq(groupParent)
		for(var i=0;i<parentArr.length;i++){
			const e = parentArr[i]
			parentArr[i] = Array.from(document.querySelectorAll('.mnt-usergroup-' + e))
		}
		const updateArr = parentArr.flat(2)
		mntgroupwrite(updateArr)
	})	
	// Header
		// Remove:						Delete this group
	document.getElementById('mnt-cm-groupdelete').addEventListener('mousedown',async()=>{
		const selected = uxSelect('mnt')
		const updateArr = await window.mnt.delete(selected['Data'])
		if(updateArr[0]){
			mntgroup()
			for(var i=0;i<updateArr.length;i++){
				const node = updateArr[i]
				if(node == 'Shortcut'){
					mntgroupwrite(document.getElementById('mnt-shortcut'))
				}else{
					const modName = mntreplace(node)
					const nodelist = document.getElementsByClassName(modName)
					if(nodelist[0]){
						mntgroupwrite(nodelist)						
					}				
				}
			}
			mntmenuAddition('create','movemenu')
		}
	})
		// Rename:						Rename this group
	document.getElementById('mnt-cm-grouprename').addEventListener('mousedown',async(event)=>{
		const group = document.querySelector('.mnt-selected')
		oldname = group.innerHTML
		group.contentEditable = 'true'
	})
}

// Side: Contextmenu addition
const mntmenuAddition = (cmda='all',cmdb)=>{
	const mode = []
	const cmdset= ['create','func']
	const menuset = ['movemenu']
	// General Modes
	mode['all'] = ()=>{
		for(var i=0;i<cmdset.length;i++){
			mode[cmdset[i]]('all')
		}
	}
	mode['create'] = (cmdb)=>{
		mode['movemenu'] = async()=>{
			const [,[idlist,groups]] = await window.mnt.load('Groups')
			const optionArr = []
			for(var i=0;i<groups.length;i++){
				const id = `'mnt-movemenu-` + groups[i] + `'`
				const text = 'to ' + groups[i]
				//const modName = mntreplace(groups[i][1])
				const modName = idlist[i]
				const option = `<p id=` + id + `class='mnt-dropmenu-option mnt-movemenu-addition'>` + text + `</p>`
				optionArr[i] = option
			}
			const invalidOpt = `<p id=` + 'mnt-movemenu-@invalid' + ` class='mnt-dropmenu-option mnt-movemenu-addition'>No valid groups</p>`
			optionArr.push(invalidOpt)
			const addition = optionArr.join('')
			const updateDiv = document.getElementById('mnt-cm-movemenu')
			updateDiv.innerHTML = addition
		}
		mode['all'] = ()=>{
			for(var i=0;i<menuset.length;i++){
				mode[menuset[i]]()
			}
		}
		mode[cmdb]()
	}
	mode['func'] = (cmdb)=>{
		mode['movemenu'] = ()=>{
			document.body.addEventListener('click',async(event)=>{
				if(mntcheck(event,'mnt-movemenu-addition')){
					const id = event.target.id
					const name = id.substring(13)
					
					let target = document.getElementById('mnt-user-' + name)
					if(name == '@invalid'){
						const movemenu = document.getElementById('mnt-cm-movemenu')
						const mntcount = movemenu.childElementCount
						const isExist = mntcount - 1
						if(isExist){
							const mnterror = await window.mnt.error('mntmove-occupied')
						}else{
							const mnterror = await window.mnt.error('mntmove-exiled')
						}
						return
					}
					if(name == 'Shortcut'){
						target = document.getElementById('mnt-shortcut')
					}
					if(!target){
						target = document.getElementById('mnt-group-' + name)
					}
					let targetid = mntclass(target)[0]
					if(targetid == 'Shortcut'){
						const queryset = await window.mnt.query(['id','Members','name','Shortcut'])
						targetid = queryset[0] + ''
					}
					const selected = uxSelect('mnt')	
					const [groupArr,dataArr] = mntsort(selected)
					if(groupArr[0]){
						const parentArr = [...groupArr].fill(targetid)
						const reportArr = await window.mnt.update(parentArr,groupArr,true)
						if(reportArr){
							let pos = reportArr.indexOf(false)
							if(pos + 1){
								const dupGroupArr = []
								let n = 0
								for(var i=pos;i<reportArr.length;i++){
									const e = reportArr[i]
									if(!e){
										dupGroupArr[n++] = groupArr[i]
									}
								}
								const mnterror = await window.mnt.error('mntdrag-group',dupGroupArr)
							}
							mntgroupwrite(target)
						}
					}
					if(dataArr[0]){
						const parentArr = [...dataArr].fill(name)
						console.log(parentArr)
						console.log(selected['Data'])
						const reportArr = await window.mnt.update(parentArr,selected['Data'])
						if(reportArr){
							const pos = reportArr.indexOf(false)
							if(pos + 1){
								const dupArr = []
								let n = 0
								for(var i=pos;i<reportArr.length;i++){
									const e = reportArr[i]
									if(!e){
										dupArr[n++] = selected['Data'][i]
									}
								}
								const mnterror = await window.mnt.error('mntdrag-data',dupArr)
							}
						}
					}
						
				}
			})
		}
		mode['all'] = ()=>{
			for(var i=0;i<menuset.length;i++){
				mode[menuset[i]]()
			}
		}
		mode[cmdb]()
	}
	mode[cmda](cmdb)
}
// Side:	Load all monitored group
const mntgroup = async(parent,child)=>{
	const mainfunc = async()=>{
		const updateDiv = document.getElementById('mnt-group-display')
		const [,[idlist,grouplist]] = await window.mnt.load('Groups')
		const mntdata = []
		const pos = grouplist.indexOf('Shortcut')
		if(pos+1){
			grouplist.splice(pos,1)
			idlist.splice(pos,1)
		}	
		for(var i=0;i<grouplist.length;i++){
			const modName = idlist[i]
			const header = `<p class='mnt-folder-header'>` + grouplist[i] + `</p>`
			const content= `<div class='mnt-folder-content'></div>`
			const uniqClass = `mnt-usergroup-` + modName
			const folder = `<div id='mnt-user-` + grouplist[i]
				+ `' class='mnt-folder mnt-dropzone ` + uniqClass + ` mnt-subfolder' draggable='true'>` 
				+ header + content + `</div>`
			mntdata[i] = folder
		}
		updateDiv.innerHTML = mntdata.join('')
		const group = updateDiv.querySelectorAll('.mnt-subfolder')
		mntApplier(group)
		mntspan(updateDiv)
		return true	
	}
	mainfunc()	
}
// Main:	Load all monitored data
const mntmain = async()=>{
	const mntdata = []
	const updateDiv = document.getElementById('mnt-main-display')
	let [idset,mntset] = await window.mnt.main()
	if(!mntset){
		mntset = 0
	}
	for(var i=0;i<mntset.length;i++){
		const uniqClass = 'mnt-data-' + idset[i]
		const id = `id='mnt-main-data-` + i + `'`
		mntdata[i] = `<p ` + id+ ` class='mnt-data ` + uniqClass +`' draggable='true'>` + mntset[i] + `</p>`
	}
	updateDiv.innerHTML = mntdata.join('')
	mntspan(updateDiv)
	return true
}

// Side:		Load Shortcut data
const mntshortcut = async() =>{
	const mntdata = []
	const shortcut = document.getElementById('mnt-shortcut')
	const id = (await window.mnt.query(['id','Members','name','Shortcut']))[0]
	const uniqClass = 'mnt-usergroup-' + id
	shortcut.classList.add(uniqClass)
	mntgroupwrite(shortcut,false)
	return true
}

// Side:		Initial page structure
const mntRender = async()=>{
	const isCreated = await window.mnt.build()
	if(isCreated){
		const mainStatus = mntmain()
		const groupStatus = mntgroup()
		const shortcutStatus = mntshortcut()
		if(mainStatus && shortcutStatus && groupStatus){
			return true
		}
	}
}
//Initailizer
const mntApplier = (target)=>{
	mntfunc(target)	
	mntstyle(target)
	
	for(var i=0;i<target.length;i++){
		if(target[i].classList.contains('mnt-dropzone')){
			new mntdrag(target[i])		
		}
	}	
}
const mntInit = ()=>{
	mntdragSetup()
	const isReady = mntRender()
	if(isReady){
		mntfold()
		mntrename()
		const mntfolder = document.querySelectorAll('.mnt-folder')
		mntdragfunc()
		mntmenufunc()
		mntmenuAddition()
		mntgroupload()
		mntApplier(mntfolder)
		
	}
	
	
}
mntInit()