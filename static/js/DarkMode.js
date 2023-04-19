const { ipcMain, nativeTheme } = require('electron')

nativeTheme.themeSource = 'light'

// Main: toggle
	
ipcMain.handle('dm-main',	() =>{
	if (nativeTheme.shouldUseDarkColors){
		nativeTheme.themeSource = 'light'
			
	}else{
		nativeTheme.themeSource = 'dark'
			
	}
	return nativeTheme.shouldUseDarkColors
})
	// Side: Reset to system
ipcMain.handle('dm-reset',	() =>{
	nativeTheme.themeSource = 'system'
})