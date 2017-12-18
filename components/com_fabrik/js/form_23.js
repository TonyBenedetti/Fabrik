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
function dateType(thisElement)
{
   var thisForm        = thisElement.form;
/*alert('groups: |' + thisForm.groups + '|');*/
   var elementFullname = String(thisElement.options.fullName);
/*alert('dateType elementFullname: ' + elementFullname);*/
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
   return;
}



/**
 * The form has just been loaded or the user has just chosen a division of a year:
 * -- division possibilities are: month, quarter, third, half & season
 * -- change the label on the "_choice" element
 * -- update "_choice" element with the value that may have been previously saved
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 */
function dateDivision(thisElement) {
   var thisForm, elementFullname
   var tableName, elementName, tabName, nameRoot
   var divisionName, division
   var saverName, saverValue, valueName, value
   var suffixes, suffix
   
   thisForm        = thisElement.form;
   elementFullname = thisElement.options.fullName;active

   tableName   = String(elementFullname).match(/(\w+)___\w+/)[1];
   elementName = String(elementFullname).match(/[a-zA-Z0-9]+___(\w+)/)[1];
   tabName     = String(elementName).match(/(\w+)_\w+/)[1];
   nameRoot    = tableName + '___' + tabName + '_';
   
   divisionLabel = thisForm.elements.get(elementFullname).getValue();
   divisionName  = divisionName.toLowerCase();

   suffixes = ['_choice', '_accuracy', '_confidence'];
   suffixes.forEach(function(suffix) {
      saverName  = nameRoot + 'saver_' + division '_' + suffix;
      saverValue = thisForm.elements.get(saverName).getValue();

      activeName  = nameRoot + divisionName + '_' + suffix;
      
      if (suffix == '_choice') {
         thisForm.elements.get(activeName).setLabel(divisionLabel);
      }
      thisForm.elements.get(activeName).update(saverValue);
   });
   return;
}








/* original !!!
   divisionName = String(thisForm.elements.get(elementFullname).getValue());
   saverName    = String(tableName + '___' + tabName + '_saver_' + divisionName).toLowerCase();
   savedBefore  = String(thisForm.elements.get(saverName).getValue());
   choiceName   = String(elementFullname + '_choice');

   thisForm.elements.get(choiceName).setLabel(divisionName);
   thisForm.elements.get(choiceName).update(savedBefore);
*/

/*
get division name    xx divisionName = thisForm.elements.get(elementFullname).getValue();
get division value   xx division = thisForm.elements.get(divisionName).getValue().toLowerCase();
initialize suffixes  xx SUFFIX = _choice _accuracy _confidence
loop                 xx for 1 to 3
get saver name       xx    saverName = divisionName + '_saver_' + division + SUFFIX;
get saver value      xx    saverValue = thisForm.elements.get(saverName).getValue();
get value name       xx    valueName = divisionName + SUFFIX;
get value            xx    value = thisForm.elements.get(valueName).getValue();
if                   xx    IF SUFFIX == _choice
set value label      xx       thisForm.elements.get(valueName).setLabel(divisionName);
set value            xx    thisForm.elements.get(valueName).update(saverValue);


get saver name       // saverName = divisionName + '_saver_' + division;
get saver value      // savedBefore = thisForm.elements.get(saverName).getValue();
get choice name      // valueName = divisionName + '_choice';
xxx xxxxxx xxxx  
set choice label     // thisForm.elements.get(choiceName).setLabel(divisionName);
set choice value     // thisForm.elements.get(choiceName).update(savedBefore);

get saver name       // saverName = divisionName + '_saver_' + division + '_accuracy';
get saver value      // savedBefore = thisForm.elements.get(saverName).getValue();
get accuracy name    // valueName = divisionName + '_accuracy';
get accuracy value   // value     = thisForm.elements.get(valueName).getValue();
set accuracy label   // thisForm.elements.get(accuracyName).setLabel(divisionName);
set accuracy value   // thisForm.elements.get(accuracyName).update(savedBefore);

get saver name       // saverName = divisionName + '_saver_' + division + '_confidence';
get saver value      // savedBefore = thisForm.elements.get(saverName).getValue();
get confidence name  // valueName = divisionName + '_confidence';
get confidence value // value     = thisForm.elements.get(valueName).getValue();
set confidence label // thisForm.elements.get(confidenceName).setLabel(divisionName);
set confidence value // thisForm.elements.get(confidenceName).update(savedBefore);
*/

