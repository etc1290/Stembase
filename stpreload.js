const { contextBridge, ipcRenderer } = require('electron')
// Testing function 1

contextBridge.exposeInMainWorld('st', {
	test:		() => ipcRenderer.invoke('tele-test','apple'),
	write:		(i,v) => ipcRenderer.invoke('st-write',i,v),
	read:		(v)=> ipcRenderer.invoke('st-read',v)
})


// Default value



// DarkMode
contextBridge.exposeInMainWorld('dm', {
	main:		() => ipcRenderer.invoke('dm-main'),
	reset:		() => ipcRenderer.invoke('dm-reset')
})

// ChildWindow
contextBridge.exposeInMainWorld('cw',{
	codelab:	() => ipcRenderer.invoke('cw-codelab'),
	stylelab:	() => ipcRenderer.invoke('cw-stylelab')
})