var row;

$(function(ready){
	
	$(".status").each(function(i) {
		if 	($(this).val() == "Cancelado") 	$(this).css({'background-color' : 'grey', 'color': 'black'});
		else if ($(this).val() == "Em andamento" || $(this).val() == "Iniciado") $(this).css({'background-color' : 'yellow'});
		else if ($(this).val() != "") $(this).css({'background-color' : 'green' , 'color': 'black'});				
	});		
	
	
	$("#myTab").on("click", function(){
		$('#et_numsol').val($('#num_processo').val());
		$('#et_cliente').val($('#cliente').val());
		$('#et_data').val($('#data_sol').val());
		$('#et_cidade').val($('#cidade').val());
		$('#et_estado').val($('#estado').val());    
	});	
	
	
	$("input[id^='vl_cobrado']").number( true, 2, ',' ,'.', 'R$ ')
								.on('keyup blur', function() {
									somatorio();
								});
	
	somatorio();	
	
});

function somatorio(){
	var soma = 0;
	$("input[id^='vl_conserto___']").each(function(i) {
		soma += $(this).val().replace(/[^0-9\,]+/g,"").replace(",",".") * 1;		
	});				
	$('#vl_tot_conserto').val(soma);	
	
	var soma = 0;
	$("input[id^='vl_cobrado___']").each(function(i) {
		soma += $(this).val().replace(/[^0-9\,]+/g,"").replace(",",".") * 1;		
	});				
	$('#vl_tot_cobrado').val(soma);
	
}

function addLinha(tabela){
	var row = wdkAddChild(tabela);
	
	$("input[id='nr_item___" + row + "']").val($("#num_processo").val() + "/" + ("00" + row).substr(-3));
	$("input[id='quant___" + row + "']").number( true, 2, ',' ,'.', '');
	
	$('#nr_item___' + row).attr("readOnly", true);
	$('#vl_conserto___' + row).attr("readOnly", true);
	$('#def_const___' + row).attr("readOnly", true);
	$('#serv_envio___' + row).attr("readOnly", true);
	$('#vl_cobrado___' + row).attr("readOnly", true);
	$('#responsavel_fp___' + row).attr("readOnly", true);
	$('#fluxo_fp___' + row).attr("readOnly", true);
	$('#status_fp___' + row).attr("readOnly", true);
	$('#nf_ret___' + row).attr("readOnly", true);
	
	$('#per_gar___' + row).val("nao");
	
}


function zoomResponsavelFP(linha) {
	var nome = $(linha).attr("name");
	row = nome.substring(nome.lastIndexOf("_") + 1);
	zoomEcmTipo("colleague",
			"colleagueId,Matricula,colleagueName,Colaborador",
			"colleagueId,colleagueName,extensionNr", 
			"Zoom Colaborador",
			"setColaboradorFP",
			"active,true");	
}
function setColaboradorFP(selectedItem) {
	$("#mat_fp___" + row).val(selectedItem['colleagueId']);
	$("#responsavel_fp___" + row).val(selectedItem['colleagueName']);		
}





//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, matricula, WKNumProces, documentId) {
	blockAll();
	$('#myTab a:first').tab('show');
	$("#pn_etiqueta").show();
	if(modeView == "ADD" || modeView == "MOD"){	
		
		var filter = new Object();
		filter["colleaguePK.colleagueId"] = matricula;
		var colaborador = getDatasetValues('colleague', filter);
		
		var usuario = colaborador[0].colleagueName;
		var ramal = colaborador[0].extensionNr;	
		
		var data = getData();
		var hora = getHora();	
		
		if (numState == 0 || numState == 1){
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			
			showElemento($("#pn_orcamento"));	
			showElemento($("#pn_emissao"));
			
			$('#matricula_emissor').attr("readOnly", true).val(matricula);
			$('#user_emissor').attr("readOnly", true).val(usuario);
			$("#data_emissor").attr("readOnly", true).val(data);
		}
		
		if (numState == 8){
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			
			$("input[id^='nf_ret']").removeAttr('readOnly');
			$("input[id^='vl_cobrado']").removeAttr('readOnly');
			
			
			
			$('#matricula_orc').attr("readOnly", true).val(matricula);
			$('#user_orc').attr("readOnly", true).val(usuario);
			$("#data_orc").attr("readOnly", true).val(data);
		}
		
		
	}	
}

function showElemento(elemento){	
	elemento.show();
	elemento.css('pointer-events', 'all');
	elemento.find('input[type=text], input[type=zoom], textarea').removeAttr('readOnly');
	setTimeout(function () {
		var offset = elemento.offset().top * 0.50; 
		$('html, body').animate({ scrollTop: offset + 150 }, offset);	
	}, 1000);
}

function blockAll() {	
	$('.panel').each(function(i) {
		if ($(this).attr('id') != null) {			
			$(this).hide();
			$(this).css('pointer-events', 'none'); 
			$(this).find('input[type=text], input[type=zoom], textarea')
					.attr("readOnly", true)
					.css('pointer-events', 'all')
					.each(function(){
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
		
		if($("#cliente").val() == "") message += "<br/>Cliente";
		if($("#cidade").val() == "") message += "<br/>Cidade";
		if($("#estado").val() == "") message += "<br/>Estado";
		if($("#nf_ent").val() == "") message += "<br/>Nota Fiscal de Entrada";
		if($("#contato").val() == "") message += "<br/>Contato";
		if($("#telefone").val() == "") message += "<br/>Telefone";
		if($("#e_mail").val() == "") message += "<br/>E-mail";		
		
		$("input[id^='cod_item']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "<br/>Codigo do item na linha" + $(this).closest('tr').index();
			}
		});	
		
		
		$("input[id^='desc_mat']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "<br/>Descrição do material na linha" + $(this).closest('tr').index();
			}
		});
		
		$("input[id^='it_nr_serie']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "<br/>Nº serie na linha" + $(this).closest('tr').index();
			}
		});		
		
		$("input[id^='fornecedor']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "<br/>Fornecedor na linha" + $(this).closest('tr').index();
			}
		});
		
		$("input[id^='mat_fp']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "<br/>Responsável na linha" + $(this).closest('tr').index();
			}
		});
		
				
	}
	
	
		
	
	
	
	if (message != ""){
		message = "</br>Os campos abaixo são de preencimento obrigatorio:" + message;		
		throw(message);
	}
	
}
var beforeMovementOptions = beforeSendValidate;