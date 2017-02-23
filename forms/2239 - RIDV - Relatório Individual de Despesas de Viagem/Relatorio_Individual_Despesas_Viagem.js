var row, anexos, matr, process, soma;

//comportamento do form
function loadElementos(){
	
	$(".tipo_despesa").on('change', function(e) {
		var thisRow = $(this).attr('id').replace("tipo_despesa___", '');
		if ($(this).val() == 'outros' ) $("#ccontabil___" + thisRow).val('').removeAttr('readOnly');
		else $("#ccontabil___" + thisRow).val($(this).val()).attr("readOnly", true);		
	}).trigger('click');
	
	$('#origem_desp').change(function() {
		$("#possui_cartao").val('nao');
		if ($(this).val() == 'cart_corp') {
			$('#div_possui_cartao').hide();
		}		
		else {
			$('#div_possui_cartao').show();
		}
		$("#possui_cartao").trigger('change');
	}).trigger('change');
	
	$('#possui_cartao').change(function() {
		if ($(this).val() == 'sim') {
			$("#div_total_despesas").hide();
		}else {
			$("#div_total_despesas").show();
		}		
	}).trigger('change');
	
	
	
	$("#placa").mask("SSS-9999");
	$("#conta_cor").mask("000000000-0", {reverse: true});
	
	$(".integer").mask('000.000.000', {reverse: true})
				.on('blur', function(){
		if ($(this).val() == '') $(this).val(0.00);					
	}).trigger('blur');
	
	//atribui formatação numerica ao input text e seta o valor inicial 0.00
	setMoneyClass($(".money"));
	
	//calcular km
	$("#km_ini").on("keyup", function(e){
		soma = 0.00;
		soma += parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) ?  parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) : 0.00;
		$('#vl_km_devido').val((soma * 0.86).toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")).trigger("keyup");
		$(this).focus();		
	}).trigger('keyup');
	
	//contas para deposito para a CASP
	$("#banco_acerto").on("change", function(e){
		switch($(this).val()) {
		    case '001':
		    	$("#agencia_acerto").val('3362-6');
		    	$("#conta_cor_acerto").val('2168-7');
		        break;
		    case '237':
		    	$("#agencia_acerto").val('0453-7');
		    	$("#conta_cor_acerto").val('2735-9');
		        break;
		    case '033':
		    	$("#agencia_acerto").val('0029');
		    	$("#conta_cor_acerto").val('013.000023-2');
		        break;
		    case '341':
		    	$("#agencia_acerto").val('0014');
		    	$("#conta_cor_acerto").val('2730-4');
		        break;
		}	
	}).trigger('change');
	
	
	
	//formata campo para cpf ou cnpj e valida o dado
	//a função de validação esta na lib utils.js na pasta resources do fluig
	$('#cpf_cnpj').on('focusin blur keyup', function() {
		$(this).unmask();
		var dado = $(this).val().replace(/[^\d]+/g,'');
		if (dado.length > 11 ) $(this).mask('00.000.000/0000-00', {reverse: true});
		else $(this).mask('0000.000.000-00', {reverse: true});
	}).on('blur', function() {
		if(!isCNPJValid($(this).val()) && !isCPFValid($(this).val())){
			FLUIGC.message.alert({
			    message: "<strong>Informe um CPF ou CNPJ válidos:</strong><br/>",
			    title: 'CPF / CNPJ inválido',
			    label: 'OK'
			}, function(el, ev) {
				setTimeout(function() {
					$('#cpf_cnpj').focus();
				}, 100);
			});
		} 
	});	
	
	 numerarLinha();
}

function setSelectedZoomItem(selectedItem) {
	if (selectedItem.inputId == "banco") {
		$('#banco').val(selectedItem['Cod_banco'] + ' - '+ selectedItem['Banco']);		
	}
	if (selectedItem.inputId == "nome_resp") {
		$('#matricula_resp').val(selectedItem["colleagueId"]);
	    $('#nome_resp').val(selectedItem["colleagueName"]);	
	}	
}

function numerarLinha(){
	$("div[id*=numero_despesa]").remove();
	$('#tb_despesa').find('tr').each(function(indice){
		indice--;
		$(this).find("td:first").prepend("<div class='row' id='numero_despesa'>" +
											"<div class='col-xs-12' align='left'>" +
												"<label  >" +
												"Despesa nº " + ("00" + indice).substr(-3) + 
												"</label>" +
											"</div>" +
										"</div>");	       
	});	
}


