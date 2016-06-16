var row;


$(function(ready){
	
	$(".status").each(function(i) {
		if 	($(this).val() == "Cancelado") 	$(this).css({'background-color' : 'grey', 'color': 'black'});
		else if ($(this).val() == "Em andamento" || $(this).val() == "Iniciado") $(this).css({'background-color' : 'yellow'});
		else if ($(this).val() == "Em atraso")	$(this).css({'background-color' : 'red', 'color': 'black'});
		else if ($(this).val() != "") $(this).css({'background-color' : 'green' , 'color': 'black'});				
	});	
	
	$(':radio[id="tipo"]').change(function() {		
		if ($(this).filter(':checked').val() == 'outros')  $('#det_outros').removeAttr('disabled');
		else {
			$('#det_outros').attr('disabled', 'disabled')
			$('#det_outros').val('');		
		}
			
	}).trigger('change');
	
	
});

function setSelectedZoomItem(selectedItem) {
	if (selectedItem.inputId.indexOf('responsavel_preAnal') > -1 ) $('#matricula_preAnal').val(selectedItem.colleagueId);
	
	if (selectedItem.inputId.indexOf('responsavel_acoes___')  > -1 ) {
		row = $('#' + selectedItem.inputId).closest('tr').index();
		$('#mat_acoes___' + row).val(selectedItem.colleagueId);
		
	}
	
}


function addGanhos(tabela){
	row = wdkAddChild(tabela);
	$('#val_ganho___' + row).number( true, 2, ',' ,'.', '');	
}


//adição linha a tabela ação emergencial
function addAcoes(tabela) {
	row = wdkAddChild(tabela);	
	
	$('#fluxo_acoes___' + row).attr("readOnly", true);
	$('#status_acoes___' + row).attr("readOnly", true);
	
	$("#" + tabela).find('.date').each(function(i) {
		if ($(this).val() == ''){
			FLUIGC.calendar($(this), {
				minDate : dataAtual,
				maxDate : new Date(dataAtual.getTime() + (parseInt($("input[id='urgencia']:checked").val()) * 24 * 60 * 60 * 1000)),
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
	var processo =  $(oElement).closest('tr').find("input[id^='fluxo_acoes']").val();
	
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
function ativaPreencheCampos(modeView, numState, matricula, WKNumProces, documentId) {
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
			showElemento($('#emissao'));
			
			$('#data_sol').val(data);
			$('#hora_sol').val(hora);
			$('#num_processo').val(WKNumProces);
			$('#matricula_emissor').attr("readOnly", true).val(matricula);
			$('#user_emissor').attr("readOnly", true).val(usuario);
			$('#data_emissor').attr("readOnly", true).val(data);		
						
		}
		
		if (numState == 2){
			showElemento($('#preAnalise'));			
			$('#num_processo').val(WKNumProces);
			$('#mat_preAnal').attr("readOnly", true).val(matricula);
			$('#resp_preAnal').attr("readOnly", true).val(usuario);
			$('#data_preAnal').attr("readOnly", true).val(data);
		}
		
		if (numState == 6){
			showElemento($('#analise'));
			
			$('#mat_anal').attr("readOnly", true).val(matricula);
			$('#resp_anal').attr("readOnly", true).val(usuario);
			$('#data_anal').attr("readOnly", true).val(data);
		}
		
		if (numState == 12){
			showElemento($('#acoes'));
			
			$('#matricula_acoes').attr("readOnly", true).val(matricula);
			$('#resp_acoes').attr("readOnly", true).val(usuario);
			$('#data_acoes').attr("readOnly", true).val(data);	
		}
		
		if (numState == 16){
			showElemento($('#analEficacia'));
			
			$('#mat_eficacia').attr("readOnly", true).val(matricula);
			$('#resp_eficacia').attr("readOnly", true).val(usuario);
			$('#data_eficacia').attr("readOnly", true).val(data);	
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
		if ($("#produto").val() == "") message += "</br>Produto ou Processo a ser melhorado";
		if ($("#origem").val() == "") message += "</br>Origem";
		if ( $('#det_outros').prop("disabled") == false &&  $("#det_outros").val() == "") message += "</br>Detalhar outros";
		if ($("#sitAtual").val() == "") message += "</br>Situação Atual";
		if ($("#sitPretendida").val() == "") message += "</br>Situação Pretendida";		
	}	
	
	if (numState == 2){
		if ($("#decisao").val() == "0") message += "</br>Decisão";
		if ($("#orgao").val() == "0") message += "</br>Orgão";
		if ($("#responsavel_preAnal").val() == "") message += "</br>Responsável";
		if ($("#obser_preAnal").val() == "") message += "</br>Observações";		
	}
	
	if (numState == 6){
		if ($("#decisao_anal").val() == "0") message += "</br>Decisão da análise";
		if ($("#obser_anal").val() == "") message += "</br>Observações";		
	}
	
	if (numState == 12){
		$("input[id^='responsavel_acoes']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Responsavel pela atividade na linha" + $(this).closest('tr').index();
			}
		});	
		
		$("textarea[id^='descAtividade_acoes']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Descrição da atividade na linha" + $(this).closest('tr').index();
			}	
		});
	
	}
	
	if (numState == 16){		
		if ($("#desc_parecer").val() == "") message += "</br>Observações";
		
		$("input[id^='tipo_ganho']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Tipo de ganho na linha" + $(this).closest('tr').index();
			}
		});	
		$("input[id^='desc_ganho']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Descrição do ganho atividade na linha" + $(this).closest('tr').index();
			}
		});	
		$("input[id^='val_ganho']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Valor / Quantidade do ganho" + $(this).closest('tr').index();
			}
		});		
	}
	
	if (message != ""){
		message = "</br>Os campos abaixo são de preencimento obrigatorio:" + message;		
		throw(message);
	}
	
}
var beforeMovementOptions = beforeSendValidate;