function eventType(thisElement) {
   var thisForm     = thisElement.form;
   var regexKeyName = '/(\w+)___([a-zA-Z0-9])_(\w+/)';
   var formKeyName  = thisForm.options.primaryKey.match(regexKeyName);
   var tableName    = formKeyName[1];
   var tabName      = formKeyName[2];
   var elementName  = formKeyName[3];
alert(elementName);

/*
   var chosen = thisForm.elements.get(elementName).getValue();

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
*/
}


/**
 *
 *
 */
function dateDivision(thisElement, tab) {
/*
   var thisForm    = thisElement.form;
   var tableName   = thisForm.options.primaryKey.match(/(\w+)___\w+/)[1];
   /* TODO use regex to get tab name */
   var elementName = tableName + '___' + tab + '_division';

   var divisionName = thisForm.elements.get(elementName).getValue();
   var saverName    = tableName + '___' + tab + '_saver_' + divisionName;
   var savedBefore  = thisForm.elements.get(saverName).getValue();
   var choices      = elementName + '_choice';

   thisForm.elements.get(choices).update(savedBefore);
   thisForm.elements.get(choices).setLabel(division);
*/
}


/**
 *
 *
 */
function dateDivisionChoice(thisElement, tab) {
/*
   var thisForm    = thisElement.form;
   var tableName   = thisForm.options.primaryKey.match(/(\w+)___\w+/)[1];
   /* TODO use regex to get tab name */
   var elementName = tableName + '___' + tab + '_division';

   var table     = 'gn_event___';
   var baseName  = table + tab + '_division';

   var divisions = baseName;
   var choices   = baseName + '_choice';
   var savers    = baseName + '_saver_';

   var division  = thisElement.form.elements.get(divisions).getValue();
   var choice    = thisElement.form.elements.get(choices).getValue();

   var saver     = (savers + division).toLowerCase();
   thisElement.form.elements.get(saver).update(choice);
*/
}