$(function() {
	
	$("div.container").show();

	FLUIGC.calendar('#meetingDate', {
		minDate: new Date(),
	}).setDate($('#meetingDate :input').attr('value') != null ? $("#meetingDate :input").attr('value') : new Date());

	FLUIGC.calendar('#dueDate', {
		minDate: new Date(),
	}).setDate($('#dueDate :input').attr('value') != null ? $("#dueDate :input").attr('value') : new Date());

	queryParams = getQueryParams(document.location.search);

	if (queryParams.WKNumState > 0) {
		$("#divMSG").show();
	} else {
		$("#divAtividades").show();
	}

});