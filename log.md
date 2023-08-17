# Stembase
 File tagging system

@@@ Roadmap
	4. 	Collapse groups only works when leave parent groups or second members
	7. 	Merge mnt-get function into mnt-query
	8. 	Rewrite or remove uxselect function in index-tag
	12. Non-main groups in Shortcut's highlight effect is missing
	14. Auto detect if Shortcut is configured in the Groups db to prevent corrupted 
	15. Adjust all Shortcut-id related function to fit the new mechanism
	16. Tag System remake
	17. File System remake
	18. After dropping auto direct to the new-appended monitored data
	24. user customized monitored rules
	25. Add multi-selection function
	26. Apply Ctrl, Shift and so on keyboard input function
	27. Remake the upper toolbar
	28. Duplicate data writing will show warning message
	29. Add a small warning area on bottom-left corner
	34. Add warning before Delete function fire
		-- processing
	35. Add redo function
	39. Rewrite mnt-delete related function to adapt id-based function
	40. Add ellipsis effect at all monitored name
	46. Check if the group is loaded 
	51. Highlight new added or modified data
	52. Apply new extRemove mechanism
	53. Corrupted database recovery	
	59. Add icon
	60. Adjust button style by js rather then css
	61. Round border of message box

---
	## 2023.08.18		version 0.8.1.2 - Message-Box
	-- Style change
	# Changed
	1. Make the box center to window
		-- finished
---
	## 2023.08.17		version 0.8.1.1 - Message-Box
	-- Initialization
	-- Structure building
---
	## 2023.08.17		version 0.8.1.1 - MFO-contextmenu
	-- Function enhancement
	# Added
	1. When open movemenu, not display current folder as a viable option
		-- finished	
---
	## 2023.08.16		version 0.8.1.0 - MFO-contextmenu
	-- Function implementation
	-- Function enhancement
	-- Bug fix
	# Added
	1. Add mntgroupcheck function to handle system or user groups check
		-- finished
	2. Add invalid detect when there is not other monitored can be added
		-- finished
	# Fixed
	1. Fix the bug that movemenu malfunction after rename function due to id not update
		-- finished
	2. Fix a serial of bug by apply mntgroupcheck function to mntrename function
		-- finished
	
---
	## 2023.08.15		version 0.8.0.1 - MFO-contextmenu
	-- Bug fix
	-- Clear wasted codes
	# Fixed
	1. Fix the bug that data missing warning show up at wrong timing
		-- finished
	2. Add uxcmCheck function to prevent right click fire click event in contextmenu
		-- finished
---
	## 2023.08.14		version 0.8.0.0 - MFO-contextmenu
	-- Initialization
---
	## 2023.08.14		version 0.8.0.0 - MFO-build
	-- Function implementation
	-- Clear wasted codes
	-- Bug fix
	# Added
	1. Add dbError function to tell if data is missing
		-- finished
	# Fixed
	1. Fix the bug that envCreation always recreate Stemconfig.json even one existed
		-- finished
---
	## 2023.07.27		version 0.7.9.0 - MFO-build
	-- Function implementation
	-- Clear wasted codes
	# Added
	1. Add build.js to take all build function that should be done after basic environmental setting
		-- finished
---
	## 2023.07.25		version 0.7.8.9 - MFO-mntbuild-restore
	-- Function enhancemdent
	# Changed
	1. Create Stemconfig.json if missing
		-- finished
---
	## 2023.07.24		version 0.7.8.8 - MFO-mntbuild-restore
	-- Function enhancement
	# Changed
	1. Create main db before app ready
		-- finished
---
	## 2023.07.21		version 0.7.8.7 - MFO-mntbuild-restore
	-- Function enhancement
	-- Bug fix
	# Changed
	1. Create data when missing
		1.1 Groups
		1.2 Shortcut
		-- finished
	2. Add a minor patch to ensure Groups data completness
		-- finished
	# Fixed
	1. Make sure mntInit run after mntbuild over
		-- finished
---
	## 2023.07.20		version 0.7.8.6 - MFO-mntbuild-restore
	-- Function enhancement
	# Changed
	1. Add a check to reduce unnecessary reboot steps
		-- finished
---
	## 2023.07.19		version 0.7.8.5 - MFO-mntbuild-restore
	-- Build test
	-- Bug fix
	# Fixed
	1. Fix initialization error
		
		
	# Changed
	1. Test if electron can compile executed
		-- finished
---
	## 2023.07.18		version 0.7.8.4 - MFO-mntbuild-bugfix
	-- Bug fix
	-- Remove wasted codes
	# Fixed
	1. Prevent further action when data duplication  to stop null db from creating
		-- finished
	2. Fix the bug that when data deletion may accidentally create null All.db
		-- finished
---
	## 2023.07.14		version 0.7.8.3 - MFO-mntbuild-bugfix
	-- Bug fix
	# Fixed
	1. Add Shortcut data after db is created
		-- finishded
	
---
	## 2023.07.13		version 0.7.8.2 - MFO-mntbuild-bugfix
	-- Remove wasted codes
---
	## 2023.07.12		version 0.7.8.2	- MFO-mntmovemenu-error
	-- Function enhancement
	# Changed
	1. Add warning message when add duplicae data or groups
		-- finished
	
---
	## 2023.07.12		version 0.7.8.2 - MFO-mntdrag-error
	-- Clear wasted codes
---
	## 2023.07.11		version 0.7.8.1	- MFO-mntdrag-error
	-- Function enhancement
	# Changed
	1. Display error when appended item is existed in target group
		-- finished
	2. Data duplicate warning message is complete
		-- finished
	3. Group duplicate warning message is complete
		-- finished
	4. Add warning when source and destination is the same
		-- finished
	
--- Monitor-Function-Optimization: start
	## 2023.07.10		version 0.7.8.1
	-- Create new branch
	
