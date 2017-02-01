var row, anexos, matr, process, isMobile;

//comportamento do form
function loadElementos(){	
	
	if ($('#tipoPedido').val() != "" ) {
		$("#ccusto_contratante").hide();				
	}	
	
	$(':radio[id="aprov_contratante"]').change(function() {
		if ($(this).filter(':checked').val() == 'nao'){
			FLUIGC.message.alert({
			    message: "<strong>Antes de enviar para a etapa de cancelamento, certifique-se de ter realizado a negociações necessarias junto a transportadora:</strong>",
			    title: 'CANCELAMENTO',
			    label: 'OK'
			});
					
		}		
	}).trigger('change');
	
	setTimeout(function () {
		$("textarea").trigger('keyup');		
	}, 100);
	
	$(".money").mask('000.000.000,00', {reverse: true})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0,00')
			else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
	}).trigger('blur');
	
	 numerarLinha();
}

function numerarLinha(){
	$("div[id*=numero_item]").remove();
	$('#tb_cotacoes').find('tr').each(function(indice){
		indice--;
		$(this).find("td:first").prepend("<div class='row' id='numero_item'>" +
											"<div class='col-xs-12' align='left'>" +
												"<label  >" +
												"Item nº " + ("00" + indice).substr(-3) + 
												"</label>" +
											"</div>" +
										"</div>");	       
	});
	
	$(".numero_rateio").remove();	
	$('.numeracao_rateio').each(function(indice){ 
		$(this).prepend("<label class='numero_rateio'>" + ("00" + indice).substr(-3) + "</label>");	
	});	
	
	
}


function removeRateio(tabela){
	fnWdkRemoveChild(tabela);
	numerarLinha();	   
	
}

//adiciona linha a tabela
function addLinha(tabela){
	row = wdkAddChild(tabela);	
	numerarLinha();	
	
	$(".money").mask('000.000.000,00', {reverse: true})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0,00')
			else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
	}).trigger('blur');
}

//obter a quantidade de anexos atual
function getAnexos(process) {	
	var c1 = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", process, process, ConstraintType.MUST);
    var constraints   = new Array(c1);
    //Busca o dataset
    var dataset = DatasetFactory.getDataset("processAttachment", null, constraints, null);
    return dataset.values.length;
}


//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, matricula, WKNumProces, documentId, mobile) {
	isMobile = mobile;
	matr = matricula;
	process = WKNumProces;
	
	blockAll();	
	if(modeView == "ADD" || modeView == "MOD"){
		var filter = new Object();
		filter["colleaguePK.colleagueId"] = matricula;
		var colaborador = getDatasetValues('colleague', filter);
	
		var usuario = colaborador[0].colleagueName;
		var ramal = colaborador[0].extensionNr;	
		var data = getData();
		var hora = getHora();		
		
		
		if (numState == 0 || numState == 1){
			showElemento($("#emissao"));
			$(".cotacoesButton").show();
			$("#num_processo").val(process);
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			$('#matricula_emissao').attr("readOnly", true).val(matricula);
			$('#user_amissao').attr("readOnly", true).val(usuario);
			$("#data_emissao").attr("readOnly", true).val(data);			
		}		
		
		if (numState == 3){
			
			showElemento($("#analise"));
			
			
			$(".cotacoesButton").show();
			$(".cotacoesButton").css('pointer-events', 'all');
			$("#tipoPedido").css('pointer-events', 'all');			
			$("#num_processo").val(process);
			$('#matricula_analista').attr("readOnly", true).val(matricula);
			$('#user_analista').attr("readOnly", true).val(usuario);
			$("#data_analista").attr("readOnly", true).val(data);
			
			$("input[id^='fretePed___']").each(function(i) {
				$(this).removeAttr('readOnly');
			});
			
			if (($('#matricula_emissao').val() != "AUTO") ) {
				$("#divAddButton").show().css('pointer-events', 'all');
				showElemento($("#tb_cotacoes"));
				$('#tipoVeiculo').css('pointer-events', 'all');
				$('#tpRod').css('pointer-events', 'all');
				$('#codTransp').removeAttr('readOnly');
				$('#nomeTransp').removeAttr('readOnly');
				$('#vlCotacao').removeAttr('readOnly');
				
				$('#narrativaNF').removeAttr('readOnly');
				$('#codMelhorTransp').removeAttr('readOnly');
				$('#melhorTransp').removeAttr('readOnly');
				$('#vlMelhor').removeAttr('readOnly');
			}
			
		}
		
		if (numState == 11){
			showElemento($("#pn_contratante"));	
			anexos = getAnexos(process);
			$('#matricula_contratante').attr("readOnly", true).val(matricula);
			$('#user_contratante').attr("readOnly", true).val(usuario);
			$("#data_contratante").attr("readOnly", true).val(data);
			
					
		}
		
		if (numState == 38){
			showElemento($("#pn_cancelamento"));						
			$('#matricula_cancelamento').attr("readOnly", true).val(matricula);
			$('#user_cancelamento').attr("readOnly", true).val(usuario);
			$("#data_cancelamento").attr("readOnly", true).val(data);
		}
		if (numState == 48){
			showElemento($("#checkDados"));					
			$('#matricula_checkDados').attr("readOnly", true).val(matricula);
			$('#user_checkDados').attr("readOnly", true).val(usuario);
			$("#data_checkDados").attr("readOnly", true).val(data);
		}
		if (numState == 52){
			showElemento($("#pn_aprov_checkDados"));						
			$('#matricula_aprov_checkDados').attr("readOnly", true).val(matricula);
			$('#user_aprov_checkDados').attr("readOnly", true).val(usuario);
			$("#data_aprov_checkDados").attr("readOnly", true).val(data);
		}
		if (numState == 59){
			showElemento($("#pn_aprov_final"));						
			$('#matricula_aprov_final').attr("readOnly", true).val(matricula);
			$('#user_aprov_final').attr("readOnly", true).val(usuario);
			$("#data_aprov_final").attr("readOnly", true).val(data);
		}
		if (numState == 29){
			showElemento($("#lancDatasul"));						
			$('#matricula_lancDatasul').attr("readOnly", true).val(matricula);
			$('#user_lancDatasul').attr("readOnly", true).val(usuario);
			$("#data_lancDatasul").attr("readOnly", true).val(data);
		}
		
		
	}	
}

