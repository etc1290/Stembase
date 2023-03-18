const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('tag', {
	delDB:		() 		=> ipcRenderer.invoke('ts-delDB')
})