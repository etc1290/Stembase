const { contextBridge, ipcRenderer } = require('electron')

// Testing function
contextBridge.exposeInMainWorld('versions', {
    node: 		()=> process.versions.node,
    chrome: 	()=> process.versions.chrome,
	test:		()=> ipcRenderer.invoke('test'),
    fileTree:	()=> ipcRenderer.invoke('fileTree'),
    electron: 	()=> process.versions.electron,

})

// FileSystem
contextBridge.exposeInMainWorld('fs', {
    main: 		(v)=> ipcRenderer.invoke('fs-main',v),
	type:		(v)=> ipcRenderer.invoke('fs-type',v),
	path:		(v)=> ipcRenderer.invoke('fs-path',v),
    getDir:     ()=> ipcRenderer.invoke('fs-getDir'),
})



// DarkMode
contextBridge.exposeInMainWorld('dm', {
	main:		() => ipcRenderer.invoke('dm-main'),
	reset:		() => ipcRenderer.invoke('dm-reset')
})

// toolbar
contextBridge.exposeInMainWorld('tb', {
	main:		() => ipcRenderer.invoke('tb-main'),
})



