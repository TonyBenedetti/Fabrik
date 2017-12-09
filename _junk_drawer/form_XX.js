/*
function doMyStuff(el) {
   // PK is in el.form.options.primaryKey, so you can regex out the table name ...
   var tableName = el.form.options.primaryKey.match(/(\w+)___\w+/)[1];
}

The form id is in el.form.id.
*/


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

/*
for ($year = date('Y'); $year > date('Y', strtotime('-10 years')); $year--)
  $options[] = ($year == date('Y', strtotime ('-1 year')))
        ? JHTML::_('select.option',$year,$year,'SELECTED')
        : JHTML::_('select.option',$year,$year); 
return $options;
*/




/*
function calendar_type(thisElement, tab) {
return;
// TODO get a calendar calc working 


   var form = thisElement.form;
   
   var table    = 'gn_event___' + tab;
   var baseName = table;
   var lineName  = baseName + '_division';
   
   var calendars  = baseName + '_calendar_type';

   var calendar = form.elements.get(calendars).getValue();
   
   switch(calendar) {
   /* change division & subdiv headers */
      case 'iso-edtf' :
         break;
         
      case 'iso-yd' :
      /* hide the division subgroup */
      
      /* set the number of days for dropdown to ~365 */
         jQuery(group_a).show();
         jQuery(group_a).trigger('click');
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


function lineShowHide(thisElement, tab, line, action) {
   var table, baseName, lineName,elems
   
   var tableName = thisElement.form.options.primaryKey.match(/(\w+)___\w+/)[1];
   table    = tableName + tab;
   baseName = table;
   lineName = baseName + '_division';
   
   elems[] = baseName + '_header';
   elems[] = table    + '_spacer_4a';
   elems[] = table    + '_spacer_4b';
   
   elems[] = table    + '_spacer_5b';
   elems[] = lineName;
   elems[] = lineName + '_accuracy';
   elems[] = lineName + '_confidence';
   for (i = 0, i < elems.length, i++) {
      thisElement.form.formElements.get(elems[i].id).hide();
   }
}
*/