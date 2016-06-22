var row;

function getQueryParams() {
	var a = document.location.search;
	qs = a.split("+").join(" ");

	var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

	while (tokens = re.exec(qs)) {
		alert(decodeURIComponent(tokens[1]) + ' - ' + decodeURIComponent(tokens[2]));
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}

	return params;
}

$(function(ready){
	$('#c7_total').attr("readOnly", false);
});

function setSelectedZoomItem(selectedItem) {
	if (selectedItem.inputId.indexOf('responsavel_preAnal') > -1 ) $('#matricula_preAnal').val(selectedItem.colleagueId);
	
	if (selectedItem.inputId.indexOf('responsavel_acoes___')  > -1 ) {
		row = $('#' + selectedItem.inputId).closest('tr').index();
		$('#descAtividade_acoes___' + row).val(selectedItem.colleagueId);
		
	}
	
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
function ativaPreencheCampos(modeView, numState, matricula, WKNumProces, documentId) {
	//blockAll();
	getQueryParams();
	
	if(modeView == "ADD" || modeView == "MOD"){	
		
		var filter = new Object();
		filter["colleaguePK.colleagueId"] = matricula;
		var colaborador = getDatasetValues('colleague', filter);
		
		var usuario = colaborador[0].colleagueName;
		var ramal = colaborador[0].extensionNr;
		var data = getData();
		var hora = getHora();
				
		
		
		if (numState == 0 || numState == 1){
						
		}
		
		
	}	
}

function showElemento(elemento){	
	elemento.show();
	elemento.css('pointer-events', 'all');
	elemento.find('input[type=text], input[type=zoom], textarea').removeAttr('readOnly');
	setTimeout(function () {
		var offset = elemento.offset().top; // * 0.50; 
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
		
		
	}		
	
	if (message != ""){
		message = "</br>Os campos abaixo são de preencimento obrigatorio:" + message;		
		throw(message);
	}
	
}
var beforeMovementOptions = beforeSendValidate;