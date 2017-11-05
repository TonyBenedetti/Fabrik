<?php
class edtf
{
   function get_edtf($data, $table, $edtf_type)
   {
      $t = 'gn_' . $table . '___';

      $base = $t . 'type';
      $e = ($data[$base] == 'Single Date') ? 'start' : $edtf_type;
    
      switch ($e)
      {
         case 'both':
            $start = self::build_edtf($data, $t, 'start');
            $end   = self::build_edtf($data, $t, 'end');
            $edtf  = $start . '/' . $end;
            break;
         case 'start':
            $edtf  = self::build_edtf($data, $t, 'start');
            break;
         case 'end':
            $edtf  = self::build_edtf($data, $t, 'end');
            break;
      }
      return $edtf;
   }

   function build_edtf($data, $t, $e)
   {
   /* TODO - add notion of "unknown" or "open" date */
      $base = $t . $e . '_year';
      $y    = $data[$base];
      $y_ex = $data[$base . '_exponent'];
      $y_sd = $data[$base . '_significant_digits'];
      $y_a  = $data[$base . '_accuracy'];
      $y_c  = $data[$base . '_confidence'];
      
      $p    = ($y_ex == 0) ? ''       :      'E' . $y_ex;
      $p    = ($y_sd == 0) ? $p       : $p . 'S' . $y_sd;
      $y    = $y . $p;
      $p    = ($y_a  == 'Approximate') ?      '?' : '';
      $p    = ($y_c  == 'Uncertain')   ? $p . '~' : $p;
      $y    = ($p == '?~') ? '%' . $y : $p . $y;

      $base = $t . $e . '_year_segment';
      $s    = sprintf("%02d", $data[$base . '_choice_raw']);
      $s_a  = $data[$base . '_accuracy'];
      $s_c  = $data[$base . '_confidence'];
      $p    = ($s_a == 'Approximate') ?      '?' : '';
      $p    = ($s_c == 'Uncertain')   ? $p . '~' : $p;
      $s    = ($p == '?~') ? '%' . $s : $p . $s;

      $base = $t . $e . '_day';
      $d    = sprintf("%02d", $data[$base]);
      $d_a  = $data[$base . '_accuracy'];
      $d_c  = $data[$base . '_confidence'];
      $p    = ($d_a == 'Approximate') ?      '?' : '';
      $p    = ($d_c == 'Uncertain')   ? $p . '~' : $p;
      $d    = ($p == '?~') ? '%' . $d : $p . $d;

      return $y . '-' . $s . '-' . $d;
   }
}