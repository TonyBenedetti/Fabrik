<?php
/**
 *
 *
 */
class EDTF
{
   /**
    *
    *
    */
   function getEDTF($data, $table, $type)
   {
      $tableName = 'gn_' . $table . '___';

      $typeName = $tableName . 'type';
      $e = ($data[$typeName] == 'Single Date') ? 'start' : $type;
      
      $ss = $data[$tableName . 'start_status_raw'];
      $ss = ($ss == 'unknown') ? '??' : $ss;
      $ss = ($ss == 'open'   ) ? '..' : $ss;

      $se = $data[$tableName . 'end_status_raw'];
      $se = ($se == 'unknown') ? '??' : $se;
      $se = ($se == 'open'   ) ? '..' : $se;
    
      switch ($e)
      {
         case 'both':
            $edtf_start = ($ss != 'known') ? $ss : self::buildEDTF($data, $tableName, 'start');
            $edtf_end   = ($se != 'known') ? $se : self::buildEDTF($data, $tableName, 'end');
            $edtf       = $edtf_start . '/' . $edtf_end;
            break;

         case 'start':
            $edtf   = ($ss != 'known') ? $ss : self::buildEDTF($data, $tableName, 'start');
            break;

         case 'end':
            $edtf   = ($se != 'known') ? $se : self::buildEDTF($data, $tableName, 'end');
            break;
      }
      return $edtf;
   }


   /**
    *
    *
    */
   function buildEDTF($data, $tableName, $eventType)
   {
      $tabName = $tableName . $eventType;
      $calType = $data[$tabName . '_calendar_type'];

      switch ($calType)
      {
         case 'iso-edtf':
            $year = self::buildSegment($data, $tabName, 'year');
            $div  = self::buildSegment($data, $tabName, 'div');
            $day  = self::buildSegment($data, $tabName, 'day');
            $edtf = $year . '-' . $div . '-' . $day;
            break;
         case 'iso-yd':
            $year = self::buildSegment($data, $tabName, 'year');
            $day  = self::buildSegment($data, $tabName, 'day');
            $day  = sprintf("%03d", $segment);
            $edtf = $year . '-' .  $day;
            break;
         case 'iso-yw':
            $year = self::buildSegment($data, $tabName, 'year');
            $week = self::buildSegment($data, $tabName, 'week');
            $week = 'W' . sprintf("%02", $week);
            $edtf = $year . '-' . $week;
            break;
         case 'iso-ywd':
            $year = self::buildSegment($data, $tabName, 'year');
            $week = self::buildSegment($data, $tabName, 'week');
            $week = 'W' . sprintf("%02", $week);
            $day  = self::buildSegment($data, $tabName, 'day');
            $edtf = $year . '-' . $week . '-' . $day;
            break;
         /*
         case 'julian':
            $year = self::buildSegment($data, $tabName, 'year');
            $div  = self::buildSegment($data, $tabName, 'div');
            $week = self::buildSegment($data, $tabName, 'week');
            $day  = self::buildSegment($data, $tabName, 'day');
            $edtf = 'julian date';
            break;
         */
      }
      return $edtf;
   }


   /**
    *
    *
    */
   function buildSegment($data, $tabName, $segName)
   {
      $segmentName = $tabName . '_' . $segName;

      $segment     = $data[$segmentName];
      $segment     = sprintf("%02d", $segment);
      $segmentAcc  = $data[$segmentName . '_accuracy'];
      $segmentConf = $data[$segmentName . '_confidence'];

      /* Conditionally add flags for accuracy and/or confidence */
      $flag = ($segAcc == 'approximate') ?         '?' : '';
      $flag = ($segConf == 'uncertain' ) ? $flag . '~' : $flag;
      $seg  = ($flag == '?~') ? '%' . $seg : $flag . $seg;

      if ($segName == 'year') {
         /* Conditionally add exponent (Ennn) and significant digits (Snnn) */
         $segExp  = $data[$segmentName . '_exponent'];
         $segSigD = $data[$segmentName . '_significant_digits'];

         $suffix = ($segExp  == 0) ? ''      :           'E' . $segExp;
         $suffix = ($segSigD == 0) ? $suffix : $suffix . 'S' . $segSigD;
         $seg = $seg . $suffix;
      }
   }
}
?>