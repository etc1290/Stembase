const { contextBridge, ipcRenderer } = require('electron')
// Testing function 1

contextBridge.exposeInMainWorld('st', {
	test:		() => ipcRenderer.invoke('st-test'),
})

// DarkMode
contextBridge.exposeInMainWorld('dm', {
	main:		() => ipcRenderer.invoke('dm-main'),
	reset:		() => ipcRenderer.invoke('dm-reset')
})

