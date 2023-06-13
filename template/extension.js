

//Duplicate elements remover
const extUniq = (arr) =>{
	const hash = {}
	const uniqArr = []
	let n = 0
	for(var i=0;i<arr.length;i++){
		const el = arr[i]
		if(!hash[el]){
			hash[el] = 1
			uniqArr[n++] = el
		}
	}
	return uniqArr
}