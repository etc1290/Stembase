const bytes = (bt, decimals = 2) => {
    if (!+bt) return ''

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bt) / Math.log(k))

    return `${parseFloat((bt / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

module.exports = bytes