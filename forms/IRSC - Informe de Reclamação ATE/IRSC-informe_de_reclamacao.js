$(function(ready) {	
	
	$(':radio[id="disp"]').change(function() {
		if ($(this).filter(':checked').val()){	
			if ($(this).filter(':checked').val() == 'outros') $('#det_outros').removeAttr('disabled');
			else {
				$('#det_outros').attr('disabled', 'disabled')
				$('#det_outros').val('');					
			}		 
		}
	}).trigger('change');	
	
	$(':radio[id="rd_docto"]').change(function() {		
		if ($(this).filter(':checked').val()){	
			if ($(this).filter(':checked').val() != 'nao') $('#nr_docto').removeAttr('disabled');
			else {
				$('#nr_docto').attr('disabled', 'disabled')
				$('#nr_docto').val('');		
			}
		}		
	}).trigger('change');
	
	$('#telefone').on('input', function() {
		$(this).unmask();
		$(this).val().replace(/\D/g, '').length > 10 ? $(this).mask("(99) 99999-9999") : $(this).mask("(99) 9999-99999");	  
	}).on('blur',function() {
		var obj = $(this);
		if (!isTelValid($(this).val())){
			FLUIGC.message.alert({
				message: 'Telefone inválido, insira um telefone correto',
				title: 'Erro Telefone: ',
				label: 'OK'
			}, function(el, ev) {
				setTimeout(function() {
					obj.focus().select();
					}, 100);
			});
		}
	}).trigger('input').attr("maxlength", 15);
	
	$('#email').on('blur',function() {
		var obj = $(this);
		if (!$(this).val().match(/\S+@\S+\.\S+/)){
			FLUIGC.message.alert({
				message: 'E-mail inválido, insira um e-mail válido',
				title: 'Erro e-mail: ',
				label: 'OK'
			}, function(el, ev) {
				setTimeout(function() {
					obj.focus().select();
					}, 100);
			});
		}
	});
	
	FLUIGC.calendar($('.date'), {
		minDate : dataAtual,
		defaultDate: dataAtual,
		showToday: true,
	    language: 'pt-br',
	    disabledDates: feriados(4),
		daysOfWeekDisabled: [0,6]
	});
	
	
});

//setar solicitante
function zoomResponsavel() {
	zoomEcmTipo("colleague",
			"colleagueId,Matricula,colleagueName,Colaborador",
			"colleagueId,colleagueName,extensionNr", 
			"Zoom Colaborador",
			"setResponsavel",
			"active,true");
}
function setResponsavel(selectedItem) {
	$("#matricula_resp").val(selectedItem['colleagueId']);
	$("#resp_exec").val(selectedItem['colleagueName']);	
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

		if (numState == 0 || numState == 4) {			
			
			
			$('#data_sol').val(data);
			$('#hora_sol').val(hora);
			
			$('#matricula_emiss').val(matricula);
			$('#resp_emiss').val(usuario);
			$('#data_emiss').val(data);	
			
			showElemento($("#emissao"));			
		}
		
		if (numState == 6) {	
			$('#num_processo').val(WKNumProces);
			$('#matricula_disp').val(matricula);
			$('#resp_disp').val(usuario);
			$('#data_disp').val(data);	
			
			showElemento($("#disposicao"));					
		}
		
		if (numState == 7) {			
			$('#matricula_atend').val(matricula);
			$('#user_atend').val(usuario);
			$('#dt_atend').val(data);	
			
			showElemento($("#Atendimento"));					
		}
		
		if (numState == 8) {			
			$('#matricula_concl').val(matricula);
			$('#user_concl').val(usuario);
			$('#dt_concl').val(data);	
			
			showElemento($("#conclusao"));					
		}
		
				
		
		/*if (numState == 99) {
			$.ajax({
				method : "POST",
				dataType : 'json',
				contentType : "application/json",
				url : "/api/public/ecm/document/updateDescription",
				data : '{"id": "' + documentId + '", "description": "Chamado - '+ WKNumProces + '"}'
			});	
					
		}*/
	}
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
			$(this).css('pointer-events', 'none');
			$(this).hide();
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

	if (numState == 0 || numState == 4) {	
		if ($("#cliente").val() == "") message += "</br>Cliente";
		if ($("#cidade").val() == "") message += "</br>Cidade";
		if ($("#contato").val() == "") message += "</br>Contato";
		if ($("#telefone").val() == "") message += "</br>Telefone";
		if ($("#unid_negocio").val() == "") message += "</br>Unidade de Negocio";
		if ($("#desc_atend").val() == "") message += "</br>Descrição do Atendimento";
	}
	
	if (numState == 6) {
		if ($("#obs_compl").val() == "") message += "</br>Observações Complementares";		
	}
	
	if (numState == 7) {
		if ($("#desc_acoes").val() == "") message += "</br>Observações Complementares";		
	}
	
	if (numState == 8) {
		if ( $('#nr_docto').prop("disabled") == false &&  $("#nr_docto").val() == "") message += "</br>Descrições das ações";		
	}
			

	if (message != "") {
		message = "</br>Os campos abaixo são de preencimento obrigatorio:"
				+ message;
		throw (message);
	}

}
var beforeMovementOptions = beforeSendValidate;