--- Monitor-Funcction :	end
	## 2023.07.10		version 0.7.8
	-- Bug fix
	-- Rewrite function
	# Changed
	1. Rewrite drag and drop function
		-- finished
	# Fixed
	1. Add reserved character to main-folder to prevent usergroup name identification
		-- finished
---
	## 2023.07.07		version 0.7.7.9
	-- Bug fix
	# Fixed
	1. Fix drag and drop function not refresh all groups behavior
		-- finished
	2. Fix the bug that mnt-removemenu-remove not refresh all groups
		-- finished
	
---
	## 2023.07.06		version 0.7.7.8
	-- Bug fix
	# Fixed
	1. Fix broken ungroup function
		1-1 group
			-- finished
		1-2 data
			-- finished
		1-3 render
			-- finished
---
	## 2023.07.05		version 0.7.7.7
	-- Bug fix
	# Fixed
	1. Fix the bug that rename function not apply on all groups
		-- finished
	2. Fix rename function editable status cannot be removed after over
		-- finished
	3. Fix the remove function cannot handle array input 
		-- finished
	4. Fix broken ungroup function
		4-1 group
			-- finished
		4-2 data
			-- processing
		4-3 render
---
	## 2023.07.04		version 0.7.7.6
	-- Function enhancement
	-- Bug fix
	# Added
	1. Add error message in movemenu when data exist in every monitored groups
		-- finished
	2. Add error message when there is no monitored group
		-- finished
	# Fixed
	1. Fix the bug that when Groups is empty display Shortcut
		-- finished
	2. Rewrite mnt-remove to id-based to prevent parent duplicate
		-- finished
---
	## 2023.07.03		version 0.7.7.5
	-- Rewrite function
	-- Bug fix
	# Changed
	1. Rewrite drag and drop function
		1-1 Update
			-- finished
		1-2 Remove
			-- processing
		1-3 Render
			-- finished
	2. Rewrite Stemdb and mnt-update as id-based
		-- finished
	# Fixed
	1. Fix the bug that mnt-selected-drag is not removed when drop failed
		-- finished
---
	## 2023.06.30		version 0.7.7.4
	-- Remove wasted codes
	-- Rewrite function
	-- Bug fix
	# Fixed
	1. Fix mnt-selected-drag class position
		-- finished
	# Changed
	1. Rewrite drag and drop function
		1-1 Update
			-- finished
		1-2 Remove
		1-3 Render
---
	## 2023.06.29		version 0.7.7.3
	-- Remove watsted codes
	-- Rewrite function
	# Changed
	1. Rewrite mnt-remove function
		1-1 Groups parts
			-- finished
	2. Rewrite mnt-removemenu-remove function to id-based function
		-- finished
	3. Apply gdb to all Groups loader
		-- finished
	4. Remove mnt-group function
		-- finished
	5. Expand uxSelect function
		-- finished
---
	## 2023.06.28		version 0.7.7.2
	-- Rewrite function
	# Changed
	1. Rewrite uxSelect to store parent monitored groups data
		-- finished
	2. Rewrite mntsort to return monitored groups and monitored data's parent info
		-- finished
	3. Rewrite mntshortcut to dynamic add Shortcut mnt-user-group-id instead of given it a fixed id
		-- finished
	4. Add a gdb to support massively used Groups mdbLoader
		-- finished
	5. Rewrite mnt-remove function
		5-1 Groups part
		5-2 Data parts
			-- finished
---
	## 2023.06.27		version 0.7.7.1
	-- Clear wasted codes
	-- Rewrite function
	-- Remove dependency
	# Changed
	1. Add removemenu to monitored groups 
		-- finished
	2. Remove some unused module dependency
		-- finished
	
---
	## 2023.06.26		version 0.7.7
	-- Function implementation
	-- Rewrite function
	-- Bug fixed
	-- Clear wasted codes
	
	# Added
	1. Add mntquery function to handle basic information look-up
		-- finished
	# Changed
	1. Rewrite mnt-update function to id-based and support groups
		-- finished
	2. Rewrite hide and unhide function for better readability
		-- finished
	3. Hide "Move to {ParentName}" option when target is currently in its parents group
		-- finished
	# Fixed
	1. Fix the bug that Monitored groups can be repeatedly joined
		-- finished
	2. Rewrite unhide function to solve some accidently hiding or unhiding action
		-- finished
	3. Fix the bug that Shorcut block some dropmenu options from showing up
		-- finished
	
---
	## 2023.06.21		version 0.7.6.1
	-- Function implementation
	-- Rewrite function
	# Added
	1. Add mntsort function to sort monitored groups and data in array 
		-- finished
	# Changed
	1. Rewrite uxSelect present more data(monitored groups and data id and entire class) to use
		-- finished
	2. Rewrite mnt-update function to id-based
		2-1 Monitored data
			-- finished
		2-2 Monitored groups
			-- processing
---
	## 2023.06.20		version 0.7.6
	-- Function implementation
	-- Rewrite function
	# Added
	1. Add mntclass function to parse unique class id and class name
		-- finished
	# Changed
	1. Rewrite unique group class name mechanism
		-- finished
	2. Rewrite mntrename function to cancel the unique name handle
		-- finished
	
---
	## 2023.06.19		version 0.7.5.3
	-- Rewrite function
	# Changed
	1. Rewrite mnt-load function to return group id
		-- processing
---
	## 2023.06.16		version 0.7.5.2
	-- Rewrite function
	# Changed
	1. Rewrite dragging mechanism
		-- finished
	# Bugged
	1. Move to Shortcut is missing
	2. Movemenu not trigger group updating
