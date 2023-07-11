

//Duplicate elements remover
const extUniq = (arr) =>{
	const hash = {}
	const uniqArr = []
	let n = 0
	const h = arr[0]
	const isElement = h instanceof Element
	for(var i=0;i<arr.length;i++){
		const el = arr[i]
		let key = arr[i]		
		if(isElement){
			key = el.id
		}
		if(!hash[key]){
			hash[key] = 1
			uniqArr[n++] = el
		}
	}
	return uniqArr
}

// Remove specific elements
const extRemove = (arr,v,exArr=false) =>{
	const hash = []
	let n = 0
	for(var i=0;i<arr.length;i++){		
		const pos = arr.indexOf(v)
		if(pos + 1){
			arr.splice(pos,1)
			hash[n++] = pos
		}else{
			break
		}
	}
	// Synchronous Removal
	if(exArr){
		const isArr = exArr[0].constructor.name == 'Array'
		if(!isArr){
			exArr = [exArr]
		}
		for(var i=0;i<exArr.length;i++){
			const a = exArr[i]
			for(var k=hash.length-1;k>-1;k--){
				a.splice(hash[k],1)
			}
		}
		if(!isArr){
		    exArr = exArr[0]
		}
	}
	return [arr,exArr,hash]
}

