const { contextBridge, ipcRenderer } = require('electron')
// Testing function 1

contextBridge.exposeInMainWorld('st', {
	test:		() => ipcRenderer.invoke('tele-test','apple'),
	read:		() => ipcRenderer.invoke('read',v)
})


// Default value



// DarkMode
contextBridge.exposeInMainWorld('dm', {
	main:		() => ipcRenderer.invoke('dm-main'),
	reset:		() => ipcRenderer.invoke('dm-reset')
})