---
	## 2023.06.15		version 0.7.5.1
	-- Rewrite function
	-- Bug fix
	-- Remove wasted codes 
	# Changed
	1. Rewrite ungroup function to improve performance
		-- finished
	# Fixed
	1. Fix the bug that Lab.js and Setting.js import error
		-- finished
---
	## 2023.06.14		version 0.7.5
	-- Function implementation
	-- Rewrite function
	-- Clear wasted codes
	# Added
	1. ungroup function is fully implemented
		-- finished
	2. Add addon.js to wrap all custom scripts as a centralize package
		-- finished
	3. Add arrUniq function into addon.js handle array duplicate removing work
		-- finished
	# Changed
	1. Rewiring mntmain to mntgroupwrite and use isMainExec to adjust the behavior of All
		-- finished
	2. Import addon.js into all backend scripts
  		-- finished
	# Bugged
	1. Monitored data is duplicate in All after drop
	2. When move to an already expanded group, it did not update instantly
---
	## 2023.06.13		version 0.7.4
	-- Function implementation
	-- Rewrite function
	-- Remove wasted code
	-- Bug fix
	# Added
	1. Add extension.js to handle all general functions which can be use in any function section
		-- finished
	2. Add extUniq function to handle duplicate elementsin array
		-- finished
	# Changed
	1. Rewrite uxSelect function let Node return real nodes instead of id
		-- finished
	# Fixed
	1. Fix the bug that mnt-load return non-mainDB id
		-- finished
	2. Fix extUniq recognize all DOM elements as same item error
		-- finished
---
	## 2023.06.12		version 0.7.3
	-- Function implementation
	-- Rewrite function
	-- Database enhancement
	-- Bug fix
	# Added
	1. Add uxSelectAll function to handle identical option selection
		-- finished
	# Changed
	1. Add parent column in Monitor of Stemdb
		-- finished
	2. Rewrite mnt-update to record parent group when updating monitored data
		-- finished
	3. Rewrite mntfunction to adapt the reverse returned value of mnt-update function
		-- finished
	# Fixed
	1. Fixing the undefined error in mntgroupwrite
		-- finished
	2. Fix the error appears when no monitored data exist
		-- finished
---
	## 2023.06.09		version 0.7.2.1
	-- Rewrite function
	-- Bug fix
	# Changed
	1. Rewrite mntgroupwrite function to give better support of array for further multiple selection function
		-- finished
	2. Enhance mnt-main to return id and name
		-- finished
	3. Rewrite unpack function to support multiple layers of res
		-- finished
	# Fixed
	1. Fix the bug that mntgroup misbehavior
		-- finished
	2. Fix the bug that mntmenuAddition catch error
		-- finished
	# Processing
	1. Import unique class for all moitored data
	2. Lighten other mnt function by adapting new unpack mechanism

---
	## 2023.06.08		version 0.7.2.0
	-- Function implementation
	-- Bug fix
	# Added
	1. Add monitored data delete function
		-- finished
	2. Add unique function to handle array duplicate elements
		-- finished
	# Fixed
	1. Fix the bug that monitor section not updated with delete function
		-- finished
---
	## 2023.06.07		version 0.7.1.5
	-- Rewrite function
	-- Bug fix
	# Added
	1. Add a check to censorCheck function to prevent group name starts with white space
		-- finished
	# Changed
	1. Rewrite censorCheck function for better readability and maintainance
		-- finished
	# Fixed
	1. Fix the bug that Add tag trigger mnt centored detection
		-- finished
	2. Fix the bug that mntload return value always lost one element
		-- finished
	3. Fix the bug that mntgroupload fire when renaming
		-- finished
---
	## 2023.06.06		version 0.7.1.4
	-- Clear wasted codes
	-- Function implementation 
	-- Bug fix
	# Added
	1. Add mnt-build function to handle basic database creation
		-- finished
	# Fixed
	1. Fix the bug that warn when no monitored data
		-- finished
---
	## 2023.06.02		version 0.7.1.3
	-- Bug fix
	# Fixed
	1. Add white space check to mntrename
		-- finished
---
	## 2023.06.01		version 0.7.1.2
	-- Bug fix
	-- Clear wasted codes
	# Fixed
	1. Fix the bug that monitored groups can be added to itself
		-- finished
	2. Fix the bug that monitored groups naming error
		-- finished
	3. Fix the bug that movemenu not update with rename function
		-- finished
	4. Fix the naming error when monitored groups writing
		-- finished
	5. Fix the missing contents of monitored groups after renaming
		-- finished
---
	## 2023.05.31		version 0.7.1.1
	-- Rewrite function
	-- Clear wasted codes
	-- Bug fix
	# Changed
	1. Rewrite mntmenuAddition in dynamic function 
		-- finished
	2. Append groupdelete and groupcreate function recreate movemenu after execution
		-- finished
	# Fixed
	1. Sometimes group delete cannot delete the physical db
		-- finished
	2. Monitored groups and data can be duplicate when adding
		-- finished
	3. Fix the bug that when drop in subgroups would duplicate rendering
		-- finished
		
---
	## 2023.05.30		version 0.7.1
	-- Function implementation
	-- Bug fix
	-- Clear wasted codes
	-- Style change
	# Added
	1. Add mntreplace to centralize unique classname
		-- finished
	2. Hide movemenu dropdown option sharing with the same group name
		-- finished
	# Changed
	1. Change the font-size of dropmenu options
		-- finished
	# Fixed
	1. Fix the bug that when deleted groups have no parents or children would not work
		-- finished
	2. Fix the bug that replace reserved characters function sometimes not worl well 
		-- finished
---
	## 2023.05.29		version 0.7.0
	-- Function implementation
	# Added
	1. Finish monitored group delete function
		-- finished
	# Fixed
	1. Fix the bug that physic db not deleted after run the function
		-- finished
