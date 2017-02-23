var row, anexos, matr, process, isMobile;

//comportamento do form
function loadElementos(){
	
	$(".dias").mask("000", {reverse: true});
	$(".ordemCompra").mask("0000000.00", {reverse: true});
	$(".pedido").mask("000.000.000", {reverse: true});
	
	$("#ord_fabric").mask("000.000.000", {reverse: true});
	$("#ccontabil").mask("000000.0000", {reverse: true});
	
	
	setMoneyClass($(".money"));
	setMoneyClass($(".number"));	
	
	FLUIGC.calendar($(".date"), {
		pickDate: true,	    
		defaultDate: dataAtual,
		showToday: true,
	    language: 'pt-br'
	});
	
	$("#valor_aprox").on('blur', function(){
		$("#valor_conv").val($(this).val().split(".").join(""));	
	});	
}
function addLinha(tabela){
	row = wdkAddChild(tabela);
	setMoneyClass($("#vl_unit___" + row));
	setMoneyClass($("#desconto___" + row));
	setMoneyClass($("#ipi___" + row));
	$("#selecionado___" + row).val("nao");
	
	
	$(".ordemCompra").mask("0000000.00", {reverse: true});
	$(".pedido").mask("000.000.000", {reverse: true});	
	
	$("#prazo_ent___" + row).mask("000", {reverse: true});	
}

function fnCustomDelete(oElement){
    var tr = $(oElement).closest('tr');
    tr.remove();   
}

function setMoneyClass(elemento){
	elemento.mask('000.000.000,00', {reverse: true})
		.on('focusin', function(){$(this).select();})
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
			
			$("#num_processo").val(process);
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			
			$('#matricula_solic').attr("readOnly", true).val(matricula);
			$('#user_solic').attr("readOnly", true).val(usuario);
			$("#data_solic").attr("readOnly", true).val(ramal);	
			
		}	
		
		if (numState == 52){
			showElemento($("#aprov_solic"));
			$('#matricula_aprov_solic').attr("readOnly", true).val(matricula);
			$('#user_aprov_solic').attr("readOnly", true).val(usuario);
			$("#data_aprov_solic").attr("readOnly", true).val(data);	
		}
		
		
		if (numState == 46){
			showElemento($("#membro_compras"));
			$("#num_processo").val(process);			
			$('#matricula_membro_compras').attr("readOnly", true).val(matricula);
			$('#user_membro_compras').attr("readOnly", true).val(usuario);
			$("#data_membro_compras").attr("readOnly", true).val(data);	
		}
		
		if (numState == 2){
			showElemento($("#contabilidade"));
			$("#num_processo").val(process);			
			$('#matricula_contab').attr("readOnly", true).val(matricula);
			$('#user_contab').attr("readOnly", true).val(usuario);
			$("#data_contab").attr("readOnly", true).val(data);	
		}
			
		
		if (numState == 4 || numState == 6 || numState == 12){
			showElemento($("#pn_aprovadores"));
			$('#matricula_aprov_dir_suprimento').attr("readOnly", true);
			$('#user_aprov_dir_suprimento').attr("readOnly", true);
			$("#data_aprov_dir_suprimento").attr("readOnly", true);
			
			$('#matricula_aprov_ger_suprimento').attr("readOnly", true);
			$('#user_aprov_ger_suprimento').attr("readOnly", true);
			$("#data_aprov_ger_suprimento").attr("readOnly", true);
			
			$('#matricula_aprov_dirPresidencia').attr("readOnly", true);
			$('#user_aprov_dirPresidencia').attr("readOnly", true);
			$("#data_aprov_dirPresidencia").attr("readOnly", true);	
			
			$('input[id=aprov_ger_suprimento]').css('pointer-events', 'none');
			$("#desc_aprov_ger_suprimento").attr("readOnly", true);
			
			$('input[id=aprov_dir_suprimento]').css('pointer-events', 'none');
			$("#desc_aprov_dir_suprimento").attr("readOnly", true);	
			
			$('input[id=aprov_dirPresidencia]').css('pointer-events', 'none');
			$("#desc_aprov_dirPresidencia").attr("readOnly", true);	
			
			if (numState == 6){
				$('input[id=aprov_dir_suprimento]').css('pointer-events', 'all');
				$("#desc_aprov_dir_suprimento").attr("readOnly", false);	
				$('#matricula_aprov_dir_suprimento').val(matricula);
				$('#user_aprov_dir_suprimento').val(usuario);
				$("#data_aprov_dir_suprimento").val(data);	
			}			
			if (numState == 4){	
				$('input[id=aprov_ger_suprimento]').css('pointer-events', 'all');
				$("#desc_aprov_ger_suprimento").attr("readOnly", false);
				$('#matricula_aprov_ger_suprimento').val(matricula);
				$('#user_aprov_ger_suprimento').val(usuario);
				$("#data_aprov_ger_suprimento").val(data);	
			}			
			if (numState == 12){
				$('input[id=aprov_dirPresidencia]').css('pointer-events', 'all');
				$("#desc_aprov_dirPresidencia").attr("readOnly", false);	
				$('#matricula_aprov_dirPresidencia').val(matricula);
				$('#user_aprov_dirPresidencia').val(usuario);
				$("#data_aprov_dirPresidencia").val(data);	
			}
		}
		
		if (numState == 10){
			showElemento($("#cotacoes"));			
			$('#matricula_cotacao').attr("readOnly", true).val(matricula);
			$('#user_cotacao').attr("readOnly", true).val(usuario);
			$("#data_cotacao").attr("readOnly", true).val(data);	
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
}


