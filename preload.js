const { contextBridge, ipcRenderer } = require('electron')

// Testing function
contextBridge.exposeInMainWorld('versions', {
    node: 		() => process.versions.node,
    chrome: 	() => process.versions.chrome,
    electron: 	() => process.versions.electron,
})

// FileSystem
contextBridge.exposeInMainWorld('dir', {
    main: 		() => ipcRenderer.invoke('fs-main')
})

// DarkMode
contextBridge.exposeInMainWorld('dm', {
	main:		() => ipcRenderer.invoke('dm-main'),
	reset:		() => ipcRenderer.invoke('dm-reset')
})

