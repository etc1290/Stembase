

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

