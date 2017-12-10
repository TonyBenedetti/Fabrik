function event_type(thisElement) {
   /* var tableName = thisElement.form.options.primaryKey.match(/(\w+)___\w+/)[1]; */
   var table   = 'gn_event___';
   var choices = table + 'type';

   var chosen = thisElement.form.elements.get(choices).getValue();

   var choice1 = 'Single Date';
   var choice2 = 'Start/End';
   var choice3 = 'Start/Duration';
   var choice4 = 'Duration/End';
   var choice5 = 'Duration';

   var group_a = '#group118_tab';
   var group_b = '#group122_tab';
   var group_c = '#group121_tab';

   switch(chosen) {
      case choice1 :
         jQuery(group_a).show();
         jQuery(group_b).hide();
         jQuery(group_c).hide();
         jQuery(group_a).trigger('click');
         break;

       case choice2 :
         jQuery(group_a).show();
         jQuery(group_b).hide();
         jQuery(group_c).show();
         jQuery(group_a).trigger('click');
         break;

       case choice3 :
         jQuery(group_a).show();
         jQuery(group_b).show();
         jQuery(group_c).hide();
         jQuery(group_a).trigger('click');
         break;

       case choice4 :
         jQuery(group_a).hide();
         jQuery(group_b).show();
         jQuery(group_c).show();
         jQuery(group_b).trigger('click');
         break;

       case choice5 :
         jQuery(group_a).hide();
         jQuery(group_b).show();
         jQuery(group_c).hide();
         jQuery(group_b).trigger('click');
         break;
   }
}


function date_division(thisElement, tab) {
   /* var tableName = thisElement.form.options.primaryKey.match(/(\w+)___\w+/)[1]; */
   var table      = 'gn_event___';
   var baseName   = table + tab + '_division';

   var divisions  = baseName;

   var choices    = baseName + '_choice';
   var accuracy   = baseName + '_accuracy';
   var confidence = baseName + '_confidence';
   var savers     = baseName + '_saver_';

   var division   = thisElement.form.elements.get(divisions).getValue();

   var saver      = (savers + division).toLowerCase();
   var saved      = thisElement.form.elements.get(saver).getValue();
   thisElement.form.elements.get(choices).update(saved);
   thisElement.form.elements.get(choices).setLabel(division);
}


function date_division_choice(thisElement, tab) {
   /* var tableName = thisElement.form.options.primaryKey.match(/(\w+)___\w+/)[1]; */
   var table     = 'gn_event___';
   var baseName  = table + tab + '_division';

   var divisions = baseName;
   var choices   = baseName + '_choice';
   var savers    = baseName + '_saver_';

   var division  = thisElement.form.elements.get(divisions).getValue();
   var choice    = thisElement.form.elements.get(choices).getValue();

   var saver     = (savers + division).toLowerCase();
   thisElement.form.elements.get(saver).update(choice);
}