---
	## 2023.05.26		version 0.6.9.1
	-- Clear wasted codes
	-- Bug fix
	# Fixed
	1. Fix the bug that created monitored groups are not configured in Groups
		-- finished
	2. Fix the bug that multiple level of array appears in promiseChain
		-- finished
---
	## 2023.05.25		version 0.6.9
	-- Bug fix
	-- Rewrite function
	-- Function implementation
	# Added
	1. Add exception handler(mnterror)
		-- finished
	# Changed
	1. Add unique class for each monitored group
		-- finished
	2. Add reserved or illegal character examine in mntrename
		-- finished
	3. Replace white space with reserved charcter to prevent class forked
		-- finished
	# Fixed
	1. Fix the error in mntgroupload when call at non-header
		-- finished
	2. Fix the bug that hide table have null value
		-- finished
---
	## 2023.05.24		version 0.6.8
	-- Bug fix
	-- Function demo build
	-- Function implementation
	# Added
	1. Build a demo function mntgroupload for testing monitored groups loading
		-- finished		
	2. Add a function mntmenuMovementCreate to auto add option to movemenu
		-- finished
	# Fixed
	1. Fix the bug that when parents over two, return value will be undefined
		-- finished
	2. Fix the bug that when children is zero causing error
		-- finished
---
	## 2023.05.23		version 0.6.7
	-- Function implementation
	-- Rewrite function
	-- Adjust contextmenu display setting
	-- Bug fix
	# Added
	1. Add an unpack function to handle query data from sqlite
		-- finished
	# Changed
	1. Rewrite mnt-update to make support group add
		-- finished
	2. Unhide move menu from groups
		-- finished
	3. Rewrite mnt-load function in multiple promise method
		-- finished
	# Fixed
	1. Fix the bug that Shortcut is counted as a monitored group and load into Groups
		-- finished
---	
	## 2023.05.22		version 0.6.6
	-- Function implementation
	-- Rewrite function
	-- Bug fix
	# Added
	1. Add monitored groups missing scan function
		-- finished
	2. Add more functions at mnt-delete
		-- finished
	3. Add 'Add to Shortcut' function
		-- finished
	# Changed
	1. Rewrite mnt-update in multiple promise method
		-- finished
	2. Rewrite mntfunc function to adapt multiple promise feature
		-- finished
	# Fixed
	1. Fix the bug that table of monitored group is missing
		-- finished
---
	## 2023.05.19		version 0.6.5.1
	-- Bug fix
	-- Style changed
	-- Rewrite function
	# Changed
	1. Add border to header 
		-- finished
	2. Rewrite mnt-update function in group-based method
		-- finished
	# Fixed
	1. Fix the bug that group height would stack by dragging
		-- finished
	2. Fix the bug that drop event never fire
		-- finished
	3. Fix the bug that group cannot update properly
		-- finished
---
	## 2023.05.18		version 0.6.5
	-- Rewrite function
	-- Bug fix
	# Changed
	1. Rewrite mntload function to fit new Groups-based database structure
		-- finished
	2. Rewrite rename function in new group-based method
		-- finished
	# Fixed
	1. Fix the bug that Group append empty item
		-- finished
	2. Fix the bug that duplicate file would miss in rename function
		-- finished
---
	## 2023.05.17		version 0.6.4.1
	-- Rebuild database
	# Added
	1. Add parent and child into Groups.db and remove subgroup
		-- finished
---
	## 2023.05.16		version 0.6.4
	-- Rewrite function
	-- Bug fix
	-- Finction implementation
	-- Clear wasted codes
	# Added
	1. Auto Configure and update Groups after creating a new one
		-- finished
	2. Create group function now support in other groups
		-- finished
	3. Add uxSelect function to deal with select-related actions
		-- finished
	4. Add group delete function
		-- finished
	# Changed 
	1. Change mntgroup into db-based style
		-- finished
	2. Rewrite remove function in contextmenu and mntgroupwrite to fit new uxSelect mechanism
		-- finished
	# Fixed
	1. Fix when you create outside all groups it would crash
		-- finished
	2. Fix the bug that Groups cannot update after creating new group
		-- finished
	3. Fix the bug that some groups cannot update after group create function
		-- finished
---
	## 2023.05.15		version 0.6.3.1
	-- Update function
	-- Rewrite function
	-- Code re-arrangement
	# Added
	1. Add unhide function to handle exception case
		-- finished
	2. Create new group support created in a group
		-- processing
	3. Remove groups from all groups
		-- processing
	# Changed
	1. Add grouprename and groupremove function into hide list
		-- finished
	2. Make hide function for massive codes reduction
		-- finished
	3. Unhide new function in Groups
		-- finished
---
	## 2023.05.12		version 0.6.3
	-- Function implementation
	-- Bug fix
	-- Clear wasted codes
	-- Style change
	# Added
	1. Add group rename function
		1.1 Rename when click
		-- finished
	2. Add idPicker to handle all duplicate naming problem
		-- finished
	# Changed
	1. Apply idPicker at group create function
		-- finished
	2. Make Groups in monitored section is scrollable and increase max height
		-- finished
	# Fixed
	1. Solve the bug that cannot select folder
		-- finished
	2. Fix the bug that selected header not highlighted
		-- finished
	3. Fix the bug that click inside the editable block would parse data
		-- finished
	4. Fix when group rename is duplicate would overwrite the older same name db
		-- finished
	5. Reload group after new group created
		-- finished
---
	## 2023.05.11		version 0.6.2
	-- Rewire function
	-- Function implementation
	-- Clear wasted codes
	-- Build infrastructure
	# Added
	1. Add mntdragfunc to implement new mntdrag event listener
		-- finished
	2. Add more option to contextmenu
		-- finished
	# Changed 
	1. Rewire the original crappy drag and drop to new event listener mntdrag
		-- finished
