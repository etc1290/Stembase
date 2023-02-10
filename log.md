# Stembase
 File tagging system

---
	## 2022.02.10		version 0.2.6.2
	-- Add up the layer of database
	
	# Added
	1. Add name layer in database for quick search
		-- finished
---
	## 2022.02.10		version 0.2.6.1
	-- Style design change
	-- Add exception handle
	
	# Added
	1. Add exception handler in get all db when there are no data
		-- finished
	# Changed
	1. Style design change
		1-1 Add transition in match area for smooth change
			-- finished
---
	## 2022.02.09		version 0.2.6
	-- Style design change
	-- Add gimmick in query function
	-- Complete a basic query function
	# Added
	1. Add protection in query function to handle data exist but no attachment
		-- finished
	2. When input value is null show some tags
		-- finished
	3. Query function is achieved by need more data to check the performance
		-- finished
	# Changed
	1. Style design change
		1-1 Add search result as Alice blue
			-- finished
		1-2 Folder and expand match area by click inside and out
			-- finished
---
	## 2022.02.08		version 0.2.5.1
	-- Style design change
	-- Code cleaning
	-- Building search function
	# Added
	1. Searching function deploying
		1-1 Add demo-tag match display function
			-- finished
		1-2 Add demo-search display function
			-- finished
		1-3 Add demo-check matched result in search display function
			-- finished
	
	2. Building tag and file search function which contains two parts:
		1-1 by input value return file info or tag info
		1-2 Display similar results
		-- processing
	# Changed
	1. Style design change
		1-1 Shorten the hover transition time from 0.5s to 0.1s for etc1290 ask's sake
			-- finished
		1-2 Anti flash white for tag-match-result button
			-- finished
	2. Remove some wasted codes
		-- finished
		
---
	## 2022.02.07		version 0.2.5
	-- Add focus color on file and tag
	-- Add border on blocks
	-- Change the formoat of db data
	-- Style design change
	-- Rewrite tag add, display, search and remove function
	
	# Added
	1. Add selected color on file and tag to notify selecton
		-- finished
	2. Add border on each blocks
		-- finished
		
	# Changed
	1. Change add tags function's behavior when save tags
		-- finished
	2. Style design change
		2-1 Add borderline in each function section
			-- finished
		2-2 Re-arrange div and create 'buttonbar' div to contains buttons
			-- finished
		2-3 Add placeholder in debug input field
			-- finished
	3. Rewrite tag add,  display, search and remove function for tag and file isolation
		-- finished
		
---
	## 2022.02.07		version 0.2.4.1
	-- Add tag remove protection
	-- Fix tag id is took as tag on parsing
	-- Add auto highlight function
	-- Rename variable name 
	-- Adjust style design
	# Added
	1. Add protection to tag remove function to prevent accidently trigger
		1-1 Add warning if no tag is selected
			-- finished
		1-2 Remove warning when tag is selected
			-- finished
	2. When click tag input block highlight the content
		-- finished

	# Changed
	1. Rename variable names in tag remove function for better readable
		-- finished
	2. Design change
		2-1 Add color to button and tag
			-- finished
		2-2 Fill up space by padding instead of margin for hover
			-- finished
		
	# Fixed
	1. Fix the bug in index-ux.js result from typo
		-- finished
--- 
	## 2022.02.06		version 0.2.4
	-- Remove deprecated file
	-- Add tag remove function
	-- Refresh page after remove tag
	-- Clear selected tag after remove tag
	-- Remove function support main db 
	
	## Added
	1. Add tag remove function by select tag and press Delete Tag
		-- finished
	2. Refresh tag display after use remove tag function
		-- finished
	3. Clear selected tag after remove tag prevent inherited operation
		-- finished
	4. Remove function support Stemdb and tag remove
		-- finished
	## Changed
	1. Remove undefined folder. It was created by bug
		-- finished
	
	## Testing
	1. Set up tagging system and derivative function
		1-1 Single and Double Click
			-- finished
		1-2 Tagging
			-- finished
		1-3 Details
			-- finished
		1-4 Selection
			-- finished
		1-5 Deleting
		1-6 Searching
		
