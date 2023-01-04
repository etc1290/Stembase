# Stembase
 File tagging system

---
	## 2022.01.04		version 0.0.54
	- Minor bug fix
	
	## Fixed
	1. Fix Backslash syntaax error forgot to fix
---
	## 2022.01.03		version 0.0.53
	- Text Change
	
	### Added
	1. Add default texts for capturing undefined look-up result in FileSystem function
		-- finished
	2. Add new side-function fs-path into FileSystem to store and handle all path-related processing
		-- finished
		
	### Processing
	1. Add Button response function to fs-data class
		-- bugged
	2. Display path when press button
		-- bugged
---
	## 2022.12.30		version 0.0.52
	- Function implementation
	
	### Added
	1. Add Button response function to fs-data class
		-- bugged
	2. Display path when press button
		-- bugged
		
	### Changed
	1. Put Directory response under FileSystem 
		-- finished
	2. Segment FileSystem main function to simplify the complexity
		-- finished
		
---
	## 2022.12.29		version 0.0.51
	- Design changelog
	### Added
	1. Add line break between buttons in index.js
		-- finished
	
---
	## 2022.12.29		version 0.0.5
	- Function implementation
	- Coding re-arrangement
	
	### Added
	1. Add Initializer division in index.js for initialized function and code
		-- finished
	2. Merge fs-path function to fs-main function
		-- finished
	3. Connect fs-main function to fs-getDir function
		-- finished
	### Changed
	1. Remove fs-text and placeholder in index.html and index.js because it's no longer need them
		-- finished
	2. Storage fs-main and fs-path at fs in index.html for functional dependency
		-- finished
	3. Remove fs-path codes because of it's deprecation
		-- finished
	4. Change the default texts display of fs-path in index.html
		-- finished
---
	## 2022.12.29		version 0.0.4
	- Function implementation
	
	### Added
	1. Add file browser Side function
		1.1 Select any directory and parse path to frontend
		-- finished
	
	### Changed
	1. Rename func in index.js to fsfunc for more seriously developing view
		-- finished
	2. Replace getElementById in index.js with querySelector for flexible and consistent
		-- finished
	3. Rewrite showOpenDialog to a synchronous function and remove comflicting
		-- finished
---
	## 2022.12.29		version 0.0.31
	- Merge
	
	### Added
	1. Add fs-path in html for display current selected folder and debug
		-- finished
	### Changed 
	1. Remove fs-dir in index.html because it's redundant compare to fs-text
		1.1 fs-text is under fs-main, it's a more organized and efficient arrangement with focused purpose
		-- finished
	2. Replace innerHTML with insertAdjacentHTML for faster and juicy(i mean flexible)
		2.1 Each time innerHTML runs it has to serialise all the existing contents of element and then reparse the whole lot
		2.2 insertAdjacent is only parsing each time and then attaching the small document fragment to the Document Object Model
		-- finished
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