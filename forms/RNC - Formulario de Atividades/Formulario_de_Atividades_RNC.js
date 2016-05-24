var row;

$(function(ready){
	
	FLUIGC.calendar($('#dtPicker'), {
		minDate : new Date(),
		defaultDate: new Date(),
		showToday: true,
	    language: 'pt-br',
	    disabledDates: feriados(4),
		daysOfWeekDisabled: [0,6]
	});	
		
	
	$("input[name='rd_aprov']").change(function () {
		if ($(this).filter(':checked').val() == "nao") {
			$("#descReprov").removeAttr('disabled');
		} else $("#descReprov").attr('disabled', 'disabled').val(''); 
	}).trigger('change');	
	
	
	
});

//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState){
	
	blockAll();
	
	if(modeView == "ADD" || modeView == "MOD"){	
		
		var WKNumProces = parent.ECM.workflowView.processDefinition.processInstanceId;	
		
		var getUsuario = $.ajax({
					        type: 'GET',
					        dataType: 'json',
					        contentType: "application/json",
					        url: '/api/public/social/user/logged/v2',
					        async: true
					     });	
		
		var d = new Date();
		var data = ("0" + d.getDate()).substr(-2) + "/" + ("0" + (d.getMonth() + 1)).substr(-2) + "/" + d.getFullYear();
		var hora = ("0" + d.getHours()).substr(-2) + ":" + ("0" + (d.getMinutes())).substr(-2);  
		
		if (numState == 5){
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			
			getUsuario.done(function(response) {
				$("#matricula_exec").val(response.content.userCode);
				$("#user_exec").val(response.content.name);	
				$("#responsavel").val(response.content.userCode);
			});
			$("#data_exec").val(data);	
			$("#num_processo").val(WKNumProces);
			
			$("#atividade").css('pointer-events', 'all');
			$("#dtPicker").css('pointer-events', 'all');
			$("#descMotivo").css('pointer-events', 'all');			
		}
		
		if (numState == 10){			
			getUsuario.done(function(response) {
				$("#matricula_aprov").val(response.content.userCode);
				$("#user_aprov").val(response.content.name);			   
			});
			$("#data_aprov").val(data);
			$("input[id='rd_aprov']").css('pointer-events', 'all');				
			$("#descReprov").css('pointer-events', 'all');			
		}
	}				
}

//bloquear todas os campos
function blockAll(){
	$('.panel').each(function(i) {
		if ($(this).attr('id') != null){
			$(this).css('pointer-events', 'none');
		}
	});
}



//validação dos campos
var beforeSendValidate = function(numState){
	var message = "";
	
	if($("#process_pai").val() == "") throw("</br>Este processo só pode ser iniciado automaticamente por uma ação corretiva");
	
	if (numState == 5){
		if ($("#descMotivo").val() == "" && $("#ativiRealizada").val() == ""){
			message += "</br>Atividade realizada ou Motivo da prorrogação";
		}		
	}
	
	
	if (numState == 10){
		if ($("input[name='rd_aprov']").filter(':checked').val() == "nao" && $("#descReprov").val() == "" ){
			message += "</br>Motivo da reprovação";
		}
		if ($("input[name='rd_aprov']").filter(':checked').val() == "sim"){
			$("#prazo_conclusao").val($("#dtProrrocacao").val());			
		}
	}	
	
	if (message != ""){
		message = "</br>Os campos abaixo são de preencimento obrigatorio:" + message;		
		throw(message);
	}	
		
}
var beforeMovementOptions = beforeSendValidate;