---
	## 2023.05.10		version 0.6.1
	-- Rewrite function
	# Changed
	1. Rewrite mntfold to react the case of subgroup
		-- finished
	2. Rewrite mntfold in a deep way for further developing
		-- finished
---
	## 2023.05.09		version 0.6.0.1
	-- Function implementation
	-- Rewrite function
	-- Remove wasted codes
	# Added
	1. Apply basic function at subgroup
		-- finished
	# Changed
	1. Rewrite mntfold in a delegation way
		-- finished
		
---
	## 2023.05.08		version 0.6.0
	-- Implement function
	# Added
	1. Add create group function
		-- finished
	2. Add custom group loading function
		-- finished
---
	## 2023.05.05		version 0.5.9
	-- Rewrite function
	-- Implement function
	-- Remove wasted code
	-- Bug fix
	-- Style Change
	-- Remove dependency
	# Added
	1. Implement custom class reader for more flexible class-based function executer
		-- finished
	2. Apply hiding controll in contextmenu function
		-- finished
	# Changed
	1. Rewrite event to customevent to handle complicated data 
		-- finished
	2. Add more details in mnt for more complete condition
		-- finished
	3. Remove fs-info because it is no longer need
		-- finished
	4. Arrange fs-path to the bottom by flexbox
		-- finished
	5. Remove the dependency of glob module
		-- finished
	# Fixed
	1. Fix the bug that all submenu functions of contextmenu are passive
		-- finished
	# Bugged
	1. Fix the bug that drag data cause duplicate expand
		-- finished
---
	## 2023.05.04		version 0.5.8.1
	-- Rewrite function
	# Changed
	1. Rewrite the behavior of uxContextMenuRemove in custom event to fix prority bug
		-- finished
---
	## 2023.05.03		version 0.5.8
	-- Rewrite function
	-- Function implementation
	-- Clear wasted codes
	# Added
	1. Add customized option hide function(contextmenu) globally
		-- finished
	2. Add global context menu target select function with exception handler
		-- finished
	3. Add contextmenu create rxception handler
		-- finished
	4. Add contextmenu hide setting applier
		-- finished
	# Changed
	1. Rewrite contextmenu removal mechanism
		-- finished
	2. Rewrite contextmenu function in delegation way and transfer into index-ux
		-- finished
	3. Merge contextmenu related function
		-- finished
---
	## 2023.05.02		version 0.5.7.1
	-- Bug Fix
	-- Remove some wasted codes
	# Fixed
	1. Fix that remove function not refresh
		-- finished
	2. Fix data can be duplicated in monitored group
		-- finished
	3. Fix collapse height auto adjustment bug in some function 
		3.1 mntremove
		3.2 drop
		3.3 mntmain
		-- finished
---
	## 2023.04.28		version 0.5.7
	-- Function implementation
	-- Function rewiring
	-- Style change
	-- Clear wasted codes
	# Added
	1. Updating monitored group database when dragging in 
		-- finished
	2. Auto load monitored data when app ready
		-- finished
	3. Basic structure of contextmenu function
		-- finished
	4. Add contextmenu selected function
		-- finished
	# Changed
	1. Merging highlight monitored group function into mntstyle
		-- finished
	2. Build mntbuild to control the processing of mnt building
		-- finished
	3. Add submenu hover effect
		-- finished
	4. Rebuild mntcheck to handle all class type check 
		-- finished
	5. Rebuild mntselected to handle all selected related worked
		-- finished
---
	## 2023.04.28		version 0.5.6.2
	-- Bug fix
	# Fixed
	1. Fix the incorrect check in mntfunc jump function
		-- finished
	2. Fix the incorrect behavior of expanding function
		-- finished
---
	## 2023.04.27		version 0.5.6.1
	-- Bug fix
	# Fixed
	1. Auto detect essential folders existence
		-- finished
	2. Fix the error in mntmain when no data 
		-- finished
	3. Fix the unable to open database bug	
		-- finished
---
	## 2023.04.26		version 0.5.6
	-- Bug fix
	-- Clear wasted codes
	# Fixed
	1. Submenu now can correctly positioning
		-- finished
	2. Fix the bug that when contextmenu is too low, submenu sink into page bottom
		-- finished
	3. Fix the submenu is existed after contextmenu is off.
		-- finished
---
	## 2023.04.25		version 0.5.5.3
	-- Bug fix
	# Fixed
	1. Fix the false position value
		-- finished
	2. Fix the contextmenu overflow out of page
		-- finished
	3. Fix the submenu status is inherit to next contextmenu
		-- finished
	4. Fix position is not worked at first click
		-- finished
---
	## 2023.04.25		version 0.5.5.2
	-- Submenu function
	# Added
	1. Add multiple layers to contextMenu
		-- finished
	# Bugged
	1. Submenu position is incorrect
	
---
	## 2023.04.24		version 0.5.5.1
	-- Rewrite function
	-- Improve contextMenu positioning accuracy
	-- Style change
	# Changed
	1. Rewrite function in delegation way
		1.1 mntmenu
		-- finished
	2. Improve positioning accuracy of contextMenu in mnt
		-- finished
---
	## 2023.04.20		version 0.5.5
	-- Bug fix
	-- Rewrite function
	# Fixed
	1. Fix the bug that mntfunc run before mntmain over
		-- finished
	2. Fix the bug that drop cannot trigger highlight remove
		-- finished
	# Changed
	1. Rewrite function in delegation way
		1.1 mntfunc data function
		1.2 mntfunc folder function
		1.3 mntstyle
		1.4 mntfold
		-- finished