---
	## 2022.02.04		version 0.2.3
	-- Rewrite tag function
	-- Display tags function implementation
	-- Add refresh trigger when click add tag button
	-- Separate Search and Display tags function
	-- Add duplicate tags check function
	-- Add Tag selected funcion
	## Added
	1. Separate tag records and file records for searching function
		-- finished
	2. Add display tags function
		-- finished
	3. Add refresh function in tag-write function
		-- finished
	4. Add basic search tags function 
		-- finished
	5. Add Duplicate checker function in tag-main to prevent same tags added
		-- finished
	6. Add Tag selected function for further function
		-- finished
---
	## 2022.02.03		version 0.2.2.1
	-- Fix node-json-db core bug
	
	## Fixed
	1. Fix the core bug in node-json-db push function array support by merge function
		-- finished
---
	## 2022.02.03		version 0.2.2
	-- Finish Tag function
	-- Code re-arrangement
	
	## Added
	1. Add a block for tag input
		-- finished
	2. Fatal bug in push function
		-- bugged
---
	## 2022.02.02		version 0.2.1
	-- Simple selection function implementation
	-- Tag section layout
	-- Clear deprecated codes
	-- Add new environment variable
	-- Tag function implementation
	-- Add database customized function in Tag function
	
	## Added
	1. Add simple selection function for click-response reaction
		-- finished
	2. Assign StemdbDir to StemCdb for database storage path
		-- finished
	3. Add simple Tag function
		-- finished
	4. Add database storage customization function
		-- finished
	## Changed
	1. Design the layout in tag section
		-- finished
	2. Remove wasted codes
		-- finished
---
	## 2022.02.01		version 0.2.0
	-- User Interactive function implementation
	-- Clear deprecated codes
	-- Interface re-design
	
	## Added
	1. Add ux div in index.html to achieve complicated selection function for further tagging system
		-- finished
	2. Add ux-info to record selected target
		-- finished
	3. Add index-ux.js to pack all ux-related function
		-- finished
	4. Add div for tagging system
		-- finished
	5. Add main-function div to contain FileSystem and Tagging area
		-- finished
		
	## Changed
	1. Remove some deprecated codes and annotaton
		-- finished
	2. Add directory output in bytes.js
		-- finished
	3. Interface re-design
		-- finished
		
	## Testing
	1. Set up tagging system and derivative function
		1-1 Single and Double Click
			-- finished
		1-2 Tagging
		1-3 Details
			-- finished
		1-4 Selection
			-- finished
		1-5 Others
---
	## 2022.02.01		version 0.1.91
	-- Separate time function
	
	## Changed 
	1. Separate timeStamp function from a sub-function to a standalone script for precisely developing
		-- finished
	2. Rename timeStamp function to time
		-- finished
