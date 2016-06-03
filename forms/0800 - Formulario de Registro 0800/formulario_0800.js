$(function(ready) {
	
	$(':radio[id="rd_tipo_recla"]').change(function() {
		if ($(this).filter(':checked').val() == 'servico'){
			$('#produto').attr('disabled', 'disabled')
			$('#produto').val('');
			$('#servico').removeAttr('disabled');
		} else if ($(this).filter(':checked').val() == 'produto'){
			$('#servico').attr('disabled', 'disabled')
			$('#servico').val('');
			$('#produto').removeAttr('disabled');		
		}		 
	}).trigger('change');	
	
	FLUIGC.calendar($('.date'), {
		minDate : dataAtual,
		defaultDate: dataAtual,
		showToday: true,
	    language: 'pt-br',
	    disabledDates: feriados(4),
		daysOfWeekDisabled: [0,6]
	});
	
	//marcara para telefone
	$('#tel_empresa').on('input', function() {
		$(this).unmask();
		tamanho = $(this).val().replace(/\D/g, '').length;
		if (tamanho <= 10) $(this).mask("(99) 9999-99999");
		else if (tamanho <= 11) $(this).mask("(99) 99999-99999");
		else if (tamanho <= 12) $(this).mask("99 (99) 9999-99999");	
		else $(this).mask("99 (99) 99999-9999");   
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
	}).trigger('input').attr("maxlength", 18);
	
	$('#email_contato').on('blur',function() {
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
	
});


//zoom de colaboradores para a tabela de ação corretiva
function zoomColaborador() {
	zoomEcmTipo("colleague",
			"colleagueId,Matricula,colleagueName,Colaborador",
			"colleagueId,colleagueName,extensionNr", 
			"Zoom Colaborador",
			"setColaborador_resp",
			"active,true");
}
function setColaborador_resp(selectedItem) {
	$("#matricula_resp2").val(selectedItem['colleagueId']);
	$("#user_resp").val(selectedItem['colleagueName']);
	$("#ramal_resp").val(selectedItem['extensionNr']);	
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
			});
			WKNumProces
			$('#num_processo').val(WKNumProces);
			$('#data_sol').val(data);
			$('#hora_sol').val(hora);
			
			showElemento($("#div_atendente"));			
		}
		
		if (numState == 11) {
			getUsuario.done(function(response) {
				$('#matricula_resp').val(response.content.userCode);
				$('#responsavel').val(response.content.name);
						
			});
			$('#num_processo').val(WKNumProces);
			$('#data_resp').val(data);
			showElemento($("#div_tratativa"));			
		}	
		
		if (numState == 3) {
			getUsuario.done(function(response) {
				$('#matricula_ret').val(response.content.userCode);
				$('#user_ret').val(response.content.name);
						
			});
			$('#data_ret').val(data);
			showElemento($("#div_retorno"));			
		}
		
		if (numState == 5) {
			getUsuario.done(function(response) {
				$('#matricula_exec').val(response.content.userCode);
				$('#user_exec').val(response.content.name);
						
			});
			$('#data_exec').val(data);
			showElemento($("#div_execucao"));			
		}
		
		if (numState == 6) {
			getUsuario.done(function(response) {
				$('#matricula_encer').val(response.content.userCode);
				$('#user_encer').val(response.content.name);
						
			});
			$('#data_encer').val(data);
			showElemento($("#div_encerramento"));			
		}	
		
		
		if (numState == 9) {
			$.ajax({
				method : "POST",
				dataType : 'json',
				contentType : "application/json",
				url : "/api/public/ecm/document/updateDescription",
				data : '{"id": "' + documentId + '", "description": "SAC - '+ WKNumProces + '"}'
			});			
		}
	}
}

function showElemento(elemento){
	elemento.show();
	elemento.css('pointer-events', 'all');
	var offset = elemento.offset().top * 0.50; 
	$('html, body').animate({ scrollTop: offset - 150 }, offset);	
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
		if ($("#nome_empresa").val() == "") message += "</br>Empresa contatante";
		if ($("#nome_contato").val() == "") message += "</br>Nome contatante";
		if ($("#localidade").val() == "") message += "</br>Localidade";
		if (!isTelValid($("#tel_empresa").val())) message += "</br>Informe um telefone válido";
		if (!$("#email_contato").val().match(/\S+@\S+\.\S+/)) message += "</br>Insira um e-mail válido";
		if ($("#origem").val() == "") message += "</br>Origem";
		if ($("#unid_negocio").val() == "") message += "</br>Unidade de Negócio";
		
		if ($(':radio[id="rd_tipo_recla"]').filter(':checked').val() == 'servico' && $('#servico').val() == '') message += "</br>Serviço";
		if ($(':radio[id="rd_tipo_recla"]').filter(':checked').val() == 'produto' && $('#produto').val() == '') message += "</br>Equipamento / Produto";
		
		if ($("#desc_recla").val() == "") message += "</br>Descrição da solicitção";	
	}
	
	if (numState == 11) {
		if ($("#user_resp").val() == "") message += "</br>Responsável pela tratativa";
		if ($("#ramal_resp").val() == "") message += "</br>Ramal do responsável pela tratativa";
		if ($("#desc_acao").val() == "") message += "</br>Nome contatante";	
	}
	
	if (numState == 3) {
		if ($("#obs_aceite").val() == "") message += "</br>Observações";		
	}
	
	if (numState == 5) {
		if ($("#obs_exec").val() == "") message += "</br>Observações";		
	}
	
	if (numState == 6) {
		if ($("#obs_encer").val() == "") message += "</br>Observações";		
	}
	
	

	if (message != "") {
		message = "</br>Os campos abaixo são de preencimento obrigatorio:" + message;
		throw (message);
	}

}
var beforeMovementOptions = beforeSendValidate;

