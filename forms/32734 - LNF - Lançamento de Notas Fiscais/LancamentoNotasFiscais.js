var row, anexos, matr, process, isMobile, token;

function loadElementos(){
	$("#nrPedCli").mask("000.000.000", {reverse: true});
	$("#vlDocto").mask('000.000.000,00', {reverse: true})
				.on('blur', function(){
					if ($(this).val() == '') $(this).val('0,00')
					else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
			}).trigger('blur');
	
	$("#codCliente").on('blur', function(){
		var c1 = DatasetFactory.createConstraint("cod_emit", $(this).val().replace(/\D/g, ''), null, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("token", token , null, ConstraintType.MUST);
		var constraints   = new Array(c1, c2);
		var dataset = DatasetFactory.getDataset("TOTVSEmitente", null, constraints, null);	
		if (dataset.values.length > 0) {		
			$("#nomeCliente").val(dataset.values[0]["nome_emit"]);			
		}
		else $("#nomeCliente").val("Não encontrado");	
	});
	$("#codEmitente").on('blur', function(){
		var c1 = DatasetFactory.createConstraint("cod_emit", $(this).val().replace(/\D/g, ''), null, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("token", token , null, ConstraintType.MUST);
		var constraints   = new Array(c1, c2);
		var dataset = DatasetFactory.getDataset("TOTVSEmitente", null, constraints, null);	
		if (dataset.values.length > 0) {		
			$("#nomeEmit").val(dataset.values[0]["nome_emit"]);			
		}
		else $("#nomeEmit").val("Não encontrado");	
	});
	
	
	//inicia campo como calendario
	FLUIGC.calendar($(".date"), {
		pickDate: true,
	    defaultDate: new Date(dataAtual.getTime() + (1 * 24 * 60 * 60 * 1000)),
		showToday: true,
	    language: 'pt-br'
	});
	
	
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
		token = DatasetFactory.getDataset('tokens', null, null, null).values[0]["tokenTOTVSDatasul"];
		
		if (numState == 0 || numState == 1){
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			showElemento($("#emissao"));
			
			$("#data_emissao").val(data);
			$("#matricula_emissao").val(matricula);
			$("#user_amissao").val(usuario);
			
						
		}
		
		if (numState == 2){			
			showElemento($("#controlePagto"));
			$("#data_resp").val(data);
			$("#matricula_resp").val(matricula);
			$("#user_resp").val(usuario);			
						
		}
		
			
	}	
}

//exibe um panel
function showElemento(elemento){	
	elemento.show()
			.css('pointer-events', 'all')
			.find('input[type=text], input[type=zoom], textarea').each(function(i) {
				if (!$(this).hasClass('readonly')) $(this).removeAttr('readOnly');
			});
	elemento.find('.table').find("tr").each(function(){
				$(this).find("td:first").show();
			})
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
}