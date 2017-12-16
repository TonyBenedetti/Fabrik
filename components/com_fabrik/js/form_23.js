/**
 * Show/hide combinations of the Fabrik groups
 * (and their tabs) used to develop a date or
 * duration based on the chosen date type
 * (single date, start/end, start/duration,
 * duration/end, duration)
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 *
 * @TODO new function to loop array of 3 "hide/show"s for choice switch below
 */
function dateType(thisElement)
{
   var thisForm        = thisElement.form;
alert('groups: |' + thisForm.groups + '|';
   var elementFullname = String(thisElement.options.fullName);
alert('dateType elementFullname: ' + elementFullname);
   var tableName       = String(elementFullname).match(/(\w+)___\w+/)[1];
   var elementName     = String(elementFullname).match(/[a-zA-Z0-9]+___(\w+)/)[1];
   var tabName         = String(elementName).match(/(\w+)_\w+/)[1];

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
   
   
   /*
   // learn group numbers and give them names
   // including click/default
   groups = [118, 122, 121];

   switch(chosen) {
      case choice6 :
         actions = ['hide', 'show', 'hide'];
         self::tabShowHide(actions, groups[2]);
         break;
   }
   */
   return;
}


/*
function tabShowHide(actions, groups, clickGroup)
{
   for (i = 0; i < 3; i++) {
      tab = '#group' + groups[i] + '_tab';
      jQuery(tab).hide();
   }
   jQuery(clickGroup).trigger('click');
   return;
}
*/


/**
 * The form has just been loaded or the user has just chosen a division of a year:
 * -- division possibilities are: month, quarter, third, half & season
 * -- change the label on the "_choice" element
 * -- update "_choice" element with the value that may have been previously saved
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 */
function dateDivision(thisElement) {
   var thisForm        = thisElement.form;
   var elementFullname = thisElement.options.fullName;
alert('dateDivision elementFullname: ' + elementFullname);
   var tableName       = String(elementFullname).match(/(\w+)___\w+/)[1];
   var elementName     = String(elementFullname).match(/[a-zA-Z0-9]+___(\w+)/)[1];
   var tabName         = String(elementName).match(/(\w+)_\w+/)[1];

   var divisionName = String(thisForm.elements.get(elementFullname).getValue());
   var saverName    = String(tableName + '___' + tabName + '_saver_' + divisionName).toLowerCase();
   var savedBefore  = String(thisForm.elements.get(saverName).getValue());
   var choiceName   = String(elementFullname + '_choice');

   thisForm.elements.get(choiceName).setLabel(divisionName);
   thisForm.elements.get(choiceName).update(savedBefore);
   
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
 function dateDivisionChoice(thisElement) {
   var thisForm        = thisElement.form;
   var elementFullname = String(thisElement.options.fullName);
alert('dateDivisionChoice elementFullname: ' + elementFullname);
   var tableName       = String(elementFullname).match(/(\w+)___\w+/)[1];
   var elementName     = String(elementFullname).match(/[a-zA-Z0-9]+___(\w+)/)[1];
   var tabName         = String(elementName).match(/(\w+)_\w+/)[1];

   var divisionName = tableName + '___' + tabName + '_division';
   var division     = String(thisForm.elements.get(divisionName).getValue().toLowerCase());
   
   var choiceName   = divisionName + '_choice';
   var choice       = String(thisForm.elements.get(choiceName).getValue());

   var saverName = String(divisionName + '_saver_' + division);

   thisForm.elements.get(saverName).update(choice);
   
   return;
}