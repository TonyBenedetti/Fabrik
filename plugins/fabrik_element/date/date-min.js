/*! Fabrik */

define(["jquery","fab/element"],function(jQuery,FbElement){return window.FbDateTime=new Class({Extends:FbElement,options:{dateTimeFormat:"",locale:"en-GB",allowedDates:[],allowedClasses:[],hour24:!0,showSeconds:!1,timePickerLabel:"Timepicker",calendarSetup:{eventName:"click",ifFormat:"%Y/%m/%d",daFormat:"%Y/%m/%d",singleClick:!0,align:"Tl",range:[1900,2999],showsTime:!1,timeFormat:"24",electric:!0,step:2,cache:!1,showOthers:!1,advanced:!1}},initialize:function(t,e){if(this.setPlugin("fabrikdate"),!this.parent(t,e))return!1;Locale.use(this.options.locale),this.hour="0",this.minute="00",this.buttonBg="#ffffff",this.buttonBgSelected="#88dd33",this.startElement=t,this.setUpDone=!1,this.timePicker=!1,this.convertAllowedDates(),this.setUp()},convertAllowedDates:function(){for(var t=0;t<this.options.allowedDates.length;t++){var e=this.options.allowedDates[t].split("|");1<e.length?(this.options.allowedClasses[t]=e[1],this.options.allowedDates[t]=e[0]):this.options.allowedClasses[t]=!1,this.options.allowedDates[t]=new Date(this.options.allowedDates[t]),this.options.allowedDates[t].setTime(this.options.allowedDates[t].getTime()+60*this.options.allowedDates[t].getTimezoneOffset()*1e3)}},setUp:function(){if(this.options.editable){this.watchButtons(),!1===this.options.typing?this.disableTyping():this.getDateField().addEvent("blur",function(t){var e,i=this.getDateField().value;""!==i?(e=this.options.advanced?Date.parseExact(i,Date.normalizeFormat(this.options.calendarSetup.ifFormat)):Date.parseDate(i,this.options.calendarSetup.ifFormat),this.setTimeFromField(e),this.update(e),Fabrik.fireEvent("fabrik.date.select",this),this.element.fireEvent("change",new Event.Mock(this.element,"change"))):this.options.value=""}.bind(this)),this.makeCalendar();(function(){this.cal.hide()}).delay(100,this),this.getCalendarImg().addEvent("click",function(t){t.stop(),Fabrik.fireEvent("fabrik.element.date.calendar.show",this),this.cal.params.position?this.cal.showAt(this.cal.params.position[0],params.position[1]):this.cal.showAtElement(this.cal.params.button||this.cal.params.displayArea||this.cal.params.inputField,this.cal.params.align),this.cal._init(this.cal.firstDayOfWeek,this.cal.date),this.cal.show()}.bind(this)),Fabrik.addEvent("fabrik.form.submit.failed",function(t,e){this.afterAjaxValidation()}.bind(this)),Fabrik.addEvent("fabrik.form.page.change.end",function(t,e){this.afterAjaxValidation()}.bind(this))}},attachedToForm:function(){this.watchAjaxTrigger(),this.parent()},watchAjaxTrigger:function(){if(""!==this.options.watchElement){var i=this.form.elements[this.options.watchElement];i&&i.addEvent("change",function(t){var e={option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"date",method:"ajax_getAllowedDates",element_id:this.options.id,v:i.get("value"),formid:this.form.id};new Request.JSON({url:"",method:"post",data:e,onSuccess:function(t){this.options.allowedDates=t,this.convertAllowedDates()}.bind(this)}).send()}.bind(this))}},getCalendarImg:function(){return this.element.getElement(".calendarbutton")},dateSelect:function(date){var allowed=this.options.allowedDates;if(0<allowed.length){for(var matched=!1,i=0;i<allowed.length;i++)if(allowed[i].format("%Y%m%d")===date.format("%Y%m%d")){matched=!0;break}if(!matched)return!0;if(!1!==this.options.allowedClasses[i])return this.options.allowedClasses[i]}var fn=this.options.calendarSetup.dateAllowFunc;if("null"!==typeOf(fn)&&""!==fn)return eval(fn),result},calSelect:function(t,e){if(t.dateClicked&&!0!==this.dateSelect(t.date)){var i=this.setTimeFromField(t.date);this.update(i.format("db")),this.getDateField().fireEvent("change"),this.timeButton&&this.getTimeField().fireEvent("change"),this.cal.callCloseHandler(),window.fireEvent("fabrik.date.select",this),Fabrik.fireEvent("fabrik.date.select",this)}},calClose:function(t){this.cal.hide(),window.fireEvent("fabrik.date.close",this),this.options.validations&&this.form.doElementValidation(this.options.element)},onsubmit:function(t){var e=this.getValue();""!==e&&this.options.editable&&(this.getDateField().value=e),this.parent(t)},afterAjaxValidation:function(){this.update(this.getValue(),[])},shouldAjaxValidate:function(){if(this.timePicker&&0<this.timePicker.length)return this.getTimeField()===this.timePicker[0]&&!this.timeActive},makeCalendar:function(){if(this.cal)this.cal.show();else{var t;this.addEventToCalOpts();var e=this.options.calendarSetup,i=["displayArea","button"];for(Fabrik.fireEvent("fabrik.element.date.calendar.create",this),t=0;t<i.length;t++)"string"==typeof e[i[t]]&&(e[i[t]]=document.getElementById(e[i[t]]));e.inputField=this.getDateField();var s=e.inputField||e.displayArea,a=e.inputField?e.ifFormat:e.daFormat;if(this.cal=null,s&&(this.options.advanced?""===s.value?e.date="":(e.date=Date.parseExact(s.value||s.innerHTML,Date.normalizeFormat(a)),null===e.date&&(e.date=this.options.value)):e.date=Date.parseDate(s.value||s.innerHTML,a)),this.cal=new Calendar(e.firstDay,e.date,e.onSelect,e.onClose),this.cal.setDateStatusHandler(e.dateStatusFunc),this.cal.setDateToolTipHandler(e.dateTooltipFunc),this.cal.showsTime=e.showsTime,this.cal.time24="24"===e.timeFormat.toString(),this.cal.weekNumbers=e.weekNumbers,e.multiple)for(this.cal.multiple={},t=e.multiple.length;0<=--t;){var n=e.multiple[t],o=n.print("%Y%m%d");this.cal.multiple[o]=n}this.cal.showsOtherMonths=e.showOthers,this.cal.yearStep=e.step,this.cal.setRange(e.range[0],e.range[1]),this.cal.params=e,this.cal.getDateText=e.dateText,this.cal.setDateFormat(a),this.cal.create(),this.cal.refresh(),this.cal.hide(),Fabrik.fireEvent("fabrik.element.date.calendar.created",this)}},disableTyping:function(){"null"!==typeOf(this.element)?(this.element.setProperty("readonly","readonly"),this.element.getElements(".fabrikinput").each(function(e){e.addEvent("focus",function(t){this._disabledShowCalTime(e,t)}.bind(this)),e.addEvent("click",function(t){this._disabledShowCalTime(e,t)}.bind(this))}.bind(this))):fconsole(element+": not date element container - is this a custom template with a missing $element->containerClass div/li surrounding the element?")},_disabledShowCalTime:function(t,e){"null"!==typeOf(e)&&(e.target.hasClass("timeField")?this.getContainer().getElement(".timeButton").fireEvent("click"):(this.options.calendarSetup.inputField=e.target.id,this.options.calendarSetup.button=this.element.id+"_cal_img",this.cal.showAtElement(t,this.cal.params.align),void 0!==this.cal.wrapper&&this.cal.wrapper.getParent().position({relativeTo:this.cal.params.inputField,position:"topLeft"})))},getValue:function(){var t;if(!this.options.editable)return this.options.value;if(this.getElement(),this.cal){var e=this.getDateField().value;if(""===e)return"";var i=new RegExp("\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}");if(null!==e.match(i))return e;t=this.cal.date}else{if(""===this.options.value||null===this.options.value||"0000-00-00 00:00:00"===this.options.value)return"";t=new Date.parse(this.options.value)}return(t=this.setTimeFromField(t)).format("db")},hasSeconds:function(){if(!0===this.options.showtime&&this.timeElement){if(this.options.dateTimeFormat.contains("%S"))return!0;if(this.options.dateTimeFormat.contains("%T"))return!0;if(this.options.dateTimeFormat.contains("s"))return!0}return!1},getTimeFromField:function(){var t="";if(!0===this.options.showtime&&this.timeElement){var e=new Date,i="%H:%M:%S",s=this.timeElement.get("value").toUpperCase(),a=!!s.contains("PM"),n=(s=s.replace("PM","").replace("AM","").replace(" ","")).split(":"),o=n[0]?n[0].toInt():0;a&&(o+=12);var l=n[1]?n[1].toInt():0,h=0;n[2]&&this.hasSeconds()?h=n[2]?n[2].toInt():0:i="%H:%M",e.setHours(o),e.setMinutes(l),e.setSeconds(h),t=e.format(i)}else t="00:00";return t},setTimeFromField:function(t){if("date"===typeOf(t)){if(!0===this.options.showtime&&this.timeElement){var e=this.timeElement.get("value").toUpperCase(),i=!!e.contains("PM"),s=(e=e.replace("PM","").replace("AM","")).split(":"),a=s[0]?s[0].toInt():0;i&&(a+=12);var n=s[1]?s[1].toInt():0;if(t.setHours(a),t.setMinutes(n),s[2]&&this.hasSeconds()){var o=s[2]?s[2].toInt():0;t.setSeconds(o)}else t.setSeconds(0)}else""===this.options.dateTimeFormat&&(t.setHours(0),t.setMinutes(0),t.setSeconds(0));return t}},watchButtons:function(){this.options.showtime&&this.options.editable&&(this.getTimeField(),this.getTimeButton(),this.timeButton&&(this.timeButton.removeEvents("click"),this.timeButton.addEvent("click",function(t){if(void 0!==t&&t.stop(),!this.setUpDone&&this.timeElement){"clock"===this.options.whichTimePicker?this.timePicker=jQuery("#"+this.element.id+" .timeField").clockpicker({default:this.getTimeFromField(),twelvehour:!this.options.hour24,padhours:this.options.hour24,meridiemsep:" ",donetext:Joomla.JText._("JLIB_HTML_BEHAVIOR_CLOSE"),afterDone:jQuery.proxy(this.hideTime,this)}):this.timePicker=jQuery("#"+this.element.id+" .timeField").wickedpicker({now:this.getTimeFromField(),timeSeparator:":",twentyFour:this.options.hour24,showSeconds:this.options.showSeconds,afterShow:Fabrik.timePickerClose,title:this.options.timePickerLabel}),this.setUpDone=!0}this.showTime()}.bind(this))))},addNewEventAux:function(action,js){"change"===action?Fabrik.addEvent("fabrik.date.select",function(w){if(w.baseElementId===this.baseElementId){var e="fabrik.date.select";"function"===typeOf(js)?js.delay(0,this,this):eval(js)}}.bind(this)):this.element.getElements("input").each(function(i){i.addEvent(action,function(e){"event"===typeOf(e)&&e.stop(),"function"===typeOf(js)?js.delay(0,this,this):eval(js)})}.bind(this))},update:function(t,e){if(e=e||["change"],this.getElement(),"invalid date"!==t){var i;if("string"===typeOf(t)){if(""===t)return this._getSubElements().each(function(t){t.value=""}),this.cal&&(this.cal.date=new Date),void(this.options.editable||"null"!==typeOf(this.element)&&this.element.set("html",t));i=this.options.advanced?Date.parseExact(t,Date.normalizeFormat("%Y-%m-%d %H:%M:%S")):Date.parseDate(t,"%Y-%m-%d %H:%M")}else i=t;var s=this.options.calendarSetup.ifFormat;if(""!==this.options.dateTimeFormat&&this.options.showtime&&(s+=" "+this.options.dateTimeFormat),0<e.length&&this.fireEvents(e),"null"!==typeOf(t)&&!1!==t)if(this.options.editable){if(this.options.hidden)return i=i.format(s),void(this.getDateField().value=i);this.getTimeField(),this.hour=i.get("hours"),this.minute=i.get("minutes"),this.second=i.get("seconds"),this.stateTime(),this.cal.date=i,this.getDateField().value=i.format(this.options.calendarSetup.ifFormat)}else"null"!==typeOf(this.element)&&this.element.set("html",i.format(s))}else fconsole(this.element.id+": date not updated as not valid")},getDateField:function(){return this.element.getElement(".fabrikinput")},getTimeField:function(){return this.timeElement=this.getContainer().getElement(".timeField"),this.timeElement},getTimeButton:function(){return this.timeButton=this.getContainer().getElement(".timeButton"),this.timeButton},showCalendar:function(t,e){},getAbsolutePos:function(t){var e={x:t.offsetLeft,y:t.offsetTop};if(t.offsetParent){var i=this.getAbsolutePos(t.offsetParent);e.x+=i.x,e.y+=i.y}return e},hideTime:function(t,e){(this.timeActive=!1)!==this.options.validations&&this.form.doElementValidation(this.element.id),this.fireEvents(["change"]),Fabrik.fireEvent("fabrik.date.hidetime",this),Fabrik.fireEvent("fabrik.date.select",this),window.fireEvent("fabrik.date.select",this)},formatMinute:function(t){return(t=t.replace(":","")).pad("2","0","left"),t},stateTime:function(){if(this.timeElement){var t=this.hour.toString().pad("2","0","left")+":"+this.minute.toString().pad("2","0","left");this.second&&(t+=":"+this.second.toString().pad("2","0","left"));var e=this.timeElement.value!==t;this.timeElement.value=t,e&&this.fireEvents(["change"])}},showTime:function(){this.timeActive=!0,jQuery(this.timeElement).trigger("click")},addEventToCalOpts:function(){this.options.calendarSetup.onSelect=function(t,e){this.calSelect(t,e)}.bind(this),this.options.calendarSetup.dateStatusFunc=function(t){return this.dateSelect(t)}.bind(this),this.options.calendarSetup.onClose=function(t){this.calClose(t)}.bind(this)},cloned:function(t){this.setUpDone=!1,this.hour=0,delete this.cal;var e=this.element.getElement("button");e&&(e.id=this.element.id+"_cal_cal_img");var i=this.element.getElement("input");i.id=this.element.id+"_cal",this.options.calendarSetup.inputField=i.id,this.options.calendarSetup.button=i.id+"_img",this.makeCalendar(),this.cal.hide(),this.setUp(),this.parent(t)}}),window.FbDateTime});