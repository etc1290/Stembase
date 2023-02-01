const time = (i) => {
	return new Date(i).toISOString().slice(0, 10)
}

module.exports = time