---
	## 2023.04.19		version 0.5.4.1
	-- Funcction iplementation
	-- Bug fix
	-- Code rewrite
	-- Remove wasted codes
	# Fixed
	1. Fix smooth effect missing bug
		-- finished
	2. Fix monitored data highlight effect last permanently
		-- finished
	# Added
	1. Add expand check in dragging function to prevent collapsing
		-- finished
	# Changed
	1. Rewrite some codes from flexible to fixed due to css poor behaviour
		-- finished
---
	## 2023.04.18		version 0.5.4
	-- Function re-import
	# Added
	1. Fix the dragenter and dragleave bug and re-import resize function
		-- finished
	2. Add smooth expansion and collapsing animation to monitored groups
		-- finished
		
---
	## 2023.04.17		version 0.5.3.3
	-- Bug fix
	-- Style change
	# Fixed
	1. Fix the bug that monitored path is highlighted after dropping
		-- finished
	2. Fix the bug that all objects in a monitored groups are merged
		-- finished
	# Changed
	1. When hovering, the header of monitored groups would be highlighted
		-- finished
---
	## 2023.04.14		version 0.5.3.2
	-- Bug fix
	-- Function implementation
	# Added
	1. Basic drag and drop function on monitored data
		-- finished
	2. Resize monitored folders are dragged in and turn back when finished
		-- finished
	# Fixed 
	1. Fix the bug that monitored function could not properly apply
		-- finished
---	
	## 2023.04.14		version 0.5.3.1
	-- Bug fix
	-- Style change
	# Fixed
	1. Fix the bug that first click is ignored at monitored group
		-- finished
	# Changed
	1. Set the hover color 'Aquamarine Green' to monitored data and pressed color
---
	## 2023.04.13		version 0.5.3
	-- Remove wasted codes
	-- Function implementation
	# Added
	1. Add Monitored context menu for data manipulation
		-- finished
	2. Add auto cancel when click outside monitored menu
		-- finished
---
	## 2023.04.12		version 0.5.2
	-- Bug fix
	-- Style change
	-- Function implementation
	# Added
	1. Monitored group expansion and collapsing function
		-- finished
	2. Refresh monitored list after tag add
		-- finished
	# Fixed
	1. Apply class rather than id in mnt-folder-header 
		-- finished
	# Changed
	1. Apply outline on mnt-folder and mnt-folder-header
		-- finished
---
	## 2023.04.11		version 0.5.1
	-- Bug fix
	# Added
	1. Add link function in monitored folder
		-- finished
	2. Open directory now reset floor number
		-- finished
	# Fixed
	1. Fix monitored folder's path overflow
		-- finished
---
	## 2023.04.10		version 0.5.0
	-- Function implementaion
	# Added
	1. Load Monitored folders and print
		-- finished
---
	## 2023.03.31		version 0.4.9.2
	-- Bug fix
	# Fixed
	1. Stemmeta and Stemdb now is no longer supported to be taggable
		-- finished
---
	## 2023.03.28		version 0.4.9.1
	-- Clear wasted codes
	-- Add smooth scroll 
	-- Rewrite function
	# Added
	1. Add smooth scroll when append new floor
		-- Bugged
	# Bugged
	1. Stemmeta and Stemdb is visible for this system
		-- Bugged
	# Changed
	1. Rewrite dataMiner from forEach to for loop
		-- finished
---
	## 2023.03.27		version 0.4.9
	-- Redesign the style
	-- Bug fix
	# Added
	1. Make fs-floor-0 size fulldiv when there is only one div on board
		-- finished
	2. Make each div can be scrolled independently
		-- finished
	# Changed
	1. Rename the index-ux.js with index-tag.js
		-- finished
	# Fixed
	1. Fix the bug that border limited within the initial height and width of div
		-- finished
---
	## 2023.03.25		version 0.4.8
	-- Remove wasted codes
	-- Build new data table
	-- Function implementation
	# Added
	1. Add Monitor data table
		-- finished
	2. Add Monitored check before tag display
		-- finished
---
	## 2023.03.25		version 0.4.7
	-- Function implementation
	# Added
	1. Add fully functional support in fslabel redirecting
		-- finished
	# Changed
	1. Slightly modify the behavior of uxselect to fit the change of floor structure
		-- finished
---
	## 2023.03.25		version 0.4.6.1
	-- Bug fix
	# Changed
	1. Fix the bug that cause this-floor class is duplicate 
		-- finished
---
	## 2023.03.24		version 0.4.6
	-- Add path support
	# Added
	1. Make the oath button can functioned with new fsfloor mechanism 
		-- bugged
---
	## 2023.03.23		version 0.4.5.2
	-- Rewrite function
	-- Bug fix
	-- Remove wasted codes
	# Changed
	1. Rewrite fsfloor sign function with a more flexible and potentially more efficient way 
		-- finished
	2. Rewrite fsgetPath function from regular expression to array
		-- finished
	# Fixed
	1. Fix the bug that rename fsfloorInit with fsfloorSign
		-- finished
	2. Fix the bug that sometimes pop up 'Not defined' warnings
		-- finished
---
	## 2023.03.23		version 0.4.5.1
	-- Bug Fix
	# Fixed
	1. Fix the CSP warning and performance issue in fsfloor system
		-- finished
	2. Fix the bug that floor sign function did not follow the floor overflow
		-- finished
---
	## 2023.03.21		version 0.4.5
	-- Function Implementation
	# Added
	1. Add Open File Function
		-- finished

---
	## 2023.03.21		version 0.4.4
	-- Function implementation
	-- Re-arrange code structure
	-- Build a onReady function for file system
	# Added
	1. Add floor sign function 
		-- finished
	2. Add fsInit to wrap initializer and clarify the timepoint of rendering
		-- finished
	3. Add auto writer to move up floor to low floor when floor over the max limit
		-- finished
---
	## 2023.03.20		version 0.4.3
	-- Remove wasted codes
	-- Resize fsfloor when browse
	
	# Added
	1. Clear and fold not using floor
		-- finished
