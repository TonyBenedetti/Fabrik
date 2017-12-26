/**
 * 
 */
class GN {
	/**
	 * 
	 */
	/*
	function listAllProperties(o) {
		var objectToInspect;     
		var result = [];
		for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)) {  
			result = result.concat(Object.getOwnPropertyNames(objectToInspect));  
		}
		return result; 
	}
	*/

	/**
	 * The form has just been loaded or the user has just chosen a division of a year:
	 * -- division possibilities are: month, quarter, third, half & season
	 * -- change the label on the "_picklist" element
	 * -- update "_picklist" element with the value that may have been previously saved
	 *
	 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
	 */
	function commonDateDivisionType(thisElement) {
		var thisForm, elementFullname, elementName;
		var tableName, tabName, basicName, nameRoot;
		var picklistLabel, picklistName;
		var suffixes, suffix;
		var saverName, saverValue, activeName, activeValue;
		thisForm        = thisElement.form;
		elementFullname = String(thisElement.options.fullName);
		elementName     = elementFullname.match(/[a-zA-Z0-9]+___(\w+)/)[1];
		tableName       = elementFullname.match(/(\w+)___\w+/)[1];
		tabName         = elementName.match(/([a-zA-Z0-9]+)_\w+/)[1];
		basicName       = elementName.match(/[a-zA-Z0-9]+_(\w+)/)[1];
		basicName       = basicName.match(/([a-zA-Z0-9]+)_\w+/)[1];
		nameRoot        = tableName + '___' + tabName;
		picklistLabel = String(thisForm.elements.get(elementFullname).getValue());
		picklistName  = picklistLabel.toLowerCase();
		suffixes = ['picklist', 'accuracy', 'confidence'];
		suffixes.forEach(function(suffix) {
			saverName  = nameRoot + '_saver_' + picklistName + '_' + suffix;
			activeName = nameRoot + '_' + basicName + '_' + suffix;
			saverValue = thisForm.elements.get(saverName).getValue();
			if (suffix == 'picklist') {
				thisForm.elements.get(activeName).setLabel(picklistLabel);
			}
			thisForm.elements.get(activeName).update(saverValue);
		});
		return;
	}

	/**
	 * The form has just been loaded or the user has just chosen 
	 * a value for this division of a year:
	 * -- division possibilities are: month, quarter, third, half & season
	 * -- stow away that value in the corresponding "_saver_" element
	 *
	 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
	 */
	function commonDateDivisionPicklist(thisElement) {
		var thisForm, elementFullname, elementName;
		var tableName, tabName, basicName, nameRoot;
		var typeLabel, typeName;
		var suffixes, suffix;
		var saverName, saverValue, activeName, activeValue;
		thisForm        = thisElement.form;
		elementFullname = String(thisElement.options.fullName);
		elementName     = elementFullname.match(/[a-zA-Z0-9]+___(\w+)/)[1];
		tableName       = elementFullname.match(/(\w+)___\w+/)[1];
		tabName         = elementName.match(/([a-zA-Z0-9]+)_\w+/)[1];
		basicName       = elementName.match(/[a-zA-Z0-9]+_(\w+)/)[1];
		basicName       = basicName.match(/([a-zA-Z0-9]+)_\w+/)[1];
		nameRoot        = tableName + '___' + tabName;
		typeFullname    = nameRoot + '_' + basicName + '_type';
		typeName = String(thisForm.elements.get(typeFullname).getValue().toLowerCase());
		suffixes = ['picklist', 'accuracy', 'confidence'];
		suffixes.forEach(function(suffix) {
			saverName  = nameRoot + '_saver_' + typeName + '_' + suffix;
			activeName = nameRoot + '_' + basicName + '_' + suffix;
			saverValue = thisForm.elements.get(saverName).getValue();
			activeValue = thisForm.elements.get(activeName).getValue();
			thisForm.elements.get(saverName).update(activeValue);
		});
		return;
		}