//adiciona linha a tabela
function addLinha(tabela){
	row = wdkAddChild(tabela);
	
	$("#tipo_despesa___" + row).on('change', function(e) {
		var thisRow = $(this).attr('id').replace("tipo_despesa___", '');
		if ($(this).val() == 'outros' ) $("#ccontabil___" + thisRow).val('').removeAttr('readOnly');
		else $("#ccontabil___" + thisRow).val($(this).val()).attr("readOnly", true);		
	}).trigger('click');
	
	
	//atribui formatação numerica ao input text e seta o valor inicial 0.00
	setMoneyClass($("#vl_despesa___" + row));
	$("#data_despesa___" + row).attr("readOnly", true);
	
	$("#desc_despesa___" + row).on('keyup input keypress keydown change', function(e) {
		var tamanhoMin =  $(this).attr('rows') * $(this).css('line-height').replace(/[^0-9\.]+/g, '');
		$(this).css({'height': 'auto'});
		var novoTamanho = this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"));
		if (tamanhoMin > novoTamanho) novoTamanho = tamanhoMin;
		$(this).css({'height': novoTamanho});
	}).css({
		'overflow':'hidden', 
		'resize':'none'
	}).delay(0).show(0, function() {
		$(this).trigger('keyup');				
    });	
	
	//inicia campo como calendario
	FLUIGC.calendar($(".date"), {
		pickDate: true,	    
		defaultDate: dataAtual,
		showToday: true,
	    language: 'pt-br'
	});
	
	numerarLinha();
	
}
//atribui formatação numerica ao input text e seta o valor inicial 0.00 
//necessario quando carregar o formulario e quando adicionar linha na tabela
function setMoneyClass(elemento){
	elemento.mask('000.000.000,00', {reverse: true})
		.on('focusin', function(){$(this).select();})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0,00')
			else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
	}).trigger('blur')
	  .on("keyup", function(e){
		soma = 0.00;
		//somar despesas
		$('input[id^=vl_despesa___').each(function(i){
			soma += parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) ?  parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) : 0.00;
		});
		$('#vl_tot_despesa').val(soma.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
		
		//somar despesas com km
		soma += parseFloat($("#vl_km_devido").val().replace(/[^0-9\,]+/g,"").replace(",",".")) ?  parseFloat($("#vl_km_devido").val().replace(/[^0-9\,]+/g,"").replace(",",".")) : 0.00;
		$('#vl_tot_geral').val(soma.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
		
		//subtrair adinatamento
		soma -= parseFloat($("#vl_prestacao").val().replace(/[^0-9\,]+/g,"").replace(",",".")) ?  parseFloat($("#vl_prestacao").val().replace(/[^0-9\,]+/g,"").replace(",",".")) : 0.00;
		$('#vl_tot_dev').val(Math.abs(soma).toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));	
		
		
		
		$('#acerto').text("Diferença");
		$('#div_banco_acerto').hide();
		$('#acerto_colab').hide();
		$('#quemReembolsa').val("ninguem");		
		if (soma < 0) {
			$('#acerto').text("À devolver a CASP");
			if($('#moeda:checked').val() == "real") {
				$('#div_banco_acerto').show();
				$('#acerto_colab').hide();
				$('#quemReembolsa').val("user");
			}
		} else if (soma > 0){
			$('#acerto').text("À receber da CASP");
			if($('#moeda:checked').val() == "real") {
				$('#div_banco_acerto').hide();
				$('#acerto_colab').show();
				$('#quemReembolsa').val("casp");
			}
		} 
			
			
	});
}

function fnCustomDelete(oElement){
    var tr = $(oElement).closest('tr');
    tr.remove(); 
    $("#km_ini").trigger('keyup');
    numerarLinha();
}