--- 
	## 2023.03.17		version 0.4.2	
	
	# Added
	1. Add Delete all data function for uninstalling
		-- Testing
	# Changed
	1. Fix Dark mode issiue
		-- finished
---
	## 2023.03.17		version 0.4.1
	-- Style change
	-- Jump to section function
	# Added
	1. Add jump to new section function
		-- finished
	2. Highlight corresponding path part when hovering fsfloor
		-- processing
	# Changed
	1. Fix the width of fs-label to fit window size changes
		-- finished
	2. Resize width with append fsfloor
		-- finished
	
		
---
	## 2023.03.16		version 0.4.0
	-- Style change
	-- Structure change
	-- Implement function
	# Added
	1. Add fs-floor for further structured-type file system implementation
		-- finished
	2. Implement fsfloor structure
		-- finished
	# Changed
	1. Set toolbar sticky to top
		-- finished
	2. Set horizontal display and nowrap 
		-- finished
---
	## 2023.03.16		version 0.3.9.3
	-- Bug fix
	-- Clear wasted codes
	# Fixed
	1. Fix path browsing function double slash bug
		-- finished
---
	## 2022.03.15		version 0.3.9.2
	-- Bug fix
	# Fixed
	1. Fix tag display,add and delete function defect due to new fspath mechanism
		-- finished
	2. Fix when uplevel to drive would get double slash
		-- finished
---
	## 2023.03.15		version 0.3.9.1
	-- Bug Fix
	-- Rewrite function
	# Changed
	1. Rewrite drive checking process
		-- finished
	# Fixed
	1. Fix FATAL ERROR: Error::ThrowAsJavaScriptException napi_throw
		-- finished
---
	## 2023.03.14		version 0.3.9
	-- Path structure function
	-- Clear wasted codes
	-- Style design
	# Added
	1. Add browsing function through file path
		-- finished
	2. Give color to check hover and pressed and return to default when leaving
		-- finished
---
	## 2023.03.13		version 0.3.8
	-- Rewrite function
	# Changed
	1. Rewrite uplevel, getpath and file label button function
		-- finished
---
	## 2023.03.10		version 0.3.7.1
	-- Rewrite function
	-- Bug fix
	# Changed
	1. Slightly modified some codes
		-- finished
	2. Fix the bug if interact file in a directory without meta
		-- finished
	3. Rewrite home path display
		-- finished
		
---
	## 2023.03.09		version 0.3.7
	-- Clear wasted codes
	-- Rewrite function
	-- Deprecate node-json-db
	# Added
	1. Add the follow-up function to tag system
		-- finished
	# Changed
	1. Rewrite tagmain frome clicked trigger to one action for all
		-- finished
	2. Merge tagfunc and tagdisplay
		-- finished
	3. Rewrite tag selected mechanism and prepare for further tag editing fuction
		-- finished
	4. Modularize file label processing in tagsearch makes accessed from outside is available
		-- finished
	5. Deprecate node-json-db
		-- finished
	
---
	## 2023.03.08		version 0.3.6
	-- Rewrite function
	-- Clear wasted codes
	-- Fix Bug
	# Fixed
	1. Add popup warning window when not input tag but press tag button
		-- finished
	# Changed
	1. Rewrite tag query function to present a more flexible function
		-- finished
	2. Rewrite all screen rendering function and wrap into one
		-- finished
---
	## 2023.03.07		version 0.3.5
	-- Rewrite function
	-- Clear wasted codes
	-- Bug fix
	
	# Changed
	1. Rewrite selection function
		-- finished
	
	# Fixed
	1. Fix search label wrongly parsing path
		-- finished
		
---
	## 2023.03.06		version 0.3.4
	-- Bug Fix
	-- Clear wasted codes
	# Changed
	1. Rewrite tooltip display function to more accurate version
		-- finished
	2. Rewrite tag label function
		-- finished
		
	# Fixed
	1. Return path instead of tag when querying a tag
		-- finished
---
	## 2023.03.03		version 0.3.3
	-- Rewrite function
	-- Clear wasted codes
	# Changed
	1. Add name squery in partial match
		-- finished
	2. Add new column file in File table for matching
		-- finished
	3. Rewrite the display of ellipsis in query results
		-- finished
	4. Display tooltip when hovering
		-- finished
---
	## 2023.03.02		version 0.3.2.1
	-- Rewrite function
	
	# Changed
	1. Assign function to match results
		-- finished
---
	## 2022.03.01		version 0.3.2
	-- Clear wasted codes 
	-- Rewrite function
	# Changed
	1. Remove tag-getdb and replace to new tag match function
		-- processing
---
	## 2023.02.23		version 0.3.1.1
	-- Fix Asynchronous works 
	# Fixed
	1. Wrap tag add function and tag delete in a big promise to ensure executed
		-- finished
---
	## 2023.02.21		version 0.3.1
	-- Revist old function by new method
	
	# Changed
	1. Rewrite tag added function with sqlite
		-- finished
	2. Rewrite tag display function
		-- finished
	3. Rewrite tag delete function
		-- finished
		
---
	## 2023.02.20		version 0.3.0.2
	-- Replace database
	-- Fix typo
	# Added
	1. Replace old node-json-db with Sqlite
		-- finished
	2. Build a new database can handle many to many 
	# Fixed
	1. Massive date typo in log.md
		-- finished
--
	## 2023.02.18		version 0.3.0.1
	-- Rewrite function
	
	# Changed
	1. Use css replace js function of highlight
		-- finished
	2. Rewrite focus function by js 
		-- finished
---
	## 2023.02.17		version 0.3.0
	-- Rewrite function
	-- Protection mechanism
	
	# Added
	1. Add protection to prevent protected file like system files rendered
		-- finished
	# Changed
	1. Rewrite file system file display function to a more proficient way
		-- finished
	2. Rewrite data-label click and hover function
		-- finished
