/**
 * 
 * @param thisElement
 * @returns
 */
function formDateType(thisElement) {
	commonDateType(thisElement)
 * Show/hide combinations of the Fabrik groups (and their tabs) used to develop
 * a date or duration based on the chosen date type (single date, start/end, 
 * start/duration, duration/end, duration)
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 */
function eventType(thisElement) {
   var thisForm        = thisElement.form;
   var elementFullname = String(thisElement.options.fullName);
alert(elementFullname);
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
}

/**
 * 
 * @param thisElement
 * @returns
 */
function formDateDivisionType(thisElement) {
	commonDateDivisionType(thisElement)
 * describe the function.
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 */
function dateDivision(thisElement, tab) {
   var thisForm        = thisElement.form;
   var elementFullname = thisElement.options.fullName;
alert(elementFullname);
   var tableName       = String(elementFullname).match(/(\w+)___\w+/)[1];
   var elementName     = String(elementFullname).match(/[a-zA-Z0-9]+___(\w+)/)[1];
   var tabName         = String(elementName).match(/(\w+)_\w+/)[1];

   var divisionName = String(thisForm.elements.get(elementFullname).getValue());
   var saverName    = String(tableName + '___' + tabName + '_saver_' + divisionName).toLowerCase();
   var savedBefore  = String(thisForm.elements.get(saverName).getValue());
   var choiceName   = String(elementFullname + '_choice');

   thisForm.elements.get(choiceName).setLabel(divisionName);
   thisForm.elements.get(choiceName).update(savedBefore);
}


 * 
 * @param thisElement
 * @returns
 */
function formDateDivisionValue(thisElement) {
	commonDateDivisionValue(thisElement)
 * describe the function.
 *
 * @param {Object} thisElement - Fabrik element that called us via onLoad or onClick.
 */
 function dateDivisionChoice(thisElement, tab) {
   var thisForm        = thisElement.form;
   var elementFullname = String(thisElement.options.fullName);
   var tableName       = String(elementFullname).match(/(\w+)___\w+/)[1];
   var elementName     = String(elementFullname).match(/[a-zA-Z0-9]+___(\w+)/)[1];
   var tabName         = String(elementName).match(/(\w+)_\w+/)[1];

   var divisionName = tableName + '___' + tabName + '_division';
   var division     = String(thisForm.elements.get(divisionName).getValue().toLowerCase());
   
   var choiceName   = divisionName + '_choice';
   var choice       = String(thisForm.elements.get(choiceName).getValue());

   var saverName = String(divisionName + '_saver_' + division);

   thisForm.elements.get(saverName).update(choice);
}