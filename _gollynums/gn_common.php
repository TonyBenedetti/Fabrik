<?php
/**
 *
 *
 */
class EDTF
{
   function alert($msg) {
      echo "<script type='text/javascript'>alert('$msg');</script>";
   }


   /**
    *
    * @TODO day becomes monthDay and add weekDay & yearDay -- dayOfMonth etc. ?
    */
   function getEDTF($data, $table, $type) {
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
   function buildEDTF($data, $tableName, $tabType)
   {
      $tabName = $tableName . $tabType;
      $calType = $data[$tabName . '_calendar_type'];
      
      $year = self::buildSegment($data, $tabName, 'year',     0);
      $div  = self::buildSegment($data, $tabName, 'division', 2);
      $day  = self::buildSegment($data, $tabName, 'day',      2);
      
      $edtf = $year . '-' . $div . '-' . $day;
      
/*
      switch ($calType)
      {
         case 'iso-edtf':
            $year = self::buildSegment($data, $tabName, 'year',     0);
            $div  = self::buildSegment($data, $tabName, 'division', 2);
            $day  = self::buildSegment($data, $tabName, 'day',      2);
            $edtf = $year . '-' . $div . '-' . $day;
            break;
         case 'iso-yd':
            $year = self::buildSegment($data, $tabName, 'year',0);
            $day  = self::buildSegment($data, $tabName, 'day', 3);
            $edtf = $year . '-' .  $day;
            break;
         case 'iso-yw':
            $year = self::buildSegment($data, $tabName, 'year', 0);
            $week = self::buildSegment($data, $tabName, 'week', 2);
            $edtf = $year . '-W' . $week;
            break;
         case 'iso-ywd':
            $year =       self::buildSegment($data, $tabName, 'year', 0);
            $week = 'W' . self::buildSegment($data, $tabName, 'week', 2);
            $day  =       self::buildSegment($data, $tabName, 'day',  1);
            $edtf = $year . '-' . $week . '-' . $day;
            break;
         case 'julian':
            $year = self::buildSegment($data, $tabName, 'year', 0);
            $div  = self::buildSegment($data, $tabName, 'division');
            $week = self::buildSegment($data, $tabName, 'week');
            $day  = self::buildSegment($data, $tabName, 'day');
            $edtf = 'julian date';
            break;
      }
*/
      return $edtf;
   }


   /**
    *
    *
    * @TODO get rid of leading zeros -- segExp & segSigD
    */
   function buildSegment($data, $tabName, $segName, $pad)
   {
      $segName = $tabName . '_' . $segType;
      $segName = ($segType == 'division') ? $segName . '_choice_raw' : $segName;
      
      /**
       * Prepare the "naked" segment value:
       * -- year - strip leading zeros from year
       * -- everything else - add leading zeros according to $pad param
       */
      $segment = (string)$data[$segName]);
      $pattern = '%0' . (string)$pad . 'd';
      $segment = sprintf($pattern, ltrim($segment, '0'));
      /*
      if ($segType == 'year') {
         $segment = $segment.replace(/\b0+/g, '');
      } else {
         $pattern = '%0' . String($pad) . 'd';
         $segment = sprintf($pattern, ltrim($segment, '0'));
      }
      */

      /**
       * Conditionally adjust the year segment:
       * -- prefix with minus sign if Era is BC (BCE)
       * -- suffix with optional exponent (Ennn) and significant digits (Snnn)
       */
      if ($segType == 'year') {
         $segEra  = $data[$segName . '_era_raw'];
         $segment = ($segEra == 'bce') ? '-' . $segment : $segment;
self::alert('buildSegment: ' . '|' . $segType . '| |' . $segName . '| |' . $segment . '| |' . $segEra . '|');

         $segExp  = $data[$segName . '_exponent'];
         $segSigD = $data[$segName . '_significant_digits'];
         $segSuff = ($segExp  == 0) ? ''       :            'E' . $segExp;
         $segSuff = ($segSigD == 0) ? $segSuff : $segSuff . 'S' . $segSigD;
         $segment = $segment . $segSuff;
      }

      /** 
       * Conditionally add flags for accuracy and/or confidence
       */
      $segAcc  = $data[$segName . '_accuracy_raw'];
      $segConf = $data[$segName . '_confidence_raw'];
      $segFlag = ($segAcc  == 'approximate') ?            '?' : '';
      $segFlag = ($segConf == 'uncertain'  ) ? $segFlag . '~' : $segFlag;
      $segment = ($segFlag == '?~') ? '%' . $segment : $segFlag . $segment;

      return $segment;
   }
}
?>