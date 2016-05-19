var row;

$(function(ready){
	
	$(".onlyNumber").each(function(i) {
		$(this).keydown(function(e) {
			if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <=105) || e.which == 8 || e.which  == 0) return true;
			else return false; 		
		});
	});
	
	$(".status").each(function(i) {
		if 	($(this).val() == "Cancelado") 	$(this).css({'background-color' : 'grey', 'color': 'black'});
		else if ($(this).val() == "Em andamento" || $(this).val() == "Iniciado") $(this).css({'background-color' : 'yellow'});
		else if ($(this).val() == "Em atraso")	$(this).css({'background-color' : 'red', 'color': 'black'});
		else if ($(this).val() != "") $(this).css({'background-color' : 'green' , 'color': 'black'});				
	});
	
	$(".isLink").each(function(i) {
		if ($(this).val() != ""){
			$(this).css('pointer-events', 'all');
			$(this).removeAttr('disabled');
			$(this).click(function() {
				window.open("/portal/p/Casp/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + $(this).val(), '_blank');
			});
		}
	});		
	
	// ativa/desativa campos quando o valor da origem for modificado
	$("#origem").change(function () {
		if ($("#origem").val() == "reclamacao de cliente" || $("#origem").val() == "montagem em campo") {
			$("#pedido").removeAttr('disabled');
		} else $("#pedido").attr('disabled', 'disabled').val(''); 
	}).trigger('change');
	
	// ativa/desativa campos quando o valor do tipo for modificado
	$("#tipo").change(function () {	
		$("#processo").attr('disabled', 'disabled').val('0'); 
		$("#cod_prod").attr('disabled', 'disabled').val(''); 
		$("#nome_prod").attr('disabled', 'disabled').val('');
		
		if ($("#tipo").val() == "produto"){
			$("#nome_prod").removeAttr('disabled');
			$("#cod_prod").removeAttr('disabled');		 
		}
		else if ($("#tipo").val() == "processo"){
			$("#processo").removeAttr('disabled');		 
		}				
	}).trigger('change');
	
	// ativa/desativa campos quando o valor da reincidencia for modificado
	$("#reincidencia").change(function () {	
		if ($("#reincidencia").val() == "sim"){
			$("#desc_reinc").removeAttr('disabled');
		} else $("#desc_reinc").attr('disabled', 'disabled').val(''); 
	}).trigger('change');
	
	// ativa/desativa campos quando o valor da ação for modificado
	$("#acao").change(function () {	
		if ($("#acao").val() == "retrabalhar"){
			$("#retrabalho").removeAttr('disabled');
			$("#resp_retrabalho").removeAttr('disabled');
		} else {
			$("#retrabalho").attr('disabled', 'disabled').val('0');
			$("#resp_retrabalho").attr('disabled', 'disabled').val('');
		}
	}).trigger('change');
	
	// ativa/desativa campos quando o valor da disposição for modificado
	$("#disposocao").change(function () {	
		$("#btZoomColab_parecer").attr('disabled', 'disabled');
		$("#btZoomColab_parecer").css('pointer-events', 'none');
		
		if ($("#disposocao").val() == "SAC") $("#btZoomColab_parecer").css('pointer-events', 'all');
		
		if ($("#disposocao").val() == "NCF"){
			$("#fornecedor").removeAttr('disabled');
			$("#btZoomColab_parecer").css('pointer-events', 'all');
		} else $("#fornecedor").attr('disabled', 'disabled').val('');
	}).trigger('change');		
	
});

//zoom de colaboradores para a tabela de atividade emergencial
function zoomColaborador(linha) {
	var nome = $(linha).attr("name");
	row = nome.substring(nome.lastIndexOf("_") + 1);
	zoomEcmTipo("colleague",
			"colleagueId,Matricula,colleagueName,Colaborador",
			"colleagueId,colleagueName,extensionNr", 
			"Zoom Colaborador",
			"setColaborador",
			"active,true");	
}
function setColaborador(selectedItem) {
	$("#mat_emer___" + row).val(selectedItem['colleagueId']);
	$("#responsavel_emer___" + row).val(selectedItem['colleagueName']);		
}

//zoom de colaboradores para a tabela de ação corretiva
function zoomColaborador_corr(linha) {
	var nome = $(linha).attr("name");
	row = nome.substring(nome.lastIndexOf("_") + 1);
	zoomEcmTipo("colleague",
			"colleagueId,Matricula,colleagueName,Colaborador",
			"colleagueId,colleagueName,extensionNr", 
			"Zoom Colaborador",
			"setColaborador_corr",
			"active,true");
}
function setColaborador_corr(selectedItem) {
	$("#matricula_corr___" + row).val(selectedItem['colleagueId']);
	$("#responsavel_corr___" + row).val(selectedItem['colleagueName']);	
}

