$(document).ready(function(){

	var exemploCalendar = FLUIGC.calendar('#campo2');
    $(document).on('focus',".datePicker", function(){
    	 if ($(this).get(0).nodeName === "INPUT"){
	        $(this).datepicker({
	            changeMonth: true,
	            changeYear: true,
	            dateFormat: 'dd/mm/yy',
	            dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
	            dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
	            dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
	            monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
	            monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
	            minDate: '01/01/2015', //opicional
	            maxDate: '31/12/2015', //opicional
	            autoSize: true
	        });
    	}
    });   
});