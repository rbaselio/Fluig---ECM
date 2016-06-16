$(function(ready) {	
	$('#tb_interacao').find('tr').each(function(indice){
		indice--;
	    $(this).find("label").eq(0).text("ATENDIMENTO nº" + ("0" + indice).substr(-2));	      
	});	
	
	if ($("#tipo").val() =="") $("#desc_chamado").attr("readOnly", true); 
	
	$('#ramal').number( true, 0, ',' ,'', '');
	$('#ramal_atend').number( true, 0, ',' ,'', '');
	
});

function zoomCriticidade() {
	zoomEcmTipo("criticidade",
			"Criticidade,Criticidade",
			"Criticidade,Prazo", 
			"Criticidade",
			"setCriticidade");
}
function setCriticidade(selectedItem) {
	$("#criticidade").val(selectedItem['Criticidade']);
	$("#prazo").val(selectedItem['Prazo']);	
}

//setar solicitante
function zoomSolicitante() {
	zoomEcmTipo("colleague",
			"colleagueId,Matricula,colleagueName,Colaborador",
			"colleagueId,colleagueName,extensionNr", 
			"Zoom Colaborador",
			"setColaborador",
			"active,true");
}
function setColaborador(selectedItem) {
	$("#matricula_user").val(selectedItem['colleagueId']);
	$("#solicitante").val(selectedItem['colleagueName']);
	$("#ramal").val(selectedItem['extensionNr']);
}

//setar tipo do chamado
function zoomTipo() {
	zoomEcmTipo("TipoDeChamado", "Classe,Classe,Tipo,Tipo",
			"Classe,Tipo,Matricula,Texto", "Zoom Tipo de Chamado",
			"setTipoDeChamado");
}
function setTipoDeChamado(selectedItem) {
	
	$("#classe").val(selectedItem['Classe']);
	$("#tipo").val(selectedItem['Tipo']);
	
	$("#re_classe").val(selectedItem['Classe']);
	$("#re_tipo").val(selectedItem['Tipo']);
	
	$("#responsavel").val(selectedItem['Matricula']);
	
	$("#desc_chamado").removeAttr('readOnly');
	$("#desc_chamado").val(selectedItem['Texto']);
	$("#desc_chamado").focus().select();
	$("#desc_chamado").trigger('keyup');
	
	
	if ($("#tipo").val().match(/divers/ig)){
		myMessage = FLUIGC.message.alert({
			message: 'Você selecionou a opção diversos. <br/>Para agilizar o atendimento, certifique-se que não existe uma opção mais aderente a sua necessidade',
			title: 'Verifique o tipo: ',
			label: 'OK'		    
		});			
	}	
}

//reclassificação do chamado	
function zoomReclassificacao() {
	zoomEcmTipo("TipoDeChamado", "Classe,Classe,Tipo,Tipo", "Classe,Tipo",
			"Zoom Tipo de Chamado", "setReclassificacao");
}
function setReclassificacao(selectedItem) {
	$("#re_classe").val(selectedItem['Classe']);
	$("#re_tipo").val(selectedItem['Tipo']);
}

// prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, matricula, WKNumProces, documentId) {
	blockAll();
	if (modeView == "ADD" || modeView == "MOD") {	
		
		var filter = new Object();
		filter["colleaguePK.colleagueId"] = matricula;
		var colaborador = getDatasetValues('colleague', filter);
		
		var usuario = colaborador[0].colleagueName;
		var ramal = colaborador[0].extensionNr;
		var data = getData();
		var hora = getHora();		

		if (numState == 0 || numState == 1) {	
			showElemento($("#emissao"));			
			
			$('#matricula_user').attr("readOnly", true).val(matricula);
			$('#solicitante').attr("readOnly", true).val(usuario);
			$('#ramal').val(ramal);					
			
			$('#num_processo').val(WKNumProces);
			$('#data_sol').val(data);
			$('#hora_sol').val(hora);	
			
			$('#classe').attr("readOnly", true);
			$('#tipo').attr("readOnly", true);
			$('#criticidade').attr("readOnly", true);
			
			var filterGroup = new Object();
			filterGroup["colleagueGroupPK.groupId"] = 'TI';
			filterGroup["colleagueGroupPK.colleagueId"] = matricula;
			var grupos = getDatasetValues('colleagueGroup', filterGroup);
			if (!grupos[0]) {	
				$('#btZoomColab').css('pointer-events', 'none');				
			};
		}
		
		if (numState == 2 || numState == 6 ) {	
			
			
			$('#matricula_atend').val(matricula);
			$('#atendente').val(usuario);
			$('#ramal_atend').val(ramal);
			
			$('#num_processo').val(WKNumProces);
			$('#zoomCriticidade').css('pointer-events', 'all');
			$('#re_busca_tipo').css('pointer-events', 'all');			
			
			var ultimaLinhaTabela = $('#tb_interacao tr').last();
			
			if (ultimaLinhaTabela.find("textarea[id^='desc_interacao_']").val() == ""){ $('#tb_interacao tr').last().remove();}			
			
			
			
			if (ultimaLinhaTabela.last().find("textarea[id^='desc_aceite_']").val() != ""){	
				wdkAddChild('tb_interacao');
				ultimaLinhaTabela = $('#tb_interacao tr').last();			
			}
			
			ultimaLinhaTabela.find("input[id^='dt_intera']").val(getData());
			ultimaLinhaTabela.find("input[id^='hr_intera']").val(getHora());
			ultimaLinhaTabela.find("textarea[id^='desc_interacao']").removeAttr('readOnly');
			
			showElemento(ultimaLinhaTabela.find("textarea[id^='desc_interacao']"));
					
		}
		
		if (numState == 3) {
			var ultimaLinhaTabela = $('#tb_interacao tr').last();
			ultimaLinhaTabela.find("input[id^='dt_aceite']").val(data);
			ultimaLinhaTabela.find("input[id^='hr_aceite']").val(hora);
			ultimaLinhaTabela.find("textarea[id^='desc_aceite']").removeAttr('readOnly');
			showElemento(ultimaLinhaTabela.find("textarea[id^='desc_aceite']"));
		}			
		
		if (numState == 4) {	
			showElemento($("#avaliacao"));	
			$('#matricula_aceite').val(matricula).attr("readOnly", true);
			$('#user_aceite').val(usuario).attr("readOnly", true);
			$('#dt_final').val(data).attr("readOnly", true);
					
		}
	}
}


function showElemento(elemento){
	
	elemento.show();
	elemento.css('pointer-events', 'all');
	elemento.find('input[type=text]').removeAttr('readOnly');
	elemento.find('textarea').removeAttr('readOnly');
	
	setTimeout(function () {
		var offset = elemento.offset().top * 0.50; 
		$('html, body').animate({ scrollTop: offset + 150 }, offset);	
	}, 1000);
}

// bloquear todas os campos
function blockAll() {	
	$('.panel').each(function(i) {
		if ($(this).attr('id') != null) {
			
			$(this).hide();
			$(this).css('pointer-events', 'none'); 
			$(this).find('input[type=text]')
					.attr("readOnly", true)
					.css('pointer-events', 'all')
					.each(function(){
						if ($(this).val() != "") {
							$(this).closest('.panel').show();
						}
			});	
			$(this).find('textarea')
				   .attr("readOnly", true)
				   .css('pointer-events', 'all'); 			
			
		}
	});
}

// validação dos campos
var beforeSendValidate = function(numState) {
	var message = "";	

	if (numState == 0 || numState == 1) {
		if ($("#ramal").val() == "") message += "</br>Ramal";
		if ($("#tipo").val() == "") message += "</br>Tipo da Solicitação";
		if ($("#criticidade").val() == "") message += "</br>Criticidade da Solicitação";
		if ($("#desc_chamado").val() == "") message += "</br>Descrição do Chamado";	
	}
	if (numState == 2 || numState == 6){		
		if ($('#ramal_atend').val() == "") 	message += "</br>Ramal do atendente";		
		if ($('#tb_interacao tr').last().find("textarea[id^='desc_interacao']").val() == ""	) message += "</br>Descrição da interação realizada";		
	}
	
	if (numState == 3){		
		if ($('#tb_interacao tr').last().find("textarea[id^='desc_aceite']").val() == "") message += "</br>Descrição aceite/recusa do atendimento!";
	}
	
	if (numState == 4){	
		if($(':radio[id="nota"]').filter(':checked').val() == '2' || $(':radio[id="nota"]').filter(':checked').val() == '3'){
			if ($('#comentarios').val() == ''){
				message += "</br>Descrição mo motivo de sua avaliação!";
			}
		}		
	}		

	if (message != "") {
		message = "</br>Os campos abaixo são de preencimento obrigatorio:"
				+ message;
		throw (message);
	}

}
var beforeMovementOptions = beforeSendValidate;

