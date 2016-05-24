$(function(ready) {	
	$('#criticidade').on('change', function() {
		$('#prazo').val($(this).val());
	}).trigger('change');	
	
	$('#tb_interacao').find('tr').each(function(indice){
		indice--;
	    $(this).find("label").eq(0).text("ATENDIMENTO nº" + ("0" + indice).substr(-2));	      
	});	
	
	$('#ramal').number( true, 0, ',' ,'', '');
	$('#ramal_atend').number( true, 0, ',' ,'', '');
	
});

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
function ativaPreencheCampos(modeView, numState, WKNumProces, documentId) {
	blockAll();
	if (modeView == "ADD" || modeView == "MOD") {		
		
		var getUsuario = $.ajax({
			type : 'GET',
			dataType : 'json',
			contentType : "application/json",
			url : '/api/public/social/user/logged/v2',
			async : true
		});
		
		var data = getData();
		var hora = getHora();			

		if (numState == 0 || numState == 1) {			
			getUsuario.done(function(response) {
				$('#matricula_user').val(response.content.userCode);
				$('#solicitante').val(response.content.name);
				$('#ramal').val(response.content.userData.UserRamal);					
				
				$.ajax({
					type : 'GET',
					dataType : 'json',
					contentType : "application/json",
					url : '/api/public/2.0/groups/containsUser/TI/' +  response.content.userCode,
					async : true
				}).done(function(response) {
					if (! response.content){
						$('#btZoomColab').css('pointer-events', 'none');
					}
				});	
			});	
			
			$('#num_processo').val(WKNumProces);
			$('#data_sol').val(data);
			$('#hora_sol').val(hora);			
			showElemento($("#emissao"));			
		}
		
		if (numState == 2) {	
			getUsuario.done(function(response) {
				$('#matricula_atend').val(response.content.userCode);
				$('#atendente').val(response.content.name);
				$('#ramal_atend').val(response.content.userData.UserRamal);				
			});	
		
			$('#num_processo').val(WKNumProces);			
			addLinha();
			$('#re_busca_tipo').css('pointer-events', 'all');
			$('#ramal_atend').css('pointer-events', 'all');
			
		}
		
		if (numState == 3) {			
			$("#atendimento").css('pointer-events', 'none');			
			var ultimaLinhaTabela = $('#tb_interacao tr').last();
			ultimaLinhaTabela.find("input[id^='dt_aceite']").val(data);
			ultimaLinhaTabela.find("input[id^='hr_aceite']").val(hora);
			showElemento(ultimaLinhaTabela.find("textarea[id^='desc_aceite']"));
		}		
		
		if (numState == 6) {
			addLinha();
		}		
		
		if (numState == 4) {
			$.ajax({
				method : "POST",
				dataType : 'json',
				contentType : "application/json",
				url : "/api/public/ecm/document/updateDescription",
				data : '{"id": "' + documentId + '", "description": "Atendimento - '+ WKNumProces + '"}'
			});
			
			getUsuario.done(function(response) {
				$('#matricula_aceite').val(response.content.userCode);
				$('#user_aceite').val(response.content.name);
			});
			$('#dt_final').val(data);
			
			showElemento($("#avaliacao"));			
		}
	}
}

function addLinha(){
	wdkAddChild('tb_interacao');
	
	var ultimaLinhaTabela = $('#tb_interacao tr').last();
	$("#atendimento").css('pointer-events', 'none');
	
	ultimaLinhaTabela.find("input[id^='dt_intera']").val(getData());
	ultimaLinhaTabela.find("input[id^='hr_intera']").val(getHora());
	showElemento(ultimaLinhaTabela.find("textarea[id^='desc_interacao']"));
}

function showElemento(elemento){
	elemento.show();
	elemento.css('pointer-events', 'all');
	
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
			$(this).find('input[type=text]').each(function(){
				if ($(this).val() != "") {
					$(this).closest('.panel').show();
				}
			});		
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