---	
	## 2023.02.17		version 0.2.9.1
	-- Protection mechanism
	
	# Added
	1. Add protection in dataMiner when access system folders or crypted files
		-- finished
---		
	## 2023.02.16		version 0.2.9
	-- Function implementation
	-- Bug fix
	-- Style design change
	
	# Added
	1. Show partly path info until hover it in search label
		-- finished
	2. Ellipsis in path info when it's too longer
		-- finished
	# Changed
	1. Set fixed height as fs-path to erase the instability
		-- finished
	2. Re-arrange the css to fit the ranking
		-- finished
	# Fixed
	1. Fix tag label browse function
		-- finished
---
	## 2023.02.15		version 0.2.8
	-- Function implementation
	-- Function expansion
	-- Clear debug codes
	-- Code re-arrangement
	# Added
	1. Tag label now is fully functional
		-- finished
	2. Tag file label add select function
		-- finished
	3. When click searchbar auto select the field
		-- finished
	4. Add double click function in match label
		-- finished
	5. When click match label redirect to selected position
		-- finished
	6. Refresh matchlist when tag added
		-- finished
	# Changed
	1. Set debug input field as hidden 
		-- finished
	2. Re-arrange the position of functions for calling
		-- finished
---
	## 2023.02.14		version 0.2.7.1
	-- Function implementation
	
	# Added
	1. Add demo-query function to search result button
		-- finished
---
	## 2023.02.13		version 0.2.7
	-- Bug fix
	-- Rewrite function
	-- Add new enviroment variable
	-- Function implementation

	# Added
	1. Add new environment variable 'MatchDisplayNum' to operate the display number in match
		-- finished
	2. When press match result auto input that result into the searchbar
		-- finished
	3. Implement search function for tags or file name searching
		-- finished
	
	# Changed
	1. Rewrite match function for faster display
		-- finished
		
	# Fixed
	1. Fix bug in Setting.js results from resolve require method
		-- finished
---
	## 2023.02.10		version 0.2.6.2
	-- Add up the layer of database
	
	# Added
	1. Add name layer in database for quick search
		-- finished
---
	## 2023.02.10		version 0.2.6.1
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
	## 2023.02.09		version 0.2.6
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
	## 2023.02.08		version 0.2.5.1
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
	## 2023.02.07		version 0.2.5
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
	## 2023.02.07		version 0.2.4.1
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
	## 2023.02.06		version 0.2.4
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
	## 2023.02.04		version 0.2.3
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
	## 2023.02.03		version 0.2.2.1
	-- Fix node-json-db core bug
	
	## Fixed
	1. Fix the core bug in node-json-db push function array support by merge function
		-- finished
---
	## 2023.02.03		version 0.2.2
	-- Finish Tag function
	-- Code re-arrangement
	
	## Added
	1. Add a block for tag input
		-- finished
	2. Fatal bug in push function
		-- bugged
---
	## 2023.02.02		version 0.2.1
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
	## 2023.02.01		version 0.2.0
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
	## 2023.02.01		version 0.1.91
	-- Separate time function
	
	## Changed 
	1. Separate timeStamp function from a sub-function to a standalone script for precisely developing
		-- finished
	2. Rename timeStamp function to time
		-- finished
---
	## 2023.01.31		version 0.1.9
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
	## 2023.01.31		version 0.1.8
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
	## 2023.01.30		version 0.1.7
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
	## 2023.01.30		version 0.1.6
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
	## 2023.01.19		version 0.1.5
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
	## 2023.01.19		versuin 0.1.4.1
	-- Remove annotations
	
	## Changed
	1. Remove useless annotation in index.js
		-- finished
	2. Rearrange the codes in setting.js
		-- finished
		
---
	## 2023.01.19		version 0.1.4
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
	## 2023.01.19		version 0.1.3
	-- New function scripts
	-- Function implementation
	
	## Added
	1. Add a new script called Check.js used for converting all strings to number if possible and return it
		-- finished
	2. Finish write,record function in setting.js
		-- finished
---
	## 2023.01.18		version 0.1.22
	-- Function improvement
	## Added
	1. Add Write,Record and Reset function in setting.js
		-- processing
	
	## Changed
	1. Rebuild Autofill function with more efficient way
		1-1 Name after a element id in html with corresponded database index and gived classname'option' to activate Autofill
		-- finished
---
	## 2023.01.18		version 0.1.21
	-- Bug fix
	-- Rename id
	
	## Changed
	1. Rename id in Setting.html for further developing
		-- finished
	## Fixed
	1. Fix Setting.js cannot recognize v
	
---
	## 2023.01.17		version 0.1.2
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
	## 2023.01.17		version 0.1.11
	-- Remove annotation
	-- File Structure re-arrangement
	
	## Changed
	1. Remove some wasted annotation
		-- finished
	2. Move stpreload.js from static to bin for functional isolation
		-- finished
---
	## 2023.01.16		version 0.1.1
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
	## 2023.01.16		version 0.1.0
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
	## 2023.01.13		version 0.0.94
	-- Text modification
	-- Add communication channel but bugged
	### Added
	1. Set up communication test
		-- bugged
		
	### Changed
	1. Modify annotation
		-- finished
		
---
	## 2023.01.13		version 0.0.93
	-- Testing Git hub function
---
	## 2023.01.12		version 0.0.92
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
	## 2023.01.09		version 0.0.91
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
	## 2023.01.09		version 0.0.9
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
	## 2023.01.06		version 0.0.81
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
	## 2023.01.05		version 0.0.8
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
	## 2023.01.04		version 0.0.7
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
	## 2023.01.04		version 0.0.6
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
	## 2023.01.03		version 0.0.53
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