/* !!! from dateDivisionChoice function below
   divisionName = tableName + '___' + tabName + '_division';k
   division     = String(thisForm.elements.get(divisionName).getValue().toLowerCase());
   
   valueName = divisionName + '_choice';
   saverName = String(divisionName + '_saver_' + division);
   value     = String(thisForm.elements.get(valueName).getValue());
   thisForm.elements.get(saverName).update(value);
*/




/* ========================================================== */
/* ========================================================== */
/* ========================================================== */
/* ========================================================== */
/* ========================================================== */

/**
 * The form has just been loaded or the user has just chosen 
 * a value for this division of a year:
 * -- division possibilities are: month, quarter, third, half & season
 * -- stow away that value in the corresponding "_saver_" element
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 */
function dateDivisionChoice(thisElement) {
   var thisForm, elementFullName, tableName, elementName, tabName
   var divisionName, division
   
   thisForm        = thisElement.form;
   elementFullname = String(thisElement.options.fullName);
/* alert('dateDivisionChoice elementFullname: ' + elementFullname); */
   tableName       = String(elementFullname).match(/(\w+)___\w+/)[1];
   elementName     = String(elementFullname).match(/[a-zA-Z0-9]+___(\w+)/)[1];
   tabName         = String(elementName).match(/(\w+)_\w+/)[1];

   divisionName = tableName + '___' + tabName + '_division';
   division     = String(thisForm.elements.get(divisionName).getValue().toLowerCase());

   valueName = divisionName + '_choice';
   saverName = String(divisionName + '_saver_' + division);
   value     = String(thisForm.elements.get(valueName).getValue());
   thisForm.elements.get(saverName).update(value);
   
   valueName = divisionName + '_accuracy';
   saverName = String(divisionName + '_saver_' + division + '_accuracy');
   value     = String(thisForm.elements.get(valueName).getValue());
   thisForm.elements.get(saverName).update(value);
   
   valueName = divisionName + '_confidence';
   saverName = String(divisionName + '_saver_' + division + '_confidence');
   value     = String(thisForm.elements.get(valueName).getValue());
   thisForm.elements.get(saverName).update(value);

   return

/*
   var choiceName   = divisionName + '_choice';
   var choice       = String(thisForm.elements.get(choiceName).getValue());

   var saverName = String(divisionName + '_saver_' + division);

   thisForm.elements.get(saverName).update(choice);

   return;
*/
}


/*
pushSavers(thisForm, divisionName, division);

function pushSavers(thisForm, divisionName, value) {
   valueName = divisionName + '_choice';
   saverName = String(divisionName + '_saver_' + division);
   value     = String(thisForm.elements.get(valueName).getValue());
   thisForm.elements.get(saverName).update(value);
   
   valueName = divisionName + '_accuracy';
   saverName = String(divisionName + '_saver_' + division + '_accuracy');
   value     = String(thisForm.elements.get(valueName).getValue());
   thisForm.elements.get(saverName).update(value);
   
   valueName = divisionName + '_confidence';
   saverName = String(divisionName + '_saver_' + division + '_confidence');
   value     = String(thisForm.elements.get(valueName).getValue());
   thisForm.elements.get(saverName).update(value);
}
*/

/* ========================================================== */
/* ========================================================== */
/* ========================================================== */
/* ========================================================== */
/* ========================================================== */


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