//exibe um panel
function showElemento(elemento){	
	elemento.show()
			.css('pointer-events', 'all')
			.find('input[type=text], input[type=zoom], textarea').removeAttr('readOnly');
	
	elemento.find('table').find('td').first().show();
	elemento.find('table').find('th').first().show();
	elemento.find('.divAddButton').show();
	
	setTimeout(function () {
		var offset = elemento.offset().top; 
		$('html, body').animate({ scrollTop: offset }, offset);	
	}, 1000);
}
//bloqueia todos os panels para edição 
function blockAll() {
	$('html, body').animate({ scrollTop: 0 }, 5);
	$('.panel').each(function(i) {
		if ($(this).attr('id') != null) {			
			$(this).hide()
					.css('pointer-events', 'none')
					.find('input[type=text], input[type=zoom], textarea')
					.attr("readOnly", true)
					.css('pointer-events', 'all')
					.each(function(){
						if ($(this).val() != "" && parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) != 0.00) {
							$(this).closest('.panel').show();							
						}
					});
		}
		$(this).find('table').find('td').first().hide();
		$(this).find('table').find('th').first().hide();
		$(this).find('.divAddButton').hide();
		
	});
	
}

//validação dos campos
var beforeSendValidate = function(numState){
	var message = "";
	
	if (numState == 1){			
		if ($('#codEmitente').val() == "") message += "<br/>- A campo Cod. Cliente é de preenccimento obrigatório;";
		if ($('#nomeEmit').val() == "") message += "<br/>- A campo Nome Cliente é de preenccimento obrigatório;";
		if ($('#nrCTe').val() == "") message += "<br/>- A campo Nr. CTe é de preenccimento obrigatório;";
		if ($('#SerieCTe').val() == "") message += "<br/>- A campo Série CTe é de preenccimento obrigatório;";
		if ($('#codEstab').val() == "") message += "<br/>- A campo Estabelecimento é de preenccimento obrigatório;";
		if ($('#dataCTe').val() == "") message += "<br/>- A campo Data CTe é de preenccimento obrigatório;";
		if ($('#cidade').val() == "") message += "<br/>- A campo Cidade é de preenccimento obrigatório;";
		if ($('#estado').val() == "") message += "<br/>- A campo Estado é de preenccimento obrigatório;";
		
		if ($('#ValorCTe').val() == "") message += "<br/>- A campo Valor Frete é de preenccimento obrigatório;";
		if ($('#nrNota').val() == "") message += "<br/>- A campo Nr. Nota Fiscal é de preenccimento obrigatório;";
		if ($('#SerieNF').val() == "") message += "<br/>- A campo Serie NF é de preenccimento obrigatório;";
		if ($('#DataNF').val() == "") message += "<br/>- A campo Data NF é de preenccimento obrigatório;";
		if ($('#freteNF').val() == "") message += "<br/>- A campo Valor Frete NF é de preenccimento obrigatório;";
		
		
	}
	
	if (numState == 3){			
		if ($('#desc_analista').val() == "") message += "<br/>- Descreva as informações relevantes ao processo;";
		
		if (($('#matricula_emissao').val() != "AUTO") ) {		
			if ($('#tipoVeiculo').val() == "") message += "<br/>- A campo Tipo Veículo é de preenccimento obrigatório;";
			if ($('#tpRod').val() == "") message += "<br/>- A campo Tipo de Rodado é de preenccimento obrigatório;";			
			if ($('#codTransp').val() == "") message += "<br/>- A campo Cod. Transp é de preenccimento obrigatório;";
			if ($('#nomeTransp').val() == "") message += "<br/>- A campo Nome Transp é de preenccimento obrigatório;";
			if ($('#vlCotacao').val() == "") message += "<br/>- A campo Vl. Cotação é de preenccimento obrigatório;";
			
			if($("input[id^='codItem___']").length == 0) message += "<br/>- Informe ao menos um item da Nota Fiscal;";
			
			$("input[id^='codItem___']").each(function(i) {
				if ($(this).val() == ""){
					message += "<br/>- A campo Cod.Item é de preenccimento obrigatório na linha " + $(this).closest('tr').index();
				}
			});
			
			$("input[id^='descItem___']").each(function(i) {
				if ($(this).val() == ""){
					message += "<br/>- A campo Descrição é de preenccimento obrigatório na linha " + $(this).closest('tr').index();
				}
			});
			
			$("input[id^='vlItem___']").each(function(i) {
				if ($(this).val() == ""){
					message += "<br/>- A campo Vl. Item é de preenccimento obrigatório na linha " + $(this).closest('tr').index();
				}
			});			
		}	
		
	}
	if (numState == 11){		
		if ($('#aprov_contratante:checked').val() == "nao"){
			if($("#desc_contratante").val() == '') message += "<br/>- Informe motivo da rejeição;";			
			if (anexos >= getAnexos(process) ) message += "<br/>- É necessario incluir o comprovante de cancelamento;";
		} 
		
		if ($('#aprov_contratante:checked').val() == "sim"){
			if ($('#tipoPedido').val() == "" &&  
				$("#ccusto_contrat").val() == "") message += "<br/>- Informe centro de custo;";
			
			/*limpar cancelamento*/
			$('#matricula_cancelamento').val("");
			$('#user_cancelamento').val("");
			$("#data_cancelamento").val("");
			$("#desc_cancelamento").val("");
		
		}
		
		
		
	}
	if (numState == 38){
		if ($('#cancelamento:checked').val() == "nao" && $("#desc_cancelamento").val() == '') message += "<br/>- Informe motivo da rejeição;";
	}
	if (numState == 48){
		
		if($("input[id^='ccusto_rateio___']").length == 0) message += "<br/>- Informe ao menos um item de rateio;";
		
		$("input[id^='ccusto_rateio___']").each(function(i) {
			if ($(this).val() == ""){
				message += "<br/>- A campo centro de custo é de preenccimento obrigatório na linha " + $(this).closest('tr').index();
			}
		});
		
		$("input[id^='desc_rateio___']").each(function(i) {
			if ($(this).val() == ""){
				message += "<br/>- A campo descrição no rateio é de preenccimento obrigatório na linha " + $(this).closest('tr').index();
			}
		});
		
		$("input[id^='val_rateio___']").each(function(i) {
			if ($(this).val() == ""){
				message += "<br/>- A campo valor no rateio é de preenccimento obrigatório na linha " + $(this).closest('tr').index();
			}
		});
		
		if ($('#desc_checkDados').val() == "") message += "<br/>- Descreva as informações relevantes ao processo;";
		
		
	}
	if (numState == 52){
		if ($('#aprovcheckDados:checked').val() == "nao" && $("#desc_aprov_checkDados").val() == '') message += "<br/>- Informe motivo da rejeição;";
	}
	if (numState == 59){
		if ($('#aprovfinal:checked').val() == "nao" && $("#desc_aprov_final").val() == '') message += "<br/>- Informe motivo da rejeição;";
	}
	if (numState == 29){
		if ($('#desc_lancDatasul').val() == "") message += "<br/>- Descreva as informações relevantes ao processo;";
	}	
	
	if (message != ""){
		FLUIGC.message.alert({
		    message: "<strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message,
		    title: 'CAMPOS OBRIGATÓRIOS',
		    label: 'OK'
		});
		return false;		
	}
	return true;
	
	
	
}
var beforeMovementOptions = beforeSendValidate;