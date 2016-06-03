var row;

$(function(ready){
	
	$("#myTab").on("click", function(){
		$('#et_numsol').val($('#num_processo').val());
		$('#et_cliente').val($('#cliente').val());
		$('#et_data').val($('#data_sol').val());
		$('#et_cidade').val($('#cidade').val());
		$('#et_estado').val($('#estado').val());    
	});
	
	$('.somar').keyup(function () {
		var soma = ($('#vl_serv').val() * 1);
		$("input[id^='vl_mat_']").each(function(i) {
			soma = soma + ($(this).val() * 1);
		});		
		$('#vl_tot').val(soma);
	}).trigger('keyup');	
	
	//marcara para telefone
	$('#telefone').on('input', function() {
		$(this).unmask();
		tamanho = $(this).val().replace(/\D/g, '').length;
		if (tamanho <= 10) $(this).mask("(99) 9999-99999");
		else if (tamanho <= 11) $(this).mask("(99) 99999-99999");
		else if (tamanho <= 12) $(this).mask("99 (99) 9999-99999");
		else $(this).mask("99 (99) 99999-9999"); 	
	}).on('blur',function() {
		var obj = $(this);
		obj.trigger('input');
		if (!isTelValid($(this).val())){
			FLUIGC.message.alert({
				message: 'Telefone inválido, insira um telefone correto',
				title: 'Erro Telefone: ',
				label: 'OK'
			}, function(el, ev) {
				setTimeout(function() {
					obj.focus().select();
					}, 100);
			});
		}
	}).trigger('input').attr("maxlength", 18);	
	
});




function addLinha(tabela){
	var row = wdkAddChild(tabela);
	$("input[id='quant___" + row + "']").number( true, 2, ',' ,'.', '');
	$("input[id='vl_mat___" + row + "']")
		.number( true, 2, ',' ,'.', 'R$ ')
		.keyup(function () {
			var soma = ($('#vl_serv').val() * 1);
			$("input[id^='vl_mat_']").each(function(i) {
				soma = soma + ($(this).val() * 1);
			});		
			$('#vl_tot').val(soma);
	}).trigger('keyup');	
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
			$("#matricula_emissor").val(matricula);
			$("#user_emissor").val(usuario);
			$("#data_emissor").val(data);
			
			showElemento($("#pn_emissao"));			
		}
		
		if (numState == 2){
			$("#num_processo").val(WKNumProces);
			$("#matricula_orc").val(matricula);
			$("#user_orc").val(usuario);
			$("#data_orc").val(data);
			
			showElemento($("#pn_orcamento"));			
		}
		
		if (numState == 3){
			$("#matricula_env").val(matricula);
			$("#user_env").val(usuario);
			$("#data_env").val(data);
			showElemento($("#env_orcamento"));			
		}
		
		if (numState == 4){
			$("#matricula_aprov").val(matricula);
			$("#user_aprov").val(usuario);
			$("#data_aprov").val(data);
			showElemento($("#aprov_orcamento"));			
		}
		
		if (numState == 5){
			$("#matricula_exec").val(matricula);
			$("#user_exec").val(usuario);
			$("#data_exec").val(data);
			showElemento($("#executar"));			
		}
		
		
		if (numState == 6){
			
			$.ajax({
				method: "POST",
				dataType: 'json',
				contentType: "application/json",
				url: "/api/public/ecm/document/updateDescription",
				data: '{"id": "'+ documentId  +'", "description": "FP - '+ WKNumProces + '"}',
				async: true
			});		
			
			
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
		if ($("#cliente").val() == "") message += "</br>Cliente";
		if ($("#cidade").val() == "") message += "</br>Cidade";
		if ($("#estado").val() == "") message += "</br>Estado";
		if ($("#equip").val() == "") message += "</br>Equipamento";
		if ($("#nr_serie").val() == "") message += "</br>Nr. Série";
		if ($("#nf_ent").val() == "") message += "</br>Nota fiscal de entrada";
		if ($("#per_gar").val() == "") message += "</br>Periodo Garantia:";
		if ($("#desc_defeito").val() == "") message += "</br>Descrição do Defeito:";	
	}		
	
	if (numState == 2){
		
		if ($("#desc_serv").val() == "") message += "</br>Descrição do serviço";
		if ($("#desc_const").val() == "") message += "</br>Constatação";
		if ($("#vl_serv").val() == "") message += "</br>Valor do Serviço";
		
		$("input[id^='quant_']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Quantidade na linha" + $(this).closest('tr').index();
			}	
		});
		
		$("input[id^='desc_mat_']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Descrição na linha" + $(this).closest('tr').index();
			}	
		});
		
		$("input[id^='vl_mat_']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Valor na linha" + $(this).closest('tr').index();
			}	
		});
	}
	if (numState == 3){
		if ($("#contato").val() == "") message += "</br>Contato";
		if ($("#telefone").val() == "") message += "</br>Telefone";
		if ($("#e_mail").val() == "") message += "</br>E-mail";			
	}	
	
	if (numState == 4){
		if ($("#orc_aprovado").val() == "nao" && $("#desc_reprov").val() == "") message += "</br>Motivo da Reprovação";			
	}
	
	if (numState == 5){
		if ($("#orc_aprovado").val() == "sim" && $("#notaFiscal").val() == "") message += "</br>Nota fiscal";
		if ($("#orc_aprovado").val() == "nao" && $("#desc_conclu").val() == "") message += "</br>Motivo";	
	}
	
		
	
	
	
	if (message != ""){
		message = "</br>Os campos abaixo são de preencimento obrigatorio:" + message;		
		throw(message);
	}
	
}
var beforeMovementOptions = beforeSendValidate;