//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, matricula, processo) {
	matr = matricula;
	process = processo;
	blockAll();
	
	$("#bnt_resumo").css('pointer-events', 'all');
	if(modeView == "ADD" || modeView == "MOD"){
		anexos = getAnexos(process);
		
		var filter = new Object();
		filter["colleaguePK.colleagueId"] = matricula;
		var colaborador = getDatasetValues('colleague', filter);
	
		var usuario = colaborador[0].colleagueName;
		var ramal = colaborador[0].extensionNr;	
		var data = getData();
		var hora = getHora();	
		
		if (numState == 0 || numState == 4){
			showElemento($("#emissao"));
			
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			
			$('#matricula_solic').attr("readOnly", true).val(matricula);
			$('#user_solic').attr("readOnly", true).val(usuario);
			$("#data_solic").attr("readOnly", true).val(ramal);	
			
			var filterGroup = new Object();
			filterGroup["colleagueGroupPK.groupId"] = 'iniRDV';
			filterGroup["colleagueGroupPK.colleagueId"] = matricula;
			var grupos = getDatasetValues('colleagueGroup', filterGroup);
			if (!grupos[0]) {
				$('#matricula_resp').val(matricula);
				$('#nome_resp').attr("readOnly", true).val(usuario);
				$('#origem_desp').css('pointer-events', 'none').val("vale");
			};
			
			setTimeout(function() {
				FLUIGC.message.alert({
				    message: "<strong>O valor à ser informado não é o total de suas despesas!!<br/>" +
				    		"O valor refere-se total da fatura no caso de cartão corporativo ou do adiantamento no caso de vales solicitados a tesouraria!</strong>",
				    title: 'ATENÇÃO!!',
				    label: 'OK'
				});
			}, 1000);
			
		}
		
		
		if (numState == 5){
			if ($('#data_sol').val() == ""){
				$('#matricula_solic').attr("readOnly", true).val(matricula);
				$('#user_solic').attr("readOnly", true).val(usuario);
				$("#data_solic").attr("readOnly", true).val(ramal);
				$("#possui_cartao").css('pointer-events', 'all');
				
				var c1 = DatasetFactory.createConstraint("processHistoryPK.processInstanceId", processo, processo, ConstraintType.MUST);
			    var c2 = DatasetFactory.createConstraint("previousMovementSequence", 0, 0, ConstraintType.MUST);
			    var constraints   = new Array(c1, c2);
			    var dataset = DatasetFactory.getDataset("processHistory", null, constraints, null);
			    var dataAtual = new Date(dataset.values[0]['movementDate']);
			    var today = ("0" + dataAtual.getDate()).substr(-2) + "/" + ("0" + (dataAtual.getMonth() + 1)).substr(-2) + "/" + dataAtual.getFullYear();
			    $("#data_sol").val(today);
				$("#hora_sol").val(dataset.values[0]['movementHour'].substr(0,5));
			}
			
			showElemento($("#pn_prest_contas"));			
			$("#num_processo").val(processo);
			
			$('#matricula_orc').attr("readOnly", true).val(matricula);
			$('#user_orc').attr("readOnly", true).val(usuario);
			$("#data_orc").attr("readOnly", true).val(data);
					
			
			$("#matricula_aprovador").val(getAprovador($('#matricula_resp').val()));
			
			$("#vl_tot_despesa").attr("readOnly", true);
			$("#vl_km_devido").attr("readOnly", true);
			$("#vl_tot_geral").attr("readOnly", true);
			$("#vl_tot_dev").attr("readOnly", true);
			
			$("#agencia_acerto").attr("readOnly", true);
			$("#conta_cor_acerto").attr("readOnly", true);
			
			$("select[id*='tipo_despesa___']").each(function(i) {
				$(this).on('click', function(e) {
					var row = $(this).attr('id').substr($(this).attr('id').lastIndexOf("___") + 3);
					if ($(this).val() == 'outros' ) $("#ccontabil___" + row).removeAttr('readOnly');
					else $("#ccontabil___" + row).val($(this).val()).attr("readOnly", true);				
				}).trigger('click');
			});
		}
		
		if (numState == 9){
			showElemento($("#pn_aprov_contabil"));			
			$("#num_processo").val(processo);
			
			$('#matricula_aprov_contabil').attr("readOnly", true).val(matricula);
			$('#user_aprov_contabil').attr("readOnly", true).val(usuario);
			$("#data_aprov_contabil").attr("readOnly", true).val(data);
		}
		if (numState == 15){
			showElemento($("#pn_aprov_imediato"));			
			$("#num_processo").val(processo);
			
			$('#matricula_aprov_imediato').attr("readOnly", true).val(matricula);
			$('#user_aprov_imediato').attr("readOnly", true).val(usuario);
			$("#data_aprov_imediato").attr("readOnly", true).val(data);
		}
		
		if (numState == 21){
			showElemento($("#pn_aprov_dir_fin"));			
			$("#num_processo").val(processo);
			
			$('#matricula_aprov_dir_fin').attr("readOnly", true).val(matricula);
			$('#user_aprov_dir_fin').attr("readOnly", true).val(usuario);
			$("#data_aprov_dir_fin").attr("readOnly", true).val(data);
		}
		if (numState == 27){
			showElemento($("#pn_rembolsa"));			
			$("#num_processo").val(processo);
			
			$('#matricula_rembolsa').attr("readOnly", true).val(matricula);
			$('#user_rembolsa').attr("readOnly", true).val(usuario);
			$("#data_rembolsa").attr("readOnly", true).val(data);
		}
		
		if (numState == 36){
			showElemento($("#pn_user_reembolsa"));			
			$("#num_processo").val(processo);
			
			$('#matricula_rembolsa_user').attr("readOnly", true).val(matricula);
			$('#user_rembolsa_user').attr("readOnly", true).val(usuario);
			$("#data_rembolsa_user").attr("readOnly", true).val(data);
		}
		
	}	
}

