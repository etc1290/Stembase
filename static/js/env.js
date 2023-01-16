const fs = require('fs')
const env = (v) =>{
	const envdata = fs.readFileSync('Stemconfig.json')
	var envarray = JSON.parse(envdata)
	return envarray[v]
}
module.exports = env