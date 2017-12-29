<?php
/**
 * Use Javascript to display a message as an Alert
 */
function alert($msg) {
    echo "<script type='text/javascript'>alert('$msg');</script>";
}

/**
 *
 *
 */
class EDTF {
   /**
    * Prepare a fully formed EDTF date string
    * -- cut short the process if either the "start" or "end" is "unknown" or "open"
    * -- use buildEDTF function to do the actual work
    * 
    * @param $data array of all data associated with this form
    * @param $table e.g., "event", "people", or "..."
    * @param $type "Single Date", "Start/End", "Start/Duration", "Duration/End", or "Duration"
    * @TODO day becomes monthDay and add weekDay & yearDay -- dayOfMonth etc. ?
    */
    function getEDTF($data, $table, $type) {
        $tableName = 'gn_' . $table . '___';
        $midlineEllipsis = "\u{202220222022}";
        $typeName = $tableName . 'basics_date_type';
        $e = ($data[$typeName] == 'Single Date') ? 'start' : $type;
      
        $ss = $data[$tableName . 'start_status_raw'];
        $ss = ($ss == 'unknown') ? '??' : $ss;
        $ss = ($ss == 'open'   ) ? $midlineEllipsis : $ss;

        $se = $data[$tableName . 'end_status_raw'];
        $se = ($se == 'unknown') ? '??' : $se;
        $se = ($se == 'open'   ) ? '..' : $se;
    
        switch ($e) {
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
            case 'duration':
                break;
        }
        return $edtf;
    }


    /**
     * Prepare
     *
     */
    function buildEDTF($data, $tableName, $tabType) {
        $tabName = $tableName . $tabType;
        $calendarType = $data[$tabName . '_calendar_type_raw'];

        switch ($calendarType) {
            case 'iso-edtf' :
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
            /*
            case 'julian':
                $year = self::buildSegment($data, $tabName, 'year', 0);
                $div  = self::buildSegment($data, $tabName, 'division');
                $week = self::buildSegment($data, $tabName, 'week');
                $day  = self::buildSegment($data, $tabName, 'day');
                $edtf = 'julian date';
                break;
            */
        }

        return $edtf;
    }


    /**
    * Prepare a segment of a date
    * -- year, division, week, day
    * -- "divisions" are: month, quarter, third, half, season
    *
    */
    function buildSegment($data, $tabName, $segType, $pad) {
        $segName  = $tabName . '_' . $segType;
        $segValueName = $segName . '_value';
        $segValueName = ($segType == 'division') ? $segValueName . '_raw' : $segValueName;
/* alert($segType . '|' . $segName . '|' . $segValueName); */
        /**
         * Prepare the "naked" segment value:
         * -- year - strip leading zeros from year
         * -- everything else - add leading zeros according to $pad param
         */
        $segment = (string)$data[$segValueName];
        $pattern = '%0' . (string)$pad . 'd';
        $segment = sprintf($pattern, ltrim($segment, '0'));

        /***
         * Conditionally adjust a year segment:
         * -- prefix with minus sign if Era is BC (BCE)
         * -- suffix with optional exponent (Ennn) and significant digits (Snnn)
         */
        if ($segType == 'year') {
            $segEra  = $data[$tabName . '_era_value_raw'];
            $segment = ($segEra == 'bce') ? '-' . $segment : $segment;

            $segExp  = $data[$segName . '_exponent'];
            $segSigD = $data[$segName . '_significant_digits'];
            $segSuff = ($segExp  == 0) ? ''       :            'E' . ltrim((string)$segExp,  '0');
            $segSuff = ($segSigD == 0) ? $segSuff : $segSuff . 'S' . ltrim((string)$segSigD, '0');
            $segment = $segment . $segSuff;
        }

        /** 
         * Conditionally add flags for accuracy and/or confidence
         */
        $segAcc  = $data[$segName . '_accuracy_raw'];
        $segConf = $data[$segName . '_confidence_raw'];
        $segFlag = ($segAcc  == 'approximate') ?            '~' : '';
        $segFlag = ($segConf == 'uncertain'  ) ? $segFlag . '?' : $segFlag;
        $segment = ($segFlag == '~?') ? '%' . $segment : $segFlag . $segment;

        return $segment;
    }
}
?>