function gerarResumo(){	 
	            
	window.open("http://fluig.casp.com.br/webdeskreport/frameset?__id=idownloadFrame&__report=file:///%2Ftmp%2Fecm%2Freports%2F5190%2F1001%2FresumoRDV418101447773619956.rptdesign&param_1="+ process + "&__masterpage=true&__format=html&__cID=1", '_blank');
}

//obter a quantidade de anexos atual
function getAnexos(process) {	
	var c1 = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", process, process, ConstraintType.MUST);
    var constraints   = new Array(c1);
    //Busca o dataset
    var dataset = DatasetFactory.getDataset("processAttachment", null, constraints, null);
    return dataset.values.length;
}

//obter a quantidade de vezes que passou pela atividade
function getInteracoes(process, passo) {	
	var c1 = DatasetFactory.createConstraint("processHistoryPK.processInstanceId", process, process, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("stateSequence", passo, passo, ConstraintType.MUST);
    var constraints   = new Array(c1, c2);
    //Busca o dataset
    var dataset = DatasetFactory.getDataset("processHistory", null, constraints, null);
    return dataset.values.length;
}

//obter a quantidade de vezes que passou pela atividade
function getAprovador(matr) {	
	var c1 = DatasetFactory.createConstraint("USER_CODE", matr, matr, ConstraintType.MUST);
    var constraints   = new Array(c1);
	var dataset = DatasetFactory.getDataset("aprovadores", null, constraints, null);
	return dataset.values[0].DATA_VALUE ? dataset.values[0].DATA_VALUE : ''; 
}

//exibe um panel
function showElemento(elemento){	
	elemento.show()
			.css('pointer-events', 'all')
			.find('input[type=text], input[type=zoom], textarea').removeAttr('readOnly');
	
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
	});
}

