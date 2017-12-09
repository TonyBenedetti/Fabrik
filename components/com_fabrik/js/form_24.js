function year_segment_choices(from, tab) {
   var table    = 'gn_event___';
   var baseName = table + tab + '_year_segment';

   var segments = baseName;
   var choices  = baseName + '_choices';
   var savers   = baseName + '_saver_';

   var segment  = from.form.elements.get(types).getValue();
   var choice   = from.form.elements.get(choices).getValue();

   var saver    = (savers + segment).toLowerCase();
   from.form.elements.get(saver).update(choice);
}