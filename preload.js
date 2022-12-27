const { contextBridge, ipcRenderer } = require('electron')

// Testing function
contextBridge.exposeInMainWorld('versions', {
    node: 		() => process.versions.node,
    chrome: 	() => process.versions.chrome,
    electron: 	() => process.versions.electron,
    // we can also expose variables, not just functions
})

// FileSystem
contextBridge.exposeInMainWorld('dir', {
    main: 		() => ipcRenderer.invoke('fs-main')
})


