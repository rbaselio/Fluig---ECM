$(function(ready) {
	
	$(':radio[id="rd_tipo_necessario"]').change(function() {
		if ($(this).filter(':checked').val() == 'nao'){
			$(':radio[id="rd_avao_tipo"]').attr('disabled', 'disabled')
			$(':radio[id="rd_avao_tipo"]').removeAttr('checked');
		} else {
			$(':radio[id="rd_avao_tipo"]').removeAttr('disabled');
			$(':radio[id="rd_avao_tipo"][value=loco]').prop('checked', true);			
		}		 
	}).trigger('change');
	
	$(':radio[id="rd_certificado"]').change(function() {
		if ($(this).filter(':checked').val() == 'nao'){
			$('#tipoCert').attr('disabled', 'disabled')
			$('#tipoCert').val('0');
		} else {
			$('#tipoCert').removeAttr('disabled');					
		}		 
	}).trigger('change');
	
	$("#statusFim").css({'color': 'black', 'font-weight': 'bold', 'text-align' : 'center'});
	if ($("#statusFim").val() == "REPROVADO") $("#statusFim").css({'background-color' : 'red'});
	else if ($("#statusFim").val() == "APROVADO") $("#statusFim").css({'background-color' : 'green'});
	else if ($("#statusFim").val() != "") $("#statusFim").css({'background-color' : 'yellow'});	
	
	$('.number').number( true, 2, ',' ,'.', '');
	$('.money').number( true, 2, ',' ,'.', 'R$ ');
	
	$('#qtPrevMes, #vlUnit').on('keyup blur', function() {
		$('#vlTotal').val($('#qtPrevMes').val() * $('#vlUnit').val());
	});
	
	$('#precoPrev, #volCompra').on('keyup blur', function() {
		$('#valEstimado').val($('#precoPrev').val() * $('#volCompra').val());				
	});
});

// prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, WKNumProces, documentId) {
	
	blockAll();
	$('#myTab a:first').tab('show');	
	if (modeView == "ADD" || modeView == "MOD") {
		
		var getUsuario = $.ajax({
			type : 'GET',
			dataType : 'json',
			contentType : "application/json",
			url : '/api/public/social/user/logged/v2',
			async : true
		});
		
		var data = getData();
		var hora = getHora();
		var offset; 

		if (numState == 0 || numState == 1) {
			getUsuario.done(function(response) {
				$('#matricula_emissor').val(response.content.userCode);
				$('#user_emissor').val(response.content.name);
				$('#ramal_emissor').val(response.content.userData.UserRamal);				
			});
			
			$('#num_processo').val(WKNumProces);
			$('#data_sol').val(data);
			$('#hora_sol').val(hora);
			
			showElemento($("#emissao"));			
		}
		
		if (numState == 2) {
			getUsuario.done(function(response) {
				$('#matricula_aprov').val(response.content.userCode);
				$('#user_aprov').val(response.content.name);
				$('#data_aprov').val(data);				
			});
			$('#num_processo').val(WKNumProces);
		}
		
		if (numState == 4) {
			getUsuario.done(function(response) {
				$('#matricula_aval').val(response.content.userCode);
				$('#user_aval').val(response.content.name);
				$('#data_aval').val(data);				
			});
			$('#num_processo').val(WKNumProces);
			
			showElemento($("#avalInic"));			
		}
		
		if (numState == 7) {
			$('#myTab a:last').tab('show');
			
			getUsuario.done(function(response) {
				$('#matricula_CapProd').val(response.content.userCode);
				$('#user_CapProd').val(response.content.name);
				$('#data_CapProd').val(data);				
			});
			posiciona($("#capProducao"));				
		}
		
		if (numState == 8) {
			$('#myTab a:last').tab('show');
			
			getUsuario.done(function(response) {
				$('#matricula_CapQua').val(response.content.userCode);
				$('#user_CapQua').val(response.content.name);
				$('#data_CapQua').val(data);				
			});
			showElemento($("#capQualidade"));		
			
		}
		
		if (numState == 9) {
			$('#myTab a:last').tab('show');
			
			getUsuario.done(function(response) {
				$('#matricula_CapComl').val(response.content.userCode);
				$('#user_CapComl').val(response.content.name);
				$('#data_CapComl').val(data);				
			});
			showElemento($("#capComercial"));	
			
			
		}
		
		if (numState == 18) {			
			getUsuario.done(function(response) {
				$('#matricula_qual').val(response.content.userCode);
				$('#user_qual').val(response.content.name);
				$('#data_qual').val(data);				
			});
			posiciona($("#resultado"));
			$("#tipoAcordo").css('pointer-events', 'none');
			$("#considAcordo").css('pointer-events', 'none');
			
		}
		
		if (numState == 19) {			
			getUsuario.done(function(response) {
				$('#matricula_acord').val(response.content.userCode);
				$('#user_acord').val(response.content.name);
				$('#data_acord').val(data);				
			});
			
			$("#classQualidade").css('pointer-events', 'none');
			$("#considQualidade").css('pointer-events', 'none');
			showElemento($("#resultado"));			
		}
		
		if (numState == 18 || numState == 19) {
			if ($(':radio[id="rd_tipo_necessario"]').filter(':checked').val() == 'nao') $("#statusFim").val('DISPENSADO');
			else if(	$(':radio[id="rd_capProd"]').filter(':checked').val() == 'nao' ||
					$(':radio[id="rd_capQual"]').filter(':checked').val() == 'nao' ||
					$(':radio[id="rd_capComl"]').filter(':checked').val() == 'nao' )  $("#statusFim").val('REPROVADO');
			else $("#statusFim").val('APROVADO');		
		}
		
		if (numState == 25) {
			$.ajax({
				method : "POST",
				dataType : 'json',
				contentType : "application/json",
				url : "/api/public/ecm/document/updateDescription",
				data : '{"id": "' + documentId + '", "description": "AF - '+ WKNumProces + '"}'
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

// bloquear todas os campos
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

// validação dos campos
var beforeSendValidate = function(numState) {
	var message = "";

	if (numState == 0 || numState == 1) {
		if ($("#nomeFonec").val() == "") message += "</br>Razão Social";
		if (!isCNPJValid($("#cnpj").val())) message += "</br>Informe um CNPJ válido";
		if ($("#contato").val() == "") message += "</br>Contato";
		if (!isTelValid($("#telefone").val())) message += "</br>Informe um telefone válido";
		if ($("#local").val() == "") message += "</br>Local";
		if ($("#tipoFornec").val() == "0") message += "</br>Tipo de Fornecedor";
		if ($("#itemServ").val() == "") message += "</br>Produto ou Serviço";
		if ($("#codItem").val() == "") message += "</br>Codigo do Item";
		if ($("#familia").val() == "") message += "</br>Família";
		if ($("#qtPrevMes").val() == "") message += "</br>Quant. Prevista";
		if ($("#vlUnit").val() == "") message += "</br>Valor Unitario";
		
	}
	
	if (numState == 7) {
		if ($("#maqEquip").val() == "") message += "</br>Máquinas, equipamentos e dispositivos necessários para produção";
		if ($("#capProd").val() == "") message += "</br>Capacidade Total de Produção";
		if ($("#capFornec").val() == "") message += "</br>Capacidade de Fornecimento à Casp";
		if ($("#prazoPed").val() == "") message += "</br>Prazo para colocação de pedido";
		if ($("#comentCapProd").val() == "") message += "</br>Comentários";		
	}
	
	if (numState == 8) {
		if ($(':radio[id="rd_certificado"]').filter(':checked').val() == 'sim' && $("#tipoCert").val() == "0") message += "</br>Tipo de certificado";
		if ($("#comentCapQual").val() == "") message += "</br>Comentários";
	}
	
	if (numState == 9) {
		if ($("#rd_certificado").val() == "") message += "</br>Volume total de negócio da empresa";
		if ($("#faturamento").val() == "") message += "</br>Faturamento";
		if ($("#volProd").val() == "") message += "</br>Volume de produção";
		if ($("#numFunc").val() == "") message += "</br>Nº Funcionários";
		if ($("#condPag").val() == "") message += "</br>Cond. Pagamento";
		if ($("#precoPrev").val() == "") message += "</br>Preço previsto";
		if ($("#volCompra").val() == "") message += "</br>Vol. Estimado de Compra";
		if ($("#princCliente").val() == "") message += "</br>Principais Clientes";
		if ($("#comentCapComl").val() == "") message += "</br>Comentários";
	}
	
	if (numState == 18) {
		
		if ($("#statusFim").val() == "APROVADO" && $("#classQualidade").val() == '0') message += "</br>Classificação da Qualidade";		
		if ($("#considQualidade").val() == "") message += "</br>Considerações finais Qualidade";
	}
	
	if (numState == 19) {
		if ($("#statusFim").val() == "APROVADO" && $("#tipoAcordo").val() == '0') message += "</br>Tipo de acordo";
		if ($("#considAcordo").val() == "") message += "</br>Considerações finais acordo";
	}

	if (message != "") {
		message = "</br>Os campos abaixo são de preencimento obrigatorio:"
				+ message;
		throw (message);
	}

}
var beforeMovementOptions = beforeSendValidate;