---
	## 2022.01.31		version 0.1.9
	-- Function rewrite
	-- Timestamp convert function implementation
	
	
	## Added
	1. Add a timestamp convert function in fs-main(it's very lightweight,by the way)
		-- finished
	## Changed
	1. Rewrite dataminer function into a more dry,efficient and user-friendly function
		-- finished
	2. Mine mtime(modified time) instead of birthtime(created time) to close the actuall use
		-- finished
	3. Seprate a independent check for time in dataminer
		-- finished
---
	## 2022.01.31		version 0.1.8
	-- style implementation
	-- Function implementation
	-- Bug Fix
	
	## Added
	1. Add independent css for each templates
		-- finished
	2. Apply basic Detail function to index.js
		-- finished
	
	# Changed
	1. Rename clstyles.css to codelab.css for consistency
		-- finished
	2. Fix bug in FileSystem data miner function, which lead overpacking
		-- finished
---
	## 2022.01.30		version 0.1.7
	-- Function implementation
	
	## Added
	1. Add File data mining function in fs-main
		-- finished
	
	## Changed
	1. Change text in bytes.js for detecting directory
		-- finished
	## Testing
	1. Set up tagging system and derivative function
		1-1 Single and Double Click
			-- finished
		1-2 Tagging
		1-3 Details
			-- processing
		1-4 Selection
		1-5 Others
---
	## 2022.01.30		version 0.1.6
	-- Style design
	-- Add click and double click trigger
	-- Bug fixes
	-- Tool script importing 
	
	## Added
	1. Add single and double click trigger at fs-data
		1-1 Single for select function like selection, show details, tagging and so on.
			-- processing
		1-2 Double for original function,that is, file browsing
			-- finished
	2. Build a tool script called bytes.js for 'B,KB,MB,GB...' converting
		-- finished
		
	## Changed
	1. Re-design the style of a button
		-- finished
	2. Fix the bugs of fs-getDir caused by js separate
		-- finished
		
	## Testing
	1. Set up tagging system and derivative function
		1-1 Single and Double Click
			-- finished
		1-2 Tagging
		1-3 Details
		1-4 Selection
		1-5 Others
---
	## 2022.01.19		version 0.1.5
	-- Function implementation
	
	## Added
	1. Add Code Lab to test codes without affecting any truly important function
		-- finished
	2. Add Style Lab to test css/design without affecting overall design
		-- finished
	3. Add Code Lab and Style Lab shortcut in Stting page
		-- finished
	
	## Changed
	1. Re-arrange codes for clear display in setting.js
		-- finished
---
	## 2022.01.19		versuin 0.1.4.1
	-- Remove annotations
	
	## Changed
	1. Remove useless annotation in index.js
		-- finished
	2. Rearrange the codes in setting.js
		-- finished
		
---
	## 2022.01.19		version 0.1.4
	-- Function implementation
	-- Remove debug codes
	-- Add systematic text
	
	## Added
	1. Finish Reset function in setting.js
		-- finished
	2. Add systematic message in setting.html to remind user to restart the app
		-- finished
	
	## Changed
	1. Remove some debug codes
		-- finished
---
	## 2022.01.19		version 0.1.3
	-- New function scripts
	-- Function implementation
	
	## Added
	1. Add a new script called Check.js used for converting all strings to number if possible and return it
		-- finished
	2. Finish write,record function in setting.js
		-- finished
---
	## 2022.01.18		version 0.1.22
	-- Function improvement
	## Added
	1. Add Write,Record and Reset function in setting.js
		-- processing
	
	## Changed
	1. Rebuild Autofill function with more efficient way
		1-1 Name after a element id in html with corresponded database index and gived classname'option' to activate Autofill
		-- finished
---
	## 2022.01.18		version 0.1.21
	-- Bug fix
	-- Rename id
	
	## Changed
	1. Rename id in Setting.html for further developing
		-- finished
	## Fixed
	1. Fix Setting.js cannot recognize v
	
---
	## 2022.01.17		version 0.1.2
	-- Bug fix
	-- Porting function 
	
	## Changed
	1. Modify deprecated function(st.main) in index.js to new function(cw.setting)
		-- finished
	2. Porting DarkMode function to child window Setting
		-- finished
	
	## Bugged
	1. Setting.js cannot recognize v
---
	## 2022.01.17		version 0.1.11
	-- Remove annotation
	-- File Structure re-arrangement
	
	## Changed
	1. Remove some wasted annotation
		-- finished
	2. Move stpreload.js from static to bin for functional isolation
		-- finished
---
	## 2022.01.16		version 0.1.1
	-- Separate Child Window create function
	
	## Added
	1. Separate setting child window creation
		-- finished
	2. Add fully functional child window: setting
		-- finished
	## Changed
	1. Rename st and divide it into specific st(child window setting) and general cw(child window creation)
		-- finished
	2. Remove some wasted codes
		-- finished
---
	## Setting Branch
	## 2022.01.16		version 0.1.01
	-- Create a new Branch
	1. Make "Setting" branch sync with "main"
---
	## 2022.01.16		version 0.1.0
	-- Text modification
	-- Seperate function 
	
	### Added
	1. Seperate function into independent js storing in static/js
		1-1 FileSystem,env and DarkMode
		-- finished
	2. Build a Taskmanager function to load all scripts
		-- finished
	3. Build init function to control function loading
		-- finished
	### Changed
	1. Remove some debug console.log
		-- finished
		
--- 
	## 2022.01.13		version 0.0.94
	-- Text modification
	-- Add communication channel but bugged
	### Added
	1. Set up communication test
		-- bugged
		
	### Changed
	1. Modify annotation
		-- finished
		
---
	## 2022.01.13		version 0.0.93
	-- Testing Git hub function
---
	## 2022.01.12		version 0.0.92
	-- Arrange codes
	-- Complete a fully functional and independent child window
	
	### Added
	1. Add WindowToolbar to main.js as setting function
		-- finished
	### Changed
	1. Rename creatWindow in main.js to WindowMain for multiple window implementation
		-- finished
	2. Rename toolbar as setting and move related function to it
		-- finished
		
	### Fixed
	1. Add create child window function
		-- finished
		
---
	## 2022.01.09		version 0.0.91
	-- Apply config function setting
	-- Add create child window function
	
	### Added
	1. Add create child window function
		-- bugged
		
	### Changed
	1. Control dev-tool by config Debugmode
		-- finished
	2. Remove some wasted codes
		-- finished
		
---
	## 2022.01.09		version 0.0.9
	-- Config function implementation
	
	### Added 
	1. Finishe Stemconfig.json environment variable import function 
		-- finished
	2. Add Height and Width in to Stemconfig for further window size customization
		-- finished
	### Changed
	1. Move FileTree.js to static/js and remove src folder for consistency
		-- finished
	2. Setting.js and Setting.json are removed because they are no longer needed
		-- finished
	3. Change width and height in main.js into enviroment
		-- finished
	4. Change the way that get data from JSON file.
		-- finished
---
	## 2022.01.06		version 0.0.81
	- Database implementation
	- FileTree Function 
	
	### Added 
	1. Build a json-based database(Stemconfig.json) to store enviroment variable.
		-- finished
	2. Add Testing channel 'test' in Testing function for further developing
		-- finished
	3. File Tree Function implement
		-- finished
	### Changed
	1. Move all data in Setting.js to Stemconfig.json 
		-- finished
	2. Change all codes related to old Setting.js to apply new database setting
		-- processing
	3. Remove Setting.js
		-- processing
		
---
	## 2022.01.05		version 0.0.8
	- Code re-arrangement
	- Bug fix
	- Function implementation
	
	### Added 
	1. Add nowPath in template/index.js to store current path information for realizing complete file system function
		-- finished
		
	### Changed
	1. Move reset fs-path codes in fs-openDir, fs-home, fs-up, fs-button to fsfunc for dry handle
		-- finished
	
	### Fixed
	1. Add Button response function to fs-data class
		-- finished
	2. fs-openDir is deprecated because the mechanism change in fsfunc
		-- finished
		

---
	## 2022.01.04		version 0.0.7
	- Coding re-arrangement
	- Function implementation
	
	### Added
	1. Add Home and Up Level button in template/index.html
		-- finished
	2. Add Home function in template/index.js
		-- finished
	3. Add fs-info in template/index.html for displaying message like error
		-- finished
	4. Add Uplevel function in template/index.js
		-- finished
		
	### Changed
	1. Move DarkMode in template/index.js from below to above the Initializer for consistent spacing
		-- finished
	2. Remove some debug code
		-- finished
		
	### Precessing
	1. Add Button response function to fs-data class
		-- bugged
	2. Display path when press button
		-- bugged		
---
	## 2022.01.04		version 0.0.6
	- Minor bug fix
	- Function implementation: Browse down level, File or directory check
	
	### Added
	1. Add browse file function but only works in downing level
		-- finished
		
	### Changed
	1. Remove default texts of fs-path in template/index.html for smooth coding. Users cannot see it anyway 
		-- finished
	2. Remove some debug code
		-- finished
		
	### Fixed
	1. Fix Backslash syntaax error forgot to fix
		-- finished
	
	### Processing
	1. Add Button response function to fs-data class
		-- bugged
	2. Display path when press button
		-- bugged
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
