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
function enhanced_time_interval(from, tab) {
   var table = 'gn_event___';
   var buttons = table + 'type';
   
   var chosen = from.form.elements.get(buttons).getValue();

   var choice1 = 'Known';
   var choice2 = 'Unknown';
   var choice3 = 'Open';

}
*/


/* ******************************* */
function event_type(from) {
   var table = 'gn_event___';
   var buttons = table + 'type';

   var chosen = from.form.elements.get(buttons).getValue();

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

/*
function calendar_type(from) {
   var table = 'gn_event___';
   var buttons = table + 'type';

   var chosen = from.form.elements.get(buttons).getValue();

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
*/


function year_segment(from, tab) {

   var table      = 'gn_event___';
   var baseName   = table + tab + '_year_segment';

   var segments   = baseName;
   var choices    = baseName + '_choice';
   var accuracy   = baseName + '_accuracy';
   var confidence = baseName + '_confidence';
   var savers     = baseName + '_saver_';

   var segment    = from.form.elements.get(segments).getValue();

   var saver      = (savers + segment).toLowerCase();
   var saved      = from.form.elements.get(saver).getValue();
   from.form.elements.get(choices).update(saved);
   from.form.elements.get(choices).setLabel(segment);
}


function year_segment_choice(from, tab) {
   var table    = 'gn_event___';
   var baseName = table + tab + '_year_segment';

   var segments = baseName;
   var choices  = baseName + '_choice';
   var savers   = baseName + '_saver_';

   var segment  = from.form.elements.get(segments).getValue();
   var choice   = from.form.elements.get(choices).getValue();

   var saver    = (savers + segment).toLowerCase();
   from.form.elements.get(saver).update(choice);
}