//zoom de colaboradores para a atribuição de responsavel por parecer
function zoomColaborador_parecer() {
	zoomEcmTipo("colleague",
			"colleagueId,Matricula,colleagueName,Colaborador",
			"colleagueId,colleagueName,extensionNr", 
			"Zoom Colaborador",
			"setColaborador_parecer",
			"active,true");
}
function setColaborador_parecer(selectedItem) {
	$("#matricula_parecer").val(selectedItem['colleagueId']);
	$("#responsavel_parecer").val(selectedItem['colleagueName']);		
}

//zoom de colaboradores para a atribuição de responsavel por disposição
function zoomColaborador_disp() {
	zoomEcmTipo("colleague",
			"colleagueId,Matricula,colleagueName,Colaborador",
			"colleagueId,colleagueName,extensionNr", 
			"Zoom Colaborador",
			"setColaborador_disp",
			"active,true");
}
function setColaborador_disp(selectedItem) {
	$("#mat_disp").val(selectedItem['colleagueId']);
	$("#responsavel_disp").val(selectedItem['colleagueName']);		
}

//adição linha a tabela ação emergencial
function addLinhaTabela(tabela) {
	row = wdkAddChild(tabela);	
	$("#" + tabela).find('.date').each(function(i) {
		if ($(this).val() == ''){
			FLUIGC.calendar($(this), {
				minDate : dataAtual,
				defaultDate: dataAtual,
				showToday: true,
			    language: 'pt-br',
			    disabledDates: feriados(4),
				daysOfWeekDisabled: [0,6]
			});			
		}
	});
}

//remove linha da tabela
function removeTarefa(oElement){
	var processo =  $(oElement).closest('tr').find("input").eq(3).val();
	if(processo == ""){
    	fnWdkRemoveChild(oElement);
	}else{
		FLUIGC.message.alert({
		    message: 'Não é possivel remover tarefas com processos iniciados',
		    title: 'Message',
		    label: 'OK'
		});		
    }
}


