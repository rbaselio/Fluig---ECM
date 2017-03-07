var row, anexos, matr, process, isMobile;

//comportamento do form
function loadElementos(){
	$("#dias_manut").mask("000", {reverse: true});
	
	$(':radio[id="nec_material"]').change(function() {
		if ($(this).filter(':checked').val() == 'sim')$("#div_pecas").show();
		if ($(this).filter(':checked').val() == 'nao') {
			$("#div_pecas").hide();
			$("input[id^='quant_pecs___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none"){
					$(this).closest('tr').remove();
				}
			});
		}
	}).trigger('change');
	
	$(".readonly").attr("readOnly", true);
	
	
	setMoneyClass($(".money"));
	setMoneyClass($(".number"));
	setTimeInicial($(".setIni"));
	setTimeFinal($(".setFim"));	
	somaHoras();
	
}
function addReporte(tabela){
	$(".readonly").attr("readOnly", true);
	row = wdkAddChild(tabela);
	setTimeInicial($("#btn_ini_manut___" + row));
	setTimeFinal($("#btn_fim_manut___" + row));	
}

function setTimeInicial(elemento){
	elemento.on('click', function(){
		var aux = $(this).closest('tr').find("input").eq(1).attr('id').indexOf('___');
		var thisRow = $(this).closest('tr').find("input").eq(1).attr('id').substring(aux + 3);
		if($("#data_ini_manut___" + thisRow).val() == ''){
			dataAtual = new Date();
			$("#data_ini_manut___" + thisRow).val(getData());
			$("#hora_ini_manut___" + thisRow).val(getHora());
		}
	});
}

function setTimeFinal(elemento){
	elemento.on('click', function(){
		var aux = $(this).closest('tr').find("input").eq(1).attr('id').indexOf('___');
		var thisRow = $(this).closest('tr').find("input").eq(1).attr('id').substring(aux + 3);
		
		if($("#data_ini_manut___" + thisRow).val() != ''){
			var dataini = $("#data_ini_manut___" + thisRow).val().split("/");
			var horaini = $("#hora_ini_manut___" + thisRow).val().split(":");
			var inicio = new Date(dataini[2], dataini[1] - 1, dataini[0], horaini[0], horaini[1], 0, 0);
			
			dataAtual = new Date();		
			$("#data_fim_manut___" + thisRow).val(getData());
			$("#hora_fim_manut___" + thisRow).val(getHora());
						
			var diferenca = Math.abs(inicio - dataAtual)
			var horas = Math.trunc(diferenca / (60 * 60 * 1000));
			var minutos = Math.trunc(((diferenca / (60 * 60 * 1000)) - horas) * 60);
			$("#tempo_rep_manut___" + thisRow).val(("0" + horas).substr(-2) + ":" + ("0" + minutos).substr(-2));
			somaHoras();	
		}
	});	
}

function somaHoras() {
	var acum = 0;
	$("#tempo_manut").val("00:00");
	$("input[id^='tempo_rep_manut___']").each(function(i) {
		var tempo = $(this).val().split(':');
		var horastot = parseFloat(tempo[0]) + (tempo[1] / 60);
		horastot = horastot ? horastot : 0;
		acum += horastot;
		horas = Math.trunc(acum);
		minutos = Math.trunc((horastot - horas) * 60);
		$("#tempo_manut").val(("0" + horas).substr(-2) + ":" + ("0" + minutos).substr(-2));
	});		
}
function setMoneyClass(elemento){
	elemento.mask('000.000.000,00', {reverse: true})
		.on('focusin', function(){$(this).select();})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0,00')
			else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
	}).trigger('blur');
}



function addLinha(tabela){
	row = wdkAddChild(tabela);
	setMoneyClass($("#quant_pecs___" + row));
	setMoneyClass($("#valor_pecs___" + row));
	$(".smd").attr("readOnly", true);
	
}

function addPecasUtilizadas(tabela){
	row = wdkAddChild(tabela);
	setMoneyClass($("#quant_pecs_utilizadas___" + row));
	setMoneyClass($("#valor_pecs_utilizadas___" + row));	
	
}

function fnCustomDelete(oElement){
    var tr = $(oElement).closest('tr');
    tr.remove();
    somaHoras();
}

function setMoneyClass(elemento){
	elemento.mask('000.000.000,00', {reverse: true})
		.on('focusin', function(){$(this).select();})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0,00')
			else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
	}).trigger('blur');
}