	/**
	 * Show/hide combinations of the Fabrik groups
	 * (and their tabs) used to develop a date or
	 * duration based on the chosen date type
	 * (single date, start/end, start/duration,
	 * duration/end, duration)
	 *
	 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
	 * @TODO get list of groups plus new function to loop array of 3 "hide/show"s for choice switch below
	 */
	function commonDateType(thisElement) {
		var thisForm        = thisElement.form;
		var elementFullname = String(thisElement.options.fullName);
		var chosen = thisForm.elements.get(elementFullname).getValue();
		var choice1 = 'Single Date';
		var choice2 = 'Start/End';
		var choice3 = 'Start/Duration';
		var choice4 = 'Duration/End';
		var choice5 = 'Duration';
		var tabGroupA = '#group118_tab';
		var tabGroupB = '#group122_tab';
		var tabGroupC = '#group121_tab';
		switch(chosen) {
		case choice1 :
			jQuery(tabGroupA).show();
			jQuery(tabGroupB).hide();
			jQuery(tabGroupC).hide();
			jQuery(tabGroupA).trigger('click');
			break;
		case choice2 :
			jQuery(tabGroupA).show();
			jQuery(tabGroupB).hide();
			jQuery(tabGroupC).show();
			jQuery(tabGroupA).trigger('click');
			break;
		case choice3 :
			jQuery(tabGroupA).show();
			jQuery(tabGroupB).show();
			jQuery(tabGroupC).hide();
			jQuery(tabGroupA).trigger('click');
			break;
		case choice4 :
			jQuery(tabGroupA).hide();
			jQuery(tabGroupB).show();
			jQuery(tabGroupC).show();
			jQuery(tabGroupB).trigger('click');
			break;
		case choice5 :
			jQuery(tabGroupA).hide();
			jQuery(tabGroupB).show();
			jQuery(tabGroupC).hide();
			jQuery(tabGroupB).trigger('click');
			break;
		}
		return;
	}

	/**
	 * Formatting based on chosen calendar type.
	 *
	 * @param {Object} thisElement - The Fabrik element calling us via onLoad or onClick.
	 * @param {string} tabName - "start", "duration", or "end"
	 * @todo Get Fourmilab calendar working
	 */
	/*
	function commonDateCalendarType(thisElement, tabName) {
		return; // "beat it" - until rest of function is ready to be tested
		var thisForm = thisElement.form;
		var table    = 'gn_event___' + tabName;
		var baseName = table + '_date';
		var lineName  = baseName + '_division';
		var calendars  = baseName + '_calendar_type';
		var calendar = thisForm.elements.get(calendars).getValue();
		switch(calendar) {
		case 'iso-edtf' :
			// change division & subdiv headers
			break;
		case 'iso-yd' :
			// hide the division subgroup
			// set the number of days for dropdown to ~365
			break;
		case 'iso-ywd' :
			// hide the division subgroup
			// set the number of weeks for dropdown to ~52
			// set the number of days for dropdown to 7
			// set division header to "--- Week" 
			break;
		case 'julian' :
			break;   
		}
	}
	*/

	/**
	 * describe the function.
	 *
	 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
	 * @param {string} tabName - "start", "duration", or "end"
	 */
	/*
	function commonDateLineShowHide(thisElement, tabName, line, action) {
		var thisForm = thisElement.form;
		var table, tableName, baseName, lineName, elems
		tableName = thisForm.options.primaryKey.match(/(\w+)___\w+/)[1];
		table     = tableName + tabName;
		baseName  = table + '_date';
		lineName  = baseName + '_' + line;
		elems[] = baseName + '_header';
		elems[] = table    + '_spacer_4a';
		elems[] = table    + '_spacer_4b';
		elems[] = table    + '_spacer_5b';
		elems[] = lineName;
		elems[] = lineName + '_accuracy';
		elems[] = lineName + '_confidence';
		for (i = 0, i < elems.length, i++) {
			thisForm.elements.get(elems[i].id).hide();
		}
	}
	*/
}