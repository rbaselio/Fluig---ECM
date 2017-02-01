var row;

$(function(ready){
	
	$("#vl_conserto").number( true, 2, ',' ,'.', 'R$ ')
	
	
	
});

//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, matricula, WKNumProces, documentId) {
	
	blockAll();
	
	if(modeView == "ADD" || modeView == "MOD"){	
		
		var filter = new Object();
		filter["colleaguePK.colleagueId"] = matricula;
		var colaborador = getDatasetValues('colleague', filter);
		
		var usuario = colaborador[0].colleagueName;
		var ramal = colaborador[0].extensionNr;	
		
		var data = getData();
		var hora = getHora();		
		
		
		
		if (numState == 5){
			$("#num_processo").val(WKNumProces);
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);

			$("#matricula_emissor").val(matricula);
			$("#user_emissor").val(usuario);
			$("#data_emissor").val(data);	
			
			
			$("#def_inf").css('pointer-events', 'all');
			$("#def_const").css('pointer-events', 'all');
			$("#serv_envio").css('pointer-events', 'all');
			$("#vl_conserto").css('pointer-events', 'all');
			
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
	
	if($("#process_pai").val() == "") throw("</br>Este processo só pode ser iniciado automaticamente por uma Ficha de Pendencia");
	
	if (numState == 5){
		if ($("#def_inf").val() == "") 	message += "</br>Defeito informado";
		if ($("#def_const").val() == "") 	message += "</br>Defeito constatado";
		if ($("#serv_envio").val() == "") 	message += "</br>Serviço executado";
		if ($("#vl_conserto").val() == "") 	message += "</br>Valor do conserto";				
	}
	
	
	if (message != ""){
		message = "</br>Os campos abaixo são de preencimento obrigatorio:" + message;		
		throw(message);
	}	
		
}
var beforeMovementOptions = beforeSendValidate;







