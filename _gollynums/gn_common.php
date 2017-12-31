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
    * 
    * @TODO day becomes monthDay and add weekDay & yearDay -- dayOfMonth etc. ???
    * @TODO "Purify" the code to that it can be moved to class of its own by getting the 
    *       year, division, week & day ready before calling the buildEDTF function
    */
    function getEDTF($data, $table, $type) {
        $tableName = 'gn_' . $table . '___';
        $typeName = $tableName . 'basics_date_type';
        $e = ($data[$typeName] == 'Single Date') ? 'start' : $type;
        
        $dateOpen    = "\u{2022}\u{2006}\u{2022}\u{2006}\u{2022}";
        $dateUnknown = "???";
        
        $ss = $data[$tableName . 'start_status_raw'];
        $ss = ($ss == 'unknown') ? $dateUnknown : $ss;
        $ss = ($ss == 'open'   ) ? $dateOpen    : $ss;

        $se = $data[$tableName . 'end_status_raw'];
        $se = ($se == 'unknown') ? $dateUnknown : $se;
        $se = ($se == 'open'   ) ? $dateOpen    : $se;
    
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
     * Prepare an EDTF date string
     *
     */
    function buildEDTF($data, $tableName, $tabType) {
        $tabName = $tableName . $tabType;
        $calType = $data[$tabName . '_calendar_type_raw'];
		$yearTest = $data[$tabName . '_year_value_raw']; // more checking needed
        $leapYear = isLeapYear($yearTest);

        switch ($calType) {
            case 'iso-edtf' :
                $year = self::buildSegment($data, $tabName, $calType, 'year',     $leapYear, 0);
                $div  = self::buildSegment($data, $tabName, $calType, 'division', $leapYear, 2);
                $day  = self::buildSegment($data, $tabName, $calType, 'day',      $leapYear, 2);
alert(gettype($day) . '-' . $day . '-' .gettype("$day") . '-' .  "$day" . '-');
				$edtf = $year . '-' . $div . (preg_match('/[\dx]+/', "$day") ? '' : ('-' . $day));
                break;
            case 'iso-yd':
                $year = self::buildSegment($data, $tabName, $calType, 'year', $leapYear, 0);
                $day  = self::buildSegment($data, $tabName, $calType, 'day',  $leapYear, 3);
                $edtf = $year . '-' .  $day;
                break;
            case 'iso-yw':
                $year = self::buildSegment($data, $tabName, $calType, 'year', $leapYear, 0);
                $week = self::buildSegment($data, $tabName, $calType, 'week', $leapYear, 2);
                $edtf = $year . '-W' . $week;
                break;
            case 'iso-ywd':
                $year =       self::buildSegment($data, $tabName, $calType, 'year', $leapYear, 0);
                $week = 'W' . self::buildSegment($data, $tabName, $calType, 'week', $leapYear, 2);
                $day  =       self::buildSegment($data, $tabName, $calType, 'day',  $leapYear, 1);
                $edtf = $year . '-' . $week . '-' . $day;
                break;
            /*
            case 'julian':
                // base on iso-ymd
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
    function buildSegment($data, $tabName, $calType, $segType, $leapYear, $pad) {
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
         * 
         * @todo figure out implication of "significant digits"
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
         * Check to see if we should ignore a "day" segment if we're handling an ISO 8601
         * EDTF profile calendar and the "division" is not a month.
         * 
         * @todo perhaps we should extend "day numbering" to divisions other than month ???
		 * @todo watch out!  values can include X's -- testing for #s is problematic
         */
        
		$segDivType = $data[$tabName . '_' . 'division_type_raw'];
        $segDivValue = $data[$tabName . '_' . 'division_value_raw'];
        $continue = true;
        if (($segType == 'day') && ($calType == 'iso-edtf') && ($segDivType == 'month')) {
            $continue = (($segDivValue < 1) or ($segDivValue > 12)) ? false : true;
        }
        
        if ($continue == true) {
            /** 
             * Conditionally add flags for accuracy and/or confidence
             */
            $segAcc  = $data[$segName . '_accuracy_raw'];
            $segConf = $data[$segName . '_confidence_raw'];
            $segFlag = ($segAcc  == 'approximate') ?            '~' : '';
            $segFlag = ($segConf == 'uncertain'  ) ? $segFlag . '?' : $segFlag;
            $segment = ($segFlag == '~?') ? '%' . $segment : $segFlag . $segment;
        } else {
            $segment = '';
        }

        return $segment;
    }
}

/**
 * Determine if this is a leap year on the proleptic Gregorian calendar
 */
function isLeapYear($year) {
    if ($year % 100 == 0) {
        return ($year % 400 == 0);
    }
    return ($year % 4 == 0);
}
?>