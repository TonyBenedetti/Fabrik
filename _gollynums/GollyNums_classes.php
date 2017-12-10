<?php
class edtf
{
   function get_edtf($data, $table, $type)
   {
      $tableName = 'gn_' . $table . '___';

      $typeName = $tableName . 'type';
      $e = ($data[$typeName] == 'Single Date') ? 'start' : $type;
      
      $ss = $data[$tableName . 'start_status'];
      $ss = ($ss == 'unknown') ? ''   : $ss;
      $ss = ($ss == 'open'   ) ? '..' : $ss;

      $se = $data[$tableName . 'end_status'];
      $se = ($se == 'unknown') ? '??' : $se;
      $se = ($se == 'open'   ) ? '..' : $se;
    
      switch ($e)
      {
         case 'both':
            $edtf_start = ($ss != 'known') ? $ss : self::build_edtf($data, $tableName, 'start');
            $edtf_end   = ($se != 'known') ? $se : self::build_edtf($data, $tableName, 'end');
            $edtf       = $edtf_start . '/' . $edtf_end;
            break;

         case 'start':
            $edtf   = ($ss != 'known') ? $ss : self::build_edtf($data, $t, 'start');
            break;

         case 'end':
            $edtf   = ($se != 'known') ? $se : self::build_edtf($data, $t, 'end');
            break;
      }
      return $edtf;
   }


   function build_edtf($data, $t, $e)
   {
      $root = $t . $e;

      /* Year =================================== */
      $b       = $root . '_year';
      $year    = $data[$b];
      $year_a  = $data[$b . '_accuracy'];
      $year_c  = $data[$b . '_confidence'];
      $year_ex = $data[$b . '_exponent'];
      $year_sd = $data[$b . '_significant_digits'];

      $p    = ($year_a  == 'approximate') ?      '?'    : '';
      $p    = ($year_c  == 'uncertain')   ? $p . '~'    : $p;
      $year = ($p == '?~')             ? '%' . $year    : $p . $year;  
      $p    = ($year_ex == 0)             ? ''          :      'E' . $year_ex;
      $p    = ($year_sd == 0)             ? $p          : $p . 'S' . $year_sd;
      $year = $year . $p;

      /* Division =============================== */
      $b     = $root . '_division';
      $div   = $data[$b . '_choice_raw'];
      $div_a = $data[$b . '_accuracy'];
      $div_c = $data[$b . '_confidence'];
      
      $p   = ($div_a == 'approximate') ?      '?' : '';
      $p   = ($div_c == 'uncertain')   ? $p . '~' : $p;
      $div = sprintf("%02d", $div);
      $div = ($p == '?~') ? '%' . $div : $p . $div;
      
      /* Week =================================== */
      $b      = $root . '_week';
      $week   = $data[$b];
      $week_a = $data[$b . '_accuracy'];
      $week_c = $data[$b . '_confidence'];

      $p    = ($week_a == 'approximate') ?      '?' : '';
      $p    = ($week_c == 'uncertain')   ? $p . '~' : $p;
      $week = sprintf("%02d", $week);
      $week = ($p == '?~') ? '%' . $week : $p . $week;


      /* Day ==================================== */
      $b     = $root . '_day';
      $day   = $data[$b];
      $day_a = $data[$b . '_accuracy'];
      $day_c = $data[$b . '_confidence'];

      $p     = ($day_a == 'approximate') ?      '?' : '';
      $p     = ($day_c == 'uncertain')   ? $p . '~' : $p;
      $day   = sprintf("%02d", $day);
      $day    = ($p == '?~') ? '%' . $day : $p . $day;

      return $y . '-' . $d . '-' . $day;
   }
}