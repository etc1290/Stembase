# Stembase
 File tagging system
 
	## 2022.12.29		version 0.0.31
	- Function implementation and merge
	
	### Added
	1. Add fs-path in html for display current selected folder and debug
	
	### Changed 
	1. Remove fs-dir in index.html because it's redundant compare to fs-text
		1.1 fs-text is under fs-main, it's a more organized and efficient arrangement with focused purpose
---	
	## 2022.12.28		version 0.0.3
	- Function implementation
	
	### Added
	1. Add FileSystem function 
		1.1 Parse folder content as button element to frontend
		1.2 Auto clear all created information when initialized function
		-- finished
	2. Add demarcation in log.md for more cleaner paragraph separation
		-- finished
		
	### Changed
	1. Rename dir to fs for consistency and readability
		-- finished
---
	## 2022.12.28		version 0.0.21
	- Patch
	- Bug Fix 
	
	### Fixed
	1. Correct the missing braces deleted by Git Hub
		-- finished
---		
	## 2022.12.27		version 0.0.2
	- Function implementation
	
	### Added
	1. Add new function Dark Mode
		#### Main
			1. Toggle button can switch theme color between dark tone and light tone
			2. Each tone can be edited by modified css
		#### Reset
			1. Reset to system default color >> light
		-- finished
	2. Ensure app is completely off
		-- finished
	3. Ensure app cannot be executed when it already is
		-- finished
---	
	## 2022.12.27		version 0.0.11
	- Patch
	
	### Added
	1. Add new file lod.md to replace README.md as changelog
	
	### Changed
	1. README.md is transfered from changelog into summary
---
	## 2022.12.26		version 0.0.1
	- Infrastructure building
	
	### Added	
	1. Add Setting.js works as system variables and function storage 
		1.1 Add TemplateDir to assign html path
		1.2 Add StaticDir to assign static files path
		1.3 Add Debugmode for further use (presently, no use of it)
		-- finished

	2. Arrange files for more clean import
		2.1 Storage css in static/css
		2.2 Storage js in static/js
		2.3 Storage icons in static/img/icon
		2.4 Storage fonts in static/img/font
		2.5 Storage other images in static/img
		2.6 Storage other files in static/data
		2.7 Storage html in template
		2.8 Storage renderer js in template, for quick call in renderer process
		-- finished
	
	3. Move and rename files to implement #2
		-- finished