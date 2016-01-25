$(function() {
	$("div.container").show();
	
	$("#meetingDate, #dueDate").datepicker({
		minDate: 0,
		dateFormat: 'dd/mm/yy'
	});
	
	if ( $("#meetingDate").val() == "" ) {
		$("#meetingDate").val(getToday());
	}
	if ( $("#dueDate").val() == "" ) {
		$("#dueDate").val(getToday());
	}
	
	$($("[type='button'][value='tbatividades']")[0]).remove();
	queryParams = getQueryParams(document.location.search);
	
	if (queryParams.WKNumState > 0) {
		$("#divMSG").show();
	} else {
		$("#divAtividades").show();
	}
	
	function getToday() {
		var d = new Date();
		var day = d.getDate();
		var month = d.getMonth() + 1;
		var year = d.getFullYear();
		
		if (day.toString().length < 2) day = "0" + day;
		if (month.toString().length < 2) month = "0" + month;
		
		return day + "/" + month + "/" + year;
	}
});