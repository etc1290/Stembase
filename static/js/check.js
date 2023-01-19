
const check = (v) =>{
	const i = Number(v)
	if(!(i) && v!=='0'){
	    return v
	}else{
	    return i
	}
}

module.exports = check