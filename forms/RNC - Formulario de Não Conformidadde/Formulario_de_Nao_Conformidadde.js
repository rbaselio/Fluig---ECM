var row;

$(function(ready){
	
	$(".status").each(function(i) {
		if 	($(this).val() == "Cancelado") 	$(this).css({'background-color' : 'grey', 'color': 'black'});
		else if ($(this).val() == "Em andamento" || $(this).val() == "Iniciado") $(this).css({'background-color' : 'yellow'});
		else if ($(this).val() == "Em atraso")	$(this).css({'background-color' : 'red', 'color': 'black'});
		else if ($(this).val() != "") $(this).css({'background-color' : 'green' , 'color': 'black'});				
	});	
			
	
	// ativa/desativa campos quando o valor da origem for modificado
	$("#origem").change(function () {
		if ($("#origem").val() == "reclamacao de cliente" || $("#origem").val() == "montagem em campo") {
			$("#pedido").removeAttr('disabled');
		} else $("#pedido").attr('disabled', 'disabled').val(''); 
	}).trigger('change');
	
	// ativa/desativa campos quando o valor do tipo for modificado
	$("#tipo").change(function () {			
		if ($("#tipo").val() == "produto"){
			$("#nome_prod").removeAttr('disabled');
			$("#cod_prod").removeAttr('disabled');
			$("#processo").attr('disabled', 'disabled').val('0'); 
		}
		else if ($("#tipo").val() == "processo"){
			$("#processo").removeAttr('disabled');
			$("#cod_prod").attr('disabled', 'disabled').val(''); 
			$("#nome_prod").attr('disabled', 'disabled').val('');
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
	
	
	$("#reponsabilidade").change(function () {			
		if($(this).val() == 6){
			$("#fornec").removeAttr('disabled');
			$("#matr_falha").attr('disabled', 'disabled').val('');
			$("#colab_falha").attr('disabled', 'disabled').val('');
		}	
		else if($(this).val() == 10){
			$("#fornec").attr('disabled', 'disabled').val('');
			$("#matr_falha").removeAttr('disabled');
			$("#colab_falha").removeAttr('disabled');
		}
		else{
			$("#fornec").attr('disabled', 'disabled').val('');
			$("#matr_falha").attr('disabled', 'disabled').val('');
			$("#colab_falha").attr('disabled', 'disabled').val('');			
		}
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

//zoom de colaboradores para a atribuição de responsavel por disposição
function zoomModFalha() {
	zoomEcmTipo("mod_falha",
				"Modo_Falha,Modo Falha",
				"Modo_Falha", 
				"Zoom Colaborador",
				"setModFalha");
}
function setModFalha(selectedItem) {
	$("#desc_mod_falha").val(selectedItem['Modo_Falha']);
			
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
	
	if (tabela = 'td_materiais'){
		$("input[id='vl_mat___" + row + "']")
			.number( true, 2, ',' ,'.', 'R$ ')
			.keyup(function () {
				var soma = 0;
				$("input[id^='vl_mat___']").each(function(i) {
					soma = soma + ($(this).val() * 1);
				});		
				$('#vl_tot').val(soma);
		}).trigger('keyup');
	}
	
	
	
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
	$('#myTab a:first').tab('show');
	showElemento($("#mod_falha"));
	if(modeView == "ADD" || modeView == "MOD"){	
		
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
			showElemento($("#emissao"));			
		}
		
		if (numState == 4){
			$("#num_processo").val(WKNumProces);
			
			getUsuario.done(function(response) {
				$("#matricula_disp").val(response.content.userCode);
				$("#resp_disp").val(response.content.name);			   
			});
			$("#data_disp").val(data);	
			showElemento($("#disposicao"));	
		}
		
		
		if (numState == 5){
			$("#num_processo").val(WKNumProces);
			
			getUsuario.done(function(response) {
				$("#matricula_emer").val(response.content.userCode);
				$("#resp_emer").val(response.content.name);			   
			});
			$("#data_emer").val(data);	
			showElemento($("#emergencial"));					
		}
		
		if (numState == 6){
			getUsuario.done(function(response) {
				$("#mat_parecer").val(response.content.userCode);
				$("#resp_parecer").val(response.content.name);			   
			});
			$("#data_parecer").val(data);	
			showElemento($("#parecer"));			
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
			
			showElemento($("#causa_raiz"));
			showElemento($("#acoes"));	
		}
		
		if (numState == 18){
			
			$.ajax({
				method: "POST",
				dataType: 'json',
				contentType: "application/json",
				url: "/api/public/ecm/document/updateDescription",
				data: '{"id": "'+ documentId  +'", "description": "RNC - '+ WKNumProces + '"}',
				async: true
			});
			
			
			getUsuario.done(function(response) {
				$("#mat_eficacia").val(response.content.userCode);
				$("#mat_falha").val(response.content.name);
				$("#mat_eficacia").val(response.content.userCode);
				$("#resp_falha").val(response.content.name);
			});
			
			$("#data_falha").val(data);
			$("#data_eficacia").val(data);
			
			showElemento($("#eficacia"));
			
		}		
	}	
}

function showElemento(elemento){
	elemento.show();
	elemento.css('pointer-events', 'all');
	var offset = elemento.offset().top * 0.50; 
	$('html, body').animate({ scrollTop: offset - 150 }, offset);	
}

//bloquear todas os campos
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
		if ($("#conclusao").val() == "0") message += "</br>Conclusão";
		if ($("#desc_eficacia").val() == "") message += "</br>Descrição";
		
		if ($("#reponsabilidade").val() == "0") message += "</br>Responsabilidade:";
		if ($("#desc_mod_falha").val() == "") message += "</br>Modo Falha:";
		
	}		
	
	if (message != ""){
		message = "</br>Os campos abaixo são de preencimento obrigatorio:" + message;		
		throw(message);
	}
	
}
var beforeMovementOptions = beforeSendValidate;