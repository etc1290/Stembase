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
	path:		()=> ipcRenderer.invoke('fs-path'),
    getDir:     ()=> ipcRenderer.invoke('fs-getDir'),
    createMeta: ()=> ipcRenderer.invoke('fs-createMeta'),
	openfile:	(v)=> ipcRenderer.invoke('fs-openfile',v)
})

// ChildWindow
contextBridge.exposeInMainWorld('cw', {
	setting:	() => ipcRenderer.invoke('cw-setting'),
	codelab:	() => ipcRenderer.invoke('cw-codelab'),
	stylelab:	() => ipcRenderer.invoke('cw-stylelab')
})

// TagSystem
contextBridge.exposeInMainWorld('tag', {
	main:		(i,v,p) 	=> ipcRenderer.invoke('tag-main',i,v,p),
	info:		(v,p) 		=> ipcRenderer.invoke('tag-info',v,p),
	remove:		(i,v,id,p)	=> ipcRenderer.invoke('tag-remove',i,v,id,p),
	query:		(v,t,p,b) 	=> ipcRenderer.invoke('tag-query',v,t,p,b),
	match:		(v)			=> ipcRenderer.invoke('tag-match',v),
	monitor:	(v)			=> ipcRenderer.invoke('tag-monitor',v),
	error:		(v)			=> ipcRenderer.invoke('tag-error',v),
	delDB:		() 			=> ipcRenderer.invoke('ts-delDB')
})

// MonitorSystem
contextBridge.exposeInMainWorld('mnt', {
	main:		()			=> ipcRenderer.invoke('mnt-main'),
	load:		(i)			=> ipcRenderer.invoke('mnt-load',i),
	remove:		(i,j)		=> ipcRenderer.invoke('mnt-remove',i,j),
	delete:		(i)			=> ipcRenderer.invoke('mnt-delete',i),
	deleteM:	(i,j)		=> ipcRenderer.invoke('mnt-delete-member',i,j),
	create:		()			=> ipcRenderer.invoke('mnt-create'),
	group:		(i,j)		=> ipcRenderer.invoke('mnt-group',i,j),
	rename:		(i,j)		=> ipcRenderer.invoke('mnt-rename',i,j),
	update:		(i,j)		=> ipcRenderer.invoke('mnt-update',i,j),
	error:		(i)			=> ipcRenderer.invoke('mnt-error',i),
	build:		()			=> ipcRenderer.invoke('mnt-build')

})




