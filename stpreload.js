const { contextBridge, ipcRenderer } = require('electron')
// Testing function 1

contextBridge.exposeInMainWorld('st', {
	test:		() => ipcRenderer.invoke('st-test'),
})