//validação dos campos
var beforeSendValidate = function(numState){
	var message = "";
	
	if (numState == 0 || numState == 4){
		
		if ($('#origem_desp').val() == "sol_viagem") message += "<br/>- Não é possivel RDV de solicitação de viagem de forma manual!;";
		
		if ($('#nome_resp').val() == "") message += "<br/>- Informe o responsavel pelo RDV;";
		if (parseFloat($("#vl_prestacao").val().replace(/[^0-9\,]+/g,"").replace(",","."))  == 0 && $('#origem_desp').val() == "cart_corp") message += "<br/>- Informe o valor do RDV;";	
		if ($('#desc_emissao').val() == "") message += "<br/>- Informe o motivo do RDV;";
	}
	
	
	if (numState == 5){	
		if($('#possui_cartao').val() == 'nao') {
			if($("#matricula_aprovador").val() == "")  message += "<br/>- Solicite o cadastro de aprovador ao Depto de TI;";
			
			if($("select[id*='tipo_despesa___']").length == 0){
				if($('#placa').val() == '') message += "<br/>- Informe a placa do veiculo;";
				if(parseFloat($('#km_ini').val().replace(/[^0-9\,]+/g,"").replace(",",".")) == 0.00) message += "<br/>- Informe a kilometragem percorrida do veiculo;";	
			} else if (getInteracoes(process, numState) <= 1 && anexos >= getAnexos(process)) message += "<br/>- É necessario anexar os comprovantes de despesa;";
			
			
			$("select[id*='tipo_despesa___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none"){
					if($(this).val() == null) message += "<br/>- Informe o tipo da despesa na linha " + $(this).closest('tr').index();
					if($(this).val() == 'outros'){
						var row = $(this).attr('id').substr($(this).attr('id').lastIndexOf("___") + 3);
						if($('#desc_despesa___' + row).val() == '') message += "<br/>- Informe a descrição da despesa na linha " + $(this).closest('tr').index();
						$(this).focus();
					}
				}
			});
			$("input[id^='ccontabil___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
					message += "<br/>- Informe a conta contábil na linha " + $(this).closest('tr').index();
					$(this).focus();
				}
			});
			if ($('#origem_desp').val() == "cart_corp")
				$("select[id*='desp_cart___']").each(function(i) {
					if ($(this).closest('tr').attr('style') != "display:none" && ($(this).val() == null || $(this).val() == '')){
						message += "<br/>- Informe a origem da despesa na linha " + $(this).closest('tr').index();
						$(this).focus();
					}
				});
			$("input[id^='local_despesa___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
					message += "<br/>- Informe o local da despesa na linha " + $(this).closest('tr').index();
					$(this).focus();
				}
			});		
			$("input[id^='ccusto___']").each(function(i) {
				if ($(this).val() == "") message += "<br/>- Informe o centro de custo ou pedido da despesa na linha " + $(this).closest('tr').index();
				$(this).focus();
			});
			
			$("input[id^='vl_despesa___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) == 0.00){
					message += "<br/>- Informe o valor da despesa na linha " + $(this).closest('tr').index();
					$(this).focus();
				}
			});
			
			if ($('#quemReembolsa').val() == "casp"){
				if ($('#cpf_cnpj').val() == "") message += "<br/>- Informe o CPF / CNPJ para reembolso;";
				if ($('#banco').val() == "") message += "<br/>- Informe o banco para reembolso;";
				if ($('#agencia').val() == "") message += "<br/>- Informe o agencia para reembolso;";
				if ($('#conta_cor').val() == "") message += "<br/>- Informe o conta corrente para reembolso;";
			}		
		}
			
	}
	
	if (numState == 9){
		if ($('#aprov_contabil:checked').val() == "nao" && $("#desc_aprov_contabil").val() == '') message += "<br/>- Informe motivo da rejeição;";
	}
	if (numState == 15){
		if ($('#aprov_imediato:checked').val() == "nao" && $("#desc_aprov_imediato").val() == '') message += "<br/>- Informe motivo da rejeição;";
	}
	if (numState == 21){
		if ($('#aprov_dir_fin:checked').val() == "nao" && $("#desc_aprov_dir_fin").val() == '') message += "<br/>- Informe motivo da rejeição;";
	}
	if (numState == 27){
		if ($('#aprov_finaceira:checked').val() == "nao" && $("#desc_rembolsa").val() == '') message += "<br/>- Informe motivo da rejeição;";
		if ($('#aprov_finaceira:checked').val() == "sim" && $('#quemReembolsa').val() == "casp"){
			if (getInteracoes(process, numState) <= 1 && 
				anexos >= getAnexos(process)){
						 message += "<br/>- É necessario anexar os comprovantes de reembolso;";
			}
			var vl_reembolso = parseFloat($("#vl_rembolsa").val().replace(/[^0-9\,]+/g,"").replace(",","."));
			var vl_devolucao = parseFloat($("#vl_tot_dev").val().replace(/[^0-9\,]+/g,"").replace(",","."));
			if (vl_reembolso  == 0 && vl_devolucao != 0) message += "<br/>- Informe o valor do reembolso;";
			if (vl_reembolso  > vl_devolucao ) message += "<br/>- Não é possivel devolver valor superior ao calculado;";
			
			var difValor = "\n O valor entregue é diferente do valor socilitado!";
			$('#desc_rembolsa').val($('#desc_rembolsa').val().replace(difValor, ""));
			if (vl_reembolso != vl_devolucao) $('#desc_rembolsa').val( $('#desc_rembolsa').val()  + difValor);
			
		}
	}
	
	if (message != ""){
		FLUIGC.message.alert({
		    message: "<strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message,
		    title: 'CAMPOS OBRIGATÓRIOS',
		    label: 'OK'
		});
		return false;		
	}
	
	
	
}
var beforeMovementOptions = beforeSendValidate;