//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, WKNumProces, documentId){
	blockAll();
	if(modeView == "ADD" || modeView == "MOD"){	
		
		$.ajax({
			method: "POST",
			dataType: 'json',
			contentType: "application/json",
			url: "/api/public/ecm/document/updateDescription",
			data: '{"id": "'+ documentId  +'", "description": "RNC - '+ WKNumProces + '"}'
		});
		
		
		
		var getUsuario = $.ajax({
					        type: 'GET',
					        dataType: 'json',
					        contentType: "application/json",
					        url: '/api/public/social/user/logged/v2',
					        async: true
					     });			
		
		var data = getData();
		var hora = getHora();
				
		var offset;
		
		if (numState == 0 || numState == 1){
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			
			getUsuario.done(function(response) {
				$("#matricula_emissor").val(response.content.userCode);
				$("#user_emissor").val(response.content.name);			   
			});
			$("#data_emissor").val(data);	
			
			$("#emissao").css('pointer-events', 'all');
		}
		
		if (numState == 4){
			$("#num_processo").val(WKNumProces);
			
			getUsuario.done(function(response) {
				$("#matricula_disp").val(response.content.userCode);
				$("#resp_disp").val(response.content.name);			   
			});
			$("#data_disp").val(data);	
			
			$("#disposicao").css('pointer-events', 'all');
			offset =  $('#disposicao').offset().top * 0.50;
			$('html, body').animate({ scrollTop: offset - 100 }, offset);			
		}
		
		
		if (numState == 5){
			$("#num_processo").val(WKNumProces);
			
			getUsuario.done(function(response) {
				$("#matricula_emer").val(response.content.userCode);
				$("#resp_emer").val(response.content.name);			   
			});
			$("#data_emer").val(data);	
			
			$("#emergencial").css('pointer-events', 'all');
			offset =  $('#emergencial').offset().top * 0.50;
			$('html, body').animate({ scrollTop: offset - 100 }, offset);
					
		}
		
		if (numState == 6){
			getUsuario.done(function(response) {
				$("#mat_parecer").val(response.content.userCode);
				$("#resp_parecer").val(response.content.name);			   
			});
			$("#data_parecer").val(data);	
			
			$("#parecer").css('pointer-events', 'all');
			offset =  $('#parecer').offset().top * 0.50;
			$('html, body').animate({ scrollTop: offset - 100 }, offset);
		}
		
		if (numState == 15){
			getUsuario.done(function(response) {
				$("#mat_causa_raiz").val(response.content.userCode);
				$("#resp_causa_raiz").val(response.content.name);
				$("#mat_acoes").val(response.content.userCode);
				$("#resp_acoes").val(response.content.name);
			});
			$("#data_causa_raiz").val(data);
			$("#data_acoes").val(data);
			
			$("#causa_raiz").css('pointer-events', 'all');
			$("#acoes").css('pointer-events', 'all');
			
			offset =  $('#causa_raiz').offset().top * 0.50;
			$('html, body').animate({ scrollTop: offset - 100 }, offset);
		}
		
		if (numState == 18){
			getUsuario.done(function(response) {
				$("#mat_eficacia").val(response.content.userCode);
				$("#resp_eficacia").val(response.content.name);				
			});
			
			$("#eficacia").css('pointer-events', 'all');
			offset =  $('#eficacia').offset().top * 0.50;
			$('html, body').animate({ scrollTop: offset - 100 }, offset);
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
	
	if (numState == 0 || numState == 1){
		if ($("#origem").val() == "0") message += "</br>Origem";
		if ($("#referencia").val() == "") message += "</br>Referencia/Cliente";
		if ($("#origem").val() == "reclamacao de cliente" || $("#origem").val() == "montagem em campo") {
			if ($("#pedido").val() == "") message += "</br>Pedido";
		}
		
		if ($("#tipo").val() == "0") message += "</br>Tipo";
		else if ($("#tipo").val() == "produto"){
			if ($("#cod_prod").val() == "") message += "</br>Codigo Produto";
			if ($("#nome_prod").val() == "") message += "</br>Nome Produto";
		} else if ($("#tipo").val() == "processo"){
			if ($("#processo").val() == "0") message += "</br>Processo";			
		}
		
		if ($("#unid_negocio").val() == "") message += "</br>Unidade de Negócio";	
		if ($("#criticidade").val() == "0") message += "</br>Criticidade";	
		
		if ($("#reincidencia").val() == "0") message += "</br>Reincidência";
		if ($("#reincidencia").val() == "sim" && $("#desc_reinc").val() == "") message += "</br>Desc. Reincidência";
		
		if ($("#local_detec").val() == "0") message += "</br>Local detecção";
		else if ($("#especific").val() == "") message += "</br>Detalhar";
		
		if ($("#responsavel_disp").val() == "") message += "</br>Resp. Disposição";
		
		if ($("#quant").val() == "") message += "</br>Quant.";
		
		if ($("#descEmissao").val() == "") message += "</br>Descrição";
	}
	
	if (numState == 4){
		if ($("#acao").val() == "0") message += "</br>Ação a ser tomada";	
		
		if ($("#acao").val() == "retrabalhar") {
			if ($("#retrabalho").val() == "0") message += "</br>Verificação do retrabalho";
			if ($("#resp_retrabalho").val() == "") message += "</br>Responsavel pelo retrabalho";			
		}
		
		if ($("#quant_disp").val() == "") message += "</br>Quant.";	
		if ($("#desc_disp").val() == "") message += "</br>Descrição";
	}
	
	if (numState == 5){
		$("textarea[id^='descAtividade_emer']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Descrição da atividade na linha" + $(this).closest('tr').index();
			}	
		});
		$("input[id^='responsavel_emer']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Responsavel pela atividade na linha" + $(this).closest('tr').index();
			}
		});
	}
	
	if (numState == 6){
		if ($("#disposocao").val() == "0") message += "</br>Abrir documento";	
		
		if ($("#disposocao").val() == "SAC") {
			if ($("#responsavel_parecer").val() == "") message += "</br>Responsavel";
		} else if ($("#disposocao").val() == "NCF") {
			if ($("#fornecedor").val() == "") message += "</br>Fornecedor";
			if ($("#responsavel_parecer").val() == "") message += "</br>Responsavel";
		}
		
		if ($("#orgao").val() == "0") message += "</br>Orgão";	
		
		if ($("#desc_parecer").val() == "") message += "</br>Observações";
	}
	
	if (numState == 15){
		if ($("#desc_causa").val() == "") message += "</br>Causa Raiz";	
		
		$("textarea[id^='descAtividade_corr']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Descrição da atividade na linha" + $(this).closest('tr').index();
			}	
		});
		$("input[id^='responsavel_corr']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Responsavel pela atividade na linha" + $(this).closest('tr').index();
			}
		});		
	}
	
	if (numState == 18){
		if ($("#conclusao").val() == "0") message += "</br>Conslusão";
		if ($("#desc_eficacia").val() == "") message += "</br>Descrição";
	}		
	
	if (message != ""){
		message = "</br>Os campos abaixo são de preencimento obrigatorio:" + message;		
		throw(message);
	}
	
}
var beforeMovementOptions = beforeSendValidate;