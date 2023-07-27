const fs = require('fs')

// Convert bytes to readable format
const bytes = (bt, decimals = 2) => {
    if (!+bt) return 'Directory'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bt) / Math.log(k))

    return `${parseFloat((bt / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
// Convert all possible numeric strings to number
const check = (v) =>{
	const i = Number(v)
	if(!(i) && v!=='0'){
	    return v
	}else{
	    return i
	}
}
// Convert to general time format
const time = (i) => {
	return new Date(i).toISOString().slice(0, 10)
}


// Read environment variable 
const env = (v) =>{
	const envdata = fs.readFileSync('Stemconfig.json')
	const envarray = JSON.parse(envdata)
	return envarray[v]
}
//Duplicate elements remover
const arrUniq = (arr) =>{
	const hash = {}
	const uniqArr = []
	let n = 0
	const h = arr[0]
	for(var i=0;i<arr.length;i++){
		const el = arr[i]
		let key = arr[i]		
		if(!hash[key]){
			hash[key] = 1
			uniqArr[n++] = el
		}
	}
	return uniqArr
}



module.exports = {
	bytes,
	check,
	time,
	env,
	arrUniq
	
}