function getAnexos(processo) {	
	var c1 = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", processo, processo, ConstraintType.MUST);
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
			
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			
			$('#matricula_solic').attr("readOnly", true).val(matr);
			$('#user_solic').attr("readOnly", true).val(usuario);
			$("#data_solic").attr("readOnly", true).val(ramal);
		}
		
		if (numState == 2){
			showElemento($("#preAnalise"));
			$("#num_processo").val(process);
			
			$('#mat_preAnal').attr("readOnly", true).val(matr);
			$('#resp_preAnal').attr("readOnly", true).val(usuario);
			$("#data_preAnal").attr("readOnly", true).val(ramal);
		}
		if (numState == 4){
			showElemento($("#pn_avaliacao"));
			$(".smd").attr("readOnly", true);
			
			$('#matricula_avaliacao').attr("readOnly", true).val(matr);
			$('#user_avaliacao').attr("readOnly", true).val(usuario);
			$("#data_avaliacao").attr("readOnly", true).val(ramal);
		}
		
		if (numState == 12){
			anexos = getAnexos(WKNumProces);
			showElemento($("#cotacao"));	
			$('#mat_cotacao').attr("readOnly", true).val(matr);
			$('#resp_cotacao').attr("readOnly", true).val(usuario);
			$("#data_cotacao").attr("readOnly", true).val(ramal);
		}		
		
		if (numState == 8){
			showElemento($("#pn_aprov_manut"));
			$("#num_processo").val(process);
			
			$('#matricula_aprov_manut').attr("readOnly", true).val(matr);
			$('#aprov_manut').attr("readOnly", true).val(usuario);
			$("#data_aprov_manut").attr("readOnly", true).val(ramal);
		}
		
		
		
		if (numState == 15){
			showElemento($("#pn_compra"));
			
			$('#matricula_compra_manut').attr("readOnly", true).val(matr);
			$('#compra_manut').attr("readOnly", true).val(usuario);
			$("#data_compra_manut").attr("readOnly", true).val(ramal);
			
			$(".smd").removeAttr('readOnly');
		}
		
		if (numState == 20){
			showElemento($("#pn_exec_manut"));	
			
			$('#matricula_exec_manut').attr("readOnly", true).val(matr);
			$('#user_exec_manut').attr("readOnly", true).val(usuario);
			$("#data_exec_manut").attr("readOnly", true).val(ramal);
		}
		
		if (numState == 23){
			showElemento($("#pn_user_aprov_manut"));	
			
			$('#matricula_user_aprov_manut').attr("readOnly", true).val(matr);
			$('#user_aprov_manut').attr("readOnly", true).val(usuario);
			$("#data_user_aprov_manut").attr("readOnly", true).val(ramal);
		}
		
	}
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
var beforeMovementOptions = function(numState){
	var message = "";
	
	if (numState == 0 || numState == 1){
		if ($("#tipo_manut").val() == '') message += "<br/>- Informe o tipo do equipamento;";
		if ($("#tipo_manut_equip").val() == '') message += "<br/>- Informe o tipo da manutenção;";
		if ($("#desc_equip").val() == '') message += "<br/>- Informe a descrição do equipamento;";
		if ($("#ccusto").val() == '') message += "<br/>- Informe o centro de custo;";
		if ($("#dias_manut").val() == '') message += "<br/>- Informe o previsão da manutenção;";
		if ($("#tipo_problema").val() == '') message += "<br/>- Informe o tipo do problema;";
		if ($("#desc_emissao").val() == '') message += "<br/>- Descreva o problema;";		
		
	}
	
	if (numState == 4){
		if ($("#desc_sit_manut").val() == '') message += "<br/>- Informe a situação encontrada";
		
		if ($('#nec_material:checked').val() == "sim"){
			if($("input[id^='quant_pecs___']").length == 0) message += "<br/>- Informe ao menos um item para compra;";
			
			$("input[id^='quant_pecs___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) == 0.00){
					message += "<br/>- Informe a quantidade necessaria na linha " + $(this).closest('tr').index();
				}
			});
			
			$("input[id^='valor_pecs___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) == 0.00){
					message += "<br/>- Informe o valor aproximado na linha " + $(this).closest('tr').index();
				}
			});			
		}
	}
	
	if (numState == 12){
		if (isMobile == 'false' && anexos >= getAnexos(process) ) message += "<br/>- É necessario incluir o comprovante de cotação;";
	}
	
	
	if (numState == 8){
		if ($('#resp_aprov_manut:checked').val() == "nao" && $("#desc_aprov_manut").val() == '') message += "<br/>- Informe motivo da rejeição;";
	}
	
	if (numState == 15){
		$("input[id^='num_smd___']").each(function(i) {
			if ($(this).val() == '') message += "<br/>- Informe o numero da SMD linha " + $(this).closest('tr').index();
			$(this).focus();
		});	
		
	}
	
	if (numState == 20){
		if ($("#desc_exec_manut").val() == '') message += "<br/>- Descreva a manutenção realizada;";
		if ($("#tempo_manut").val() == '00:00') message += "<br/>- Informe ao menos um reporte de tempo";
		
		
		$("input[id^='tempo_rep_manut___']").each(function(i) {
			if ($(this).val() == '') message += "<br/>- Informe o reporte de tempo na " + $(this).closest('tr').index();
		});		
		
		$("input[id^='quant_pecs_utilizadas___']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) == 0.00){
				message += "<br/>- Informe a quantidade necessaria na linha " + $(this).closest('tr').index();
			}
		});
		
		$("input[id^='valor_pecs_utilizadas___']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) == 0.00){
				message += "<br/>- Informe o valor aproximado na linha " + $(this).closest('tr').index();
			}
		});	
		
	}
	if (numState == 23){
		if ($('#sol_aprov_manut:checked').val() == "nao" && $("#desc_user_aprov_manut").val() == '') message += "<br/>- Informe motivo da rejeição;";
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
var beforeSendValidate = function(numState, nextState){
	return beforeMovementOptions(numState);
}
