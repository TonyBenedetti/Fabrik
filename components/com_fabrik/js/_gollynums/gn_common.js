/*
function doMyStuff(el) {
   // PK is in el.form.options.primaryKey, so you can regex out the table name ...
   var tableName = el.form.options.primaryKey.match(/(\w+)___\w+/)[1];
}

The form id is in el.form.id.
*/
/* ============================= */
/*
function hideShowElements(el) {
    var form = el.form;
    var show = el.get('value');
    elems = jQuery("[id^=" + el.options.element + "_]");
    // hide a number of elements
    for (var i=0; i< elems.length; i++) {
        if (show == true)
            form.formElements.get(elems[i].id).show();
        else
            form.formElements.get(elems[i].id).hide();
    }
}
*/
/* =================================== */
/*
for ($year = date('Y'); $year > date('Y', strtotime('-10 years')); $year--)
  $options[] = ($year == date('Y', strtotime ('-1 year')))
        ? JHTML::_('select.option',$year,$year,'SELECTED')
        : JHTML::_('select.option',$year,$year); 
return $options;
*/


/**
 * describe the function.
 
 * @param {type} name - description.
 */
 
 
/**
 * Show/hide combinations of the Fabrik groups (and their tabs) used to delelop
 * a date or duration based on the chosen date type (single date, start/end, 
 * start/duration, duration/end, duration)
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 * @param {string} tabName - "start", "duration", or "end"
 */
function event_type(thisElement) {
   var thisForm = thisElement.form;

   var table = 'gn_event___';
   var buttons = table + 'type';

   var chosen = thisForm.elements.get(buttons).getValue();

   var choice1 = 'Single Date';
   var choice2 = 'Start/End';
   var choice3 = 'Start/Duration';
   var choice4 = 'Duration/End';
   var choice5 = 'Duration';

   var groupA = '#group118_tab';
   var groupB = '#group122_tab';
   var groupC = '#group121_tab';

   switch(chosen) {
      case choice1 :
         jQuery(groupA).show();
         jQuery(groupB).hide();
         jQuery(groupC).hide();
         jQuery(groupA).trigger('click');
         break;

       case choice2 :
         jQuery(groupA).show();
         jQuery(groupB).hide();
         jQuery(groupC).show();
         jQuery(groupA).trigger('click');
         break;

       case choice3 :
         jQuery(groupA).show();
         jQuery(groupB).show();
         jQuery(groupC).hide();
         jQuery(groupA).trigger('click');
         break;

       case choice4 :
         jQuery(groupA).hide();
         jQuery(groupB).show();
         jQuery(groupC).show();
         jQuery(groupB).trigger('click');
         break;

       case choice5 :
         jQuery(groupA).hide();
         jQuery(groupB).show();
         jQuery(groupC).hide();
         jQuery(groupB).trigger('click');
         break;
   }
}

/**
 * describe the function.
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 * @param {string} tabName - "start", "duration", or "end"
 */
function date_division(thisElement, tabName) {
   var thisForm   = thisElement.form;

   var table      = 'gn_event___';
   var baseName   = table + tabName + '_date_division';

   var divisions  = baseName;
   var choices    = baseName + '_choice';
   var accuracy   = baseName + '_accuracy';
   var confidence = baseName + '_confidence';
   var savers     = baseName + '_saver_';

   var division   = thisForm.elements.get(divisions).getValue();

   var saver      = (savers + division).toLowerCase();
   var saved      = thisForm.elements.get(saver).getValue();
   thisForm.elements.get(choices).update(saved);
   thisForm.elements.get(choices).setLabel(division);
}


/**
 * describe the function.
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 * @param {string} tabName - "start", "duration", or "end"
 */
function date_division_choice(thisElement, tabName) {
   var thisForm   = thisElement.form;
   
   var table     = 'gn_event___';
   var baseName  = table + tabName + '_date_division';

   var divisions = baseName;
   var choices   = baseName + '_choice';
   var savers    = baseName + '_saver_';

   var division  = thisForm.elements.get(divisions).getValue();
   var choice    = thisForm.elements.get(choices).getValue();

   var saver     = (savers + division).toLowerCase();
   thisForm.elements.get(saver).update(choice);
}


/**
 * Formatting based on chosen calendar type.
 
 * @param {Object} thisElement - The Fabrik element calling us via onLoad or onClick.
 * @param {string} tabName - "start", "duration", or "end"
 * @todo Get Fourmilab calendar working
 */
function calendar_type(thisElement, tabName) {
return; // "beat it" - until rest of function is ready to be tested

   var thisForm = thisElement.form;
   
   var table    = 'gn_event___' + tabName;
   var baseName = table + '_date';
   var lineName  = baseName + '_division';
   
   var calendars  = baseName + '_calendar_type';

   var calendar = thisForm.elements.get(calendars).getValue();
   
   switch(calendar) {
   /* change division & subdiv headers */
      case 'iso-edtf' :
         break;
         
      case 'iso-yd' :
      /* hide the division subgroup */
      
      /* set the number of days for dropdown to ~365 */
         break;
         
      case 'iso-ywd' :
      /* hide division selector */
      /* set the number of weeks for dropdown to ~52 */
      /* set the number of days for dropdown to 7 */
      /* set division header to "--- Week" */
         break;
         
      case 'julian' :
         break;   
}


/**
 * describe the function.
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 * @param {string} tabName - "start", "duration", or "end"
 */
function lineShowHide(thisElement, tabName, line, action) {
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