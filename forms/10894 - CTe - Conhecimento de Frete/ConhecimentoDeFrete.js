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

//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, matricula, WKNumProces, documentId, mobile) {
	isMobile = mobile;
	matr = matricula;
	process = WKNumProces;
	blockAll(modeView);	
	
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
				
				showElemento($("#tb_cotacoes"));
				
				$("#divAddButton").show().css('pointer-events', 'all');
				$("#tb_cotacoes").find("tr").each(function(){
					   $(this).find("td:first").show();
				});				
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
	
	elemento.find('.table').find("tr").each(function(){
		   $(this).find("td:first").show();
	});
	elemento.find('.divAddButton').show();
	
	setTimeout(function () {
		var offset = elemento.offset().top; 
		$('html, body').animate({ scrollTop: offset }, offset);	
	}, 1000);
}
//bloqueia todos os panels para edição 
function blockAll(modeView) {
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
		if(modeView == "ADD" || modeView == "MOD"){
			$(this).find('.table').find("tr").each(function(){
				   $(this).find("td:first").hide();
			});
		}
		$(this).find('.divAddButton').hide();		
	});
	
	$('.nota_fiscal').each(function(i) {				
		$(this).hide()
				.find('input[type=text]')
				.each(function(){
					if ($(this).val() != "" && parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) != 0.00) {
						$(this).closest('.nota_fiscal').show();							
					}
				});
		
	});
	$('.pedido').each(function(i) {				
		$(this).hide()
				.find('input[type=text]')
				.each(function(){
					if ($(this).val() != "" && parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) != 0.00) {
						$(this).closest('.pedido').show();							
					}
				});		
	});
	
}


