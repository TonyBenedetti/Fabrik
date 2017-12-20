/**
 * The form has just been loaded or the user has just chosen a division of a year:
 * -- division possibilities are: month, quarter, third, half & season
 * -- change the label on the "_picklist" element
 * -- update "_picklist" element with the value that may have been previously saved
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 */
 function DivisionType(thisElement) {
   var thisForm, elementFullname;
   var tableName, elementName, tabName, nameRoot;
   var divisionTypeLabel, divisionTypeName;
   var saverName, saverValue, activeName, activeValue;
   var suffixes, suffix;
   
   thisForm        = thisElement.form;
   elementFullname = thisElement.options.fullname;

   elementName = elementFullname.match(/[a-zA-Z0-9]+___(\w+)/)[1];
   tableName   = elementFullname.match(/(\w+)___\w+/)[1];
   tabName     = elementName.match(/(\w+)_\w+/)[1];
   nameRoot    = tableName + '___' + tabName;

   divisionTypeLabel = thisForm.elements.get(elementFullname).getValue();
   divisionTypeName  = divisionTypeLabel.toLowerCase();

   suffixes = ['picklist', 'accuracy', 'confidence'];
   suffixes.forEach(function(suffix) {
      saverName  = nameRoot + '_saver_' + divisionTypeName + '_' + suffix;
      activeName = nameRoot + '_division_type_' + suffix;
      saverValue = thisForm.elements.get(saverName).getValue();
      if (suffix == 'picklist') {
         thisForm.elements.get(activeName).setLabel(divisionTypeLabel);
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
function DivisionPicklist(thisElement) {
   var thisForm, elementFullname, nameRoot;
   var elementName, tableName, tabName;
   var divisionTypeLabel, divisionTypeName;
   var saverName, saverValue, activeName, activeValue;
   var suffixes, suffix;

   thisForm        = thisElement.form;
   elementFullname = thisElement.options.fullname;
   
   elementName = elementFullname.match(/[a-zA-Z0-9]+___(\w+)/)[1];
   tableName   = elementFullname.match(/(\w+)___\w+/)[1];
   tabName     = elementName.match(/(\w+)_\w+/)[1];
   nameRoot    = tableName + '___' + tabName;
   
   divisionTypeLabel = thisForm.elements.get(elementFullname).getValue();
   divisionTypeName  = divisionTypeLabel.toLowerCase();

   suffixes = ['picklist', 'accuracy', 'confidence'];
   suffixes.forEach(function(suffix) {
      saverName   = nameRoot + '_saver_' + divisionTypeName + '_' + suffix;
      activeName  = nameRoot + '_division_type_' + suffix;
      saverValue  = thisForm.elements.get(saverName).getValue();
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
 *
 * @TODO get list of groups 
 * @TODO new function to loop array of 3 "hide/show"s for choice switch below
 */
function DateType(thisElement)
{
   var thisForm        = thisElement.form;
   var elementFullname = thisElement.options.fullname;
   var elementName     = elementFullname.match(/[a-zA-Z0-9]+___(\w+)/)[1];

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