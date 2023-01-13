const { contextBridge, ipcRenderer } = require('electron')
// Testing function

contextBridge.exposeInMainWorld('sat', {
	test:		() => ipcRenderer.invoke('st-test'),
})



