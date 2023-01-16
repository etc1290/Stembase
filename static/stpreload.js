const { contextBridge, ipcRenderer } = require('electron')
// Testing function

contextBridge.exposeInMainWorld('st', {
	test:		() => ipcRenderer.invoke('